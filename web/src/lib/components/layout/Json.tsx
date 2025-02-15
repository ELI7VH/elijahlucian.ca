import { Pre, PreProps } from '@/lib'
import { PropsWithChildren } from 'react'

type JsonProps = PropsWithChildren & {
  data: any
} & PreProps

export const Json = ({ data }: JsonProps) => {
  return (
    <Pre style={{ fontSize: '0.4rem' }}>{JSON.stringify(data, null, 2)}</Pre>
  )
}
