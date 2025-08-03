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
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void
  ref?: React.RefObject<HTMLDivElement>
} & InlineDivStyle

export const Box = ({
  children,
  onClick,
  _hover,
  onMouseEnter,
  onMouseLeave,
  ref,
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
      ref={ref}
    >
      {children}
    </div>
  )
}
