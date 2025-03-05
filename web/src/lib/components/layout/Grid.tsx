import { dankStylez } from '@/lib/magic'
import { InlineDivStyle } from '@/lib/types'
import { ReactNode } from 'react'

type GridProps = {
  children?: ReactNode
  onClick?: () => void
} & InlineDivStyle

export const Grid = ({ children, onClick, ...style }: GridProps) => {
  return (
    <div style={{ display: 'grid', ...dankStylez(style) }} onClick={onClick}>
      {children}
    </div>
  )
}
