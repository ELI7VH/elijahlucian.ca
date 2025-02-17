import { Box, H1 } from '@/lib'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  name: ReactNode
  onClick: () => void
  animated?: boolean
  collapsed?: boolean
}

export const WidgetBadge = ({
  children,
  name,
  onClick,
  animated = false,
  collapsed = false,
}: Props) => (
  <Box
    position="absolute"
    top="0"
    left="0"
    height="2rem"
    width="2rem"
    pointerEvents="all"
    borderRadius="100%"
    backgroundColor="var(--brand-1)"
    color="white"
    cursor="pointer"
    userSelect="none"
    boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.5)"
    animation={animated ? 'spin 1.3s linear infinite' : 'none'}
    _hover={{
      backgroundColor: '#fff',
      color: '#000',
      opacity: 1,
    }}
    onClick={onClick}
    zIndex={1000}
  >
    {children || (
      <H1
        position="absolute"
        left="7px"
        top="7px"
        textShadow="2px 2px 0px 0px rgba(0, 0, 0, 1)"
      >
        {name || 'X'}
      </H1>
    )}
  </Box>
)
