import { InlineHStyle } from '@/lib/types'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & InlineHStyle

export const H1 = ({ children, ...style }: Props) => {
  return (
    <h1
      style={{
        fontFamily: 'wideawake-black',
        letterSpacing: '0.05em',
        transition: 'text-shadow 0.3s ease-in-out',
        ...style,
      }}
    >
      {children}
    </h1>
  )
}
