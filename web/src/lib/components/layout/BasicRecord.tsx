import { PropsWithChildren } from 'react'
import { Grid } from './Grid'

type Props = PropsWithChildren & {
  data?: Record<string, any>
}

export const BasicRecord = ({ data }: Props) => {
  if (!data) return null

  return (
    <Grid>
      {Object.entries(data).map(([key, value]) => (
        <Grid
          gridTemplateColumns="1fr 1fr"
          fontFamily="var(--font-mono)"
          fontSize="0.8rem"
        >
          <span style={{ fontWeight: 'bold' }}>{key}</span>
          <span>{value || '-'}</span>
        </Grid>
      ))}
    </Grid>
  )
}
