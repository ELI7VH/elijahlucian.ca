import { ReactNode } from 'react'
import { InlineDivStyle } from '@/lib/types'
import { dankStylez } from '@/lib/magic'
import { useDisclosure } from '@/lib/hooks'

type BoxProps = {
  children?: ReactNode
  onClick?: () => void
  _hover?: InlineDivStyle
} & InlineDivStyle

export const Box = ({ children, onClick, _hover, ...style }: BoxProps) => {
  const hovering = useDisclosure()

  return (
    <div
      onClick={onClick}
      style={{
        ...dankStylez(style),
        ...(hovering.isOpen && _hover),
      }}
      onMouseEnter={hovering.open}
      onMouseLeave={hovering.close}
    >
      {children}
    </div>
  )
}
