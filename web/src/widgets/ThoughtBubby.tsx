import { useEffect } from 'react'

import { Box, Flex, Grid, H3, P, Page, useDisclosure } from '@/lib'
import { useState } from 'react'

export const ThoughtBubby = () => {
  const [thoughts, setThoughts] = useState<string[]>([])

  return (
    <Grid position="relative">
      <Box position="absolute" top="-20px" right="-50px">
        <Flex>
          <P>...</P>
          <Bubble>hello world</Bubble>
        </Flex>
      </Box>
    </Grid>
  )
}

export const Bubble = ({ children }: { children: React.ReactNode }) => {
  const open = useDisclosure()

  useEffect(() => {
    setTimeout(() => {
      open.open()
    }, 1000)
  }, [])

  useEffect(() => {
    if (!open.isOpen) return

    setTimeout(() => {
      open.close()
    }, 4000)
  }, [open.isOpen])

  return (
    <Box
      position="absolute"
      top="-50px"
      right="-50px"
      backgroundColor="black"
      color="white"
      padding="10px"
      borderRadius="5px"
      textAlign="center"
      opacity={open.isOpen ? 1 : 0.5}
      scale={open.isOpen ? 1 : 0.5}
      height={open.isOpen ? '100px' : '1px'}
      width={open.isOpen ? '100px' : '1px'}
      transition="all 1.5s ease-in-out"
      overflow="hidden"
    >
      {children}
    </Box>
  )
}
