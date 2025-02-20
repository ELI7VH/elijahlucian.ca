import { Pre, PreProps } from '@/lib'
import { PropsWithChildren } from 'react'

type JsonProps = PropsWithChildren & {
  data: any
} & PreProps

export const Json = ({ data, ...props }: JsonProps) => {
  // const use debug context

  return (
    <Pre style={{ fontSize: '0.5rem' }} {...props}>
      {JSON.stringify(data, null, 2)}
    </Pre>
  )
}
