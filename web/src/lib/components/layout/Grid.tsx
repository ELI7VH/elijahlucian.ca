import { dankStylez } from '@/lib/magic'
import { InlineDivStyle } from '@/lib/types'
import { ReactNode } from 'react'

type GridProps = {
  children?: ReactNode
  onClick?: () => void
  ariaLabel?: string
} & InlineDivStyle

export const Grid = ({ children, onClick, ariaLabel, ...style }: GridProps) => {
  return (
    <div
      style={{ display: 'grid', ...dankStylez(style) }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  )
}
