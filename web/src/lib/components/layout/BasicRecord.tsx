import { PropsWithChildren } from 'react'
import { Grid } from './Grid'

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
    </Grid>
  )
}
