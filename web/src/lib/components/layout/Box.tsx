import { ReactNode } from 'react'
import { InlineDivStyle } from '@/lib/types'
import { dankStylez } from '@/lib/magic'
import { useDisclosure } from '@/lib/hooks'

export type BoxProps = {
  children?: ReactNode
  onClick?: () => void
  _hover?: InlineDivStyle
  onMouseEnter?: () => void
  onMouseLeave?: () => void
} & InlineDivStyle

export const Box = ({
  children,
  onClick,
  _hover,
  onMouseEnter,
  onMouseLeave,
  ...style
}: BoxProps) => {
  const hovering = useDisclosure()

  return (
    <div
      onClick={onClick}
      style={{
        ...dankStylez(style),
        ...(hovering.isOpen && _hover),
      }}
      onMouseEnter={onMouseEnter || hovering.open}
      onMouseLeave={onMouseLeave || hovering.close}
    >
      {children}
    </div>
  )
}
