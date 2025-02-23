import { Box, BoxProps } from '@/lib'

type Props = BoxProps

export const WidgetContainer = ({ children, ...props }: Props) => {
  return (
    <Box
      position="relative"
      width="100%"
      // border="1px solid var(--brand-1)"
      {...props}
    >
      {children}
    </Box>
  )
}
