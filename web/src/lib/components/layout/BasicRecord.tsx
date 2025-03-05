import { PropsWithChildren } from 'react'
import { Grid } from './Grid'
import { useToast } from '@/lib/hooks/useToast'

type Props<T extends Record<string, unknown>> = PropsWithChildren & {
  data?: T
  fields?: (keyof T)[]
}

export const BasicRecord = <T extends Record<string, unknown>>({
  data,
  fields,
}: Props<T>) => {
  if (!data) return null
  const { toast } = useToast()

  return (
    <Grid backgroundColor="rgba(0,0,0,0.9)" color="white" padding="1rem">
      {fields?.map((field, i) => (
        <Grid
          gridTemplateColumns="1fr 1fr"
          fontSize="0.8rem"
          key={`${field as string}-${i}`}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
            {field as string}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              cursor: data?.[field as keyof T] ? 'pointer' : 'default',
            }}
            onClick={() => {
              const val = data?.[field as keyof T]
              if (!val) return

              navigator.clipboard.writeText(`${val}`)
              toast.toast('copied to clipboard')
            }}
          >
            {`${data?.[field as keyof T] || '-'}`}
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
              {`${data?.[key as keyof T] || '-'}`}
            </span>
          </Grid>
        ))}
    </Grid>
  )
}
