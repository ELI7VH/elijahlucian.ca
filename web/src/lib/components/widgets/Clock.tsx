import { now, to24h } from '@/lib/magic'
import { useEffect, useState } from 'react'
import { Box } from '@/lib/components'

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
      col="brand-3"
      width="7ch"
      fontFamily="var(--font-mono)"
      textShadow="1px 1px 0 #000, 2px 2px 0 #000, 3px 3px 0 #000"
    >
      {to24h(time)}
    </Box>
  )
}
