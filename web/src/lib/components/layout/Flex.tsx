import { ReactNode } from 'react'

import { InlineDivStyle } from '@/lib/types'
import { dankStylez } from '@/lib/magic'
import { useDisclosure } from '@/lib/hooks'

export type FlexProps = {
  children?: ReactNode
  _hover?: InlineDivStyle
} & InlineDivStyle

export const Flex = ({ children, _hover, ...style }: FlexProps) => {
  const hovering = useDisclosure()

  return (
    <div
      onMouseEnter={hovering.open}
      onMouseLeave={hovering.close}
      style={{
        display: 'flex',
        ...dankStylez(style),
        ...(hovering.isOpen && _hover),
      }}
    >
      {children}
    </div>
  )
}

export const FlexRow = (props: FlexProps) => {
  return <Flex alignItems="center" flexDirection="row" {...props} />
}

export const FlexCol = (props: FlexProps) => {
  return <Flex flexDirection="column" {...props} />
}
