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
        textShadow:
          style.textShadow || '1px 1px 3px #ffffff11, 2px 2px 6px #ffffff55',
        transition: 'text-shadow 0.3s ease-in-out',
        ...style,
      }}
    >
      {children}
    </h1>
  )
}
