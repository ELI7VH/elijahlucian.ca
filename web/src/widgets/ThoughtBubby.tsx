import { useEffect } from 'react'

import { Box, Flex, Grid, H3, P, Page, useDisclosure } from '@/lib'
import { useState } from 'react'
import { Rando } from '@dank-inc/numbaz'

export const ThoughtBubby = () => {
  const [thoughts, setThoughts] = useState<string[]>([
    'its been a while since we spoke, I thought we should catch up',
    'hello world!',
  ])

  const rando = Rando.item(thoughts)

  return (
    <Grid position="relative">
      <Box position="absolute" top="-120px" right="-50px">
        <Flex>
          <Bubble n={0}>{rando}</Bubble>
        </Flex>
      </Box>
    </Grid>
  )
}

export const Bubble = ({
  children,
  n,
}: {
  children: React.ReactNode
  n: number
}) => {
  const open = useDisclosure()
  const split = useDisclosure()
  const [left, setLeft] = useState(Rando.int(-50, 50))
  const [top, setTop] = useState(Rando.int(-5, 5) + n * 2)
  const [r, setR] = useState(Rando.normal(0.5, 2.5))
  const [bubs, setBubs] = useState<string[]>([])

  useEffect(() => {
    setTimeout(() => {
      open.open()
    }, 2500)
  }, [])

  useEffect(() => {
    if (!open.isOpen) return

    setTimeout(() => {
      // open.close()
      split.open()
    }, 2000)
  }, [open.isOpen])

  useEffect(() => {
    if (!split.isOpen) return

    const chars = children?.toString().slice(1).split('') || []

    if (chars.length === 0) return

    const r = Math.min(3, Math.random() * chars.length)

    const j = Math.ceil(r)

    const bbs: string[] = []

    for (let i = 0; i < chars.length; i++) {
      const sclice = chars.slice(i, i + j)
      bbs.push(sclice.join(''))
    }

    setBubs(bbs)
  }, [split.isOpen])

  return (
    <Box
      position="relative"
      top={-top}
      left={-left}
      right="-150px"
      color="white"
      padding="10px"
      borderRadius="5px"
      textAlign="center"
      opacity={open.isOpen ? 0.8 : 0.5}
      scale={open.isOpen ? 1 : 0.5}
      height={open.isOpen ? '100px' : '1px'}
      width={open.isOpen ? '100px' : '1px'}
      transition={`all ${r}s linear`}
      // overflow="hidden"
    >
      {bubs.length
        ? bubs.map((b, i) => (
            <Box key={`b-${i}-${n}`} position="absolute">
              <Bubble n={i}>{b}</Bubble>
            </Box>
          ))
        : children}
    </Box>
  )
}
