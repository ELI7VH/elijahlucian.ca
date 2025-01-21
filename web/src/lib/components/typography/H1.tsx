import { InlineHStyle } from '@/lib/types'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & InlineHStyle

export const H1 = ({ children, ...style }: Props) => {
  return (
    <h1
      style={{
        ...style,
        fontFamily: 'wideawake-black',
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </h1>
  )
}
