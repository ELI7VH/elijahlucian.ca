import { Box, H1, useDisclosure } from '@/lib'
import { InlineDivStyle, InlineHStyle } from '@/lib/types'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  name: ReactNode
  onClick: () => void
  animated?: boolean
  collapsed?: boolean
  textStyle?: InlineHStyle
} & InlineDivStyle

export const WidgetBadge = ({
  children,
  name,
  onClick,
  animated = false,
  collapsed = false,
  textStyle,
  ...style
}: Props) => {
  const hovering = useDisclosure()

  return (
    <Box
      onMouseEnter={hovering.open}
      onMouseLeave={hovering.close}
      position="absolute"
      top="0"
      left="0"
      height="2rem"
      width="2rem"
      pointerEvents="all"
      borderRadius="100%"
      backgroundColor={hovering.isOpen ? '#fff' : 'var(--brand-1)'}
      color={hovering.isOpen ? '#000' : 'white'}
      cursor="pointer"
      userSelect="none"
      boxShadow="1px 1px 0px 0px rgba(0, 0, 0, 0.5)"
      animation={animated ? 'spin 1.3s linear infinite' : 'none'}
      onClick={onClick}
      zIndex={1000}
      {...style}
    >
      {children || (
        <H1
          position="absolute"
          left="7px"
          top="6px"
          fontSize="1.5rem"
          textShadow={
            hovering.isOpen
              ? '2px 2px 0px #000, 3px 3px 0px #fff, 4px 4px 0px #fff, 5px 5px 0px #fff'
              : '2px 2px 0px #000'
          }
          color={hovering.isOpen ? 'var(--brand-1)' : '#fff'}
          {...textStyle}
        >
          {name || 'X'}
        </H1>
      )}
    </Box>
  )
}
