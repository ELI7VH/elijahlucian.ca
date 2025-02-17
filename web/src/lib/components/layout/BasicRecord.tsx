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
        <Grid
          gridTemplateColumns="1fr 1fr"
          fontFamily="var(--font-mono)"
          fontSize="0.8rem"
        >
          <span style={{ fontWeight: 'bold' }}>{field}</span>
          <span>{data?.[field] || '-'}</span>
        </Grid>
      ))}
    </Grid>
  )
}
