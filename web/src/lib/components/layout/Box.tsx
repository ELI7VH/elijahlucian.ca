import { ReactNode } from 'react'
import { InlineDivStyle } from '@/lib/types'
import { dankStylez } from '@/lib/magic'

type BoxProps = {
  children?: ReactNode
  onClick?: () => void
} & InlineDivStyle

export const Box = ({ children, onClick, ...style }: BoxProps) => {
  return (
    <div onClick={onClick} style={{ ...dankStylez(style) }}>
      {children}
    </div>
  )
}
