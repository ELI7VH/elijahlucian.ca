import { Box } from '@/lib'
import { PropsWithChildren } from 'react'

export const Layerz = ({ children }: PropsWithChildren) => {
  // A context that togglels different layerz
  // hotkeymap will manage state of the layers, etc.

  // contain hotkeys within this scope, if this the layer is reduced, then the hotkeys should not trigger.

  return (
    <Box
      position="absolute"
      top="1rem"
      left="1rem"
      right="1rem"
      bottom="1rem"
      pointerEvents="none"
      zIndex={1000}
    >
      {children}
    </Box>
  )
}
