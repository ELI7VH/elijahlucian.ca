import { dankStylez } from '@/lib/magic'
import { InlineDivStyle } from '@/lib/types'
import { ReactNode } from 'react'

type GridProps = {
  children?: ReactNode
  onClick?: () => void
  ariaLabel?: string
  className?: string
} & InlineDivStyle

export const Grid = ({
  children,
  onClick,
  ariaLabel,
  className,
  ...style
}: GridProps) => {
  return (
    <div
      style={{ display: 'grid', ...dankStylez(style) }}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </div>
  )
}
