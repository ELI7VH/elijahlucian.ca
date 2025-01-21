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
        textShadow: '1px 1px 3px #ffffff11, 2px 2px 6px #ffffff55',
        transition: 'text-shadow 0.3s ease-in-out',
      }}
    >
      {children}
    </h1>
  )
}
