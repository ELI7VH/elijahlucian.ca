import { InlineDivStyle } from '@/lib/types'
import { Grid } from '../layout/Grid'
import { FlexCol } from '../layout/Flex'

type Props<T> = Omit<InlineDivStyle, 'columns'> & {
  data?: T[]
  columns: {
    key?: keyof T extends string ? keyof T : never
    label?: string
    render?: (value: T, index: number) => React.ReactNode
    renderEdit?: (value: T, index: number) => React.ReactNode
    style?: React.TdHTMLAttributes<HTMLTableCellElement>['style']
    title?: (value: T) => React.ReactNode
  }[]
  rowExtra?: (value: T, index: number) => React.ReactNode
  emptyMessage?: string
  header?: React.ReactNode
  editing?: boolean
  footer?: React.ReactNode
}

type TableRecord = Record<string, any> & { id: string | number }

export function Table<T extends TableRecord>({
  data,
  columns,
  emptyMessage,
  header,
  editing,
  footer,
  ...style
}: Props<T>) {
  return (
    <FlexCol>
      <Grid
        boxShadow="var(--box-shadow)"
        bg="cool-bg"
        {...style}
        border="1px solid var(--gray-2)"
        fontFamily="var(--font-mono)"
        padding="0"
        height={data?.length ? style.maxHeight || '100%' : '3rem'}
        overflow="scroll"
        transition="height 0.4s ease-out"
        width="100% !important"
      >
        <table
          style={{
            gridArea: '1/1/1/1',
          }}
        >
          <thead style={{ ...style }}>
            {header && (
              <tr style={{ ...style }}>
                <th
                  style={{ textAlign: 'left', ...style }}
                  colSpan={columns.length + 1}
                >
                  {header}
                </th>
              </tr>
            )}
            <tr
              style={{
                ...style,
                backgroundColor: 'rgba(0,0,0,0.1)',
                fontSize: '0.8rem',
                textWrap: 'nowrap',
              }}
            >
              {columns.map((column, index) => (
                <th
                  key={`${column.key || index}-header`}
                  style={{
                    textAlign: 'left',
                    ...style,
                    ...column.style,
                    fontSize: '0.66rem',
                    padding: '0 0.25rem',
                    fontWeight: 'var(--font-weight-2)',
                    color: 'var(--brand-5)',
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody
            style={{
              ...style,
              width: '100%',
            }}
          >
            {data
              ? data.map((row, i) => (
                  <tr key={row.id} style={{ ...style }}>
                    {columns.map((column, index) => (
                      <td
                        // @ts-expect-error typescript voodoo
                        title={column.title ? column.title(row) : undefined}
                        key={`${column.key || `${i}+${index}`}-${
                          row.id
                        }-column`}
                        style={{
                          ...style,
                          ...column.style,
                        }}
                      >
                        {editing
                          ? column.renderEdit?.(row, i)
                          : column.render?.(row, i) ||
                            (column.key
                              ? row[column.key as keyof typeof row]
                              : '')}
                      </td>
                    ))}
                  </tr>
                ))
              : emptyMessage}
          </tbody>
        </table>
        {footer && <FlexCol>{footer}</FlexCol>}
        <FlexCol
          gridArea="1/1/1/1"
          bg="background-image-2"
          opacity={0.3}
          pointerEvents="none"
        />
      </Grid>
    </FlexCol>
  )
}
