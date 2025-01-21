import { now, to12h } from '@/lib/magic'
import { useEffect, useState } from 'react'
import { Box, P } from '@/lib/components'

export const Clock = () => {
  const [time, setTime] = useState(now())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box
      bg="cool-bg"
      color="black"
      height="100%"
      padding="0.5rem"
      boxShadow="var(--box-shadow)"
    >
      <P
        textTransform="lowercase"
        fontFamily="var(--font-mono)"
        fontWeight="var(--font-weight-2)"
      >
        {to12h(time)}
      </P>
    </Box>
  )
}
