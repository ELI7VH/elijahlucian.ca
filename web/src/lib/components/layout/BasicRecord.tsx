import { PropsWithChildren } from 'react'
import { Grid } from './Grid'
import { Divider } from '../elements/Divider'

type Props<T extends Record<string, unknown>> = PropsWithChildren & {
  data?: T
  fields?: (keyof T)[]
}

export const BasicRecord = <T extends Record<string, unknown>>({
  data,
  fields,
}: Props<T>) => {
  if (!data) return null

  return (
    <Grid>
      {fields?.map((field) => (
        <Grid gridTemplateColumns="1fr 1fr" fontSize="0.8rem">
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
            {field}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>
            {data?.[field] || '-'}
          </span>
        </Grid>
      ))}
      {!fields?.length &&
        Object.keys(data).map((key) => (
          // todo checkbox beside key for hiding shit

          <Grid gridTemplateColumns="1fr 1fr" fontSize="0.8rem">
            <span
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}
            >
              {key}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>
              {data?.[key] || '-'}
            </span>
          </Grid>
        ))}
    </Grid>
  )
}
