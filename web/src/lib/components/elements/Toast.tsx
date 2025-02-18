import { ReactNode, useEffect, useState } from 'react'
import { Box } from '../layout/Box'

type Props = {
  children?: ReactNode
}

// TODO: Toast Context
export const Toast = ({ children }: Props) => {
  if (!children) return null

  // todo abstract the toast box into "MessageBox"

  return (
    <Box
      position="absolute"
      bottom="0"
      right="0"
      backgroundColor="#111"
      borderRadius="1rem"
      border="1px solid var(--gray-6)"
      overflow="hidden"
      color="var(--gray-0)"
      height={!children ? '0' : 'auto'}
      transition="height 0.3s ease-out"
    >
      <Box bg="background-image-tex" padding="1rem 2rem">
        {children}
      </Box>
    </Box>
  )
}
