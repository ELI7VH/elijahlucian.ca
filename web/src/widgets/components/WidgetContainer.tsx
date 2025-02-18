import { Box } from '@/lib'
import { PropsWithChildren } from 'react'

export const WidgetContainer = ({ children }: PropsWithChildren) => {
  return <Box position="relative">{children}</Box>
}
