import { ReactNode } from 'react'
import { InlinePStyle } from '../../types'

type PProps = {
  children: ReactNode
} & InlinePStyle

export const P = ({ children, ...style }: PProps) => {
  return <p style={style}>{children}</p>
}
