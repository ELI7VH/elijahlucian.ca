import { useBool } from '@/lib/hooks/useBool'
import { Grid } from '../layout/Grid'
import { Button } from '../elements/Button'
import { RefObject, useEffect, useRef, useState } from 'react'
import { Box } from '../layout/Box'
import { FlexRow } from '../layout/Flex'
import { toAudioDuration } from '@/lib/magic'
import { P } from '../typography/P'

type Props = {
  src: string
}

export const AudioPlayr = ({ src }: Props) => {
  const playing = useBool()
  const loaded = useBool()
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) return

    const onEnded = () => {
      console.log('ended')
      playing.ff()
    }

    const onTimeUpdate = () => {
      setCurrent(audioRef.current?.currentTime || 0)
    }

    audioRef.current.addEventListener('timeupdate', onTimeUpdate)
    audioRef.current.addEventListener('ended', onEnded)
    audioRef.current.addEventListener('pause', onEnded)

    return () => {
      audioRef.current?.removeEventListener('ended', onEnded)
      audioRef.current?.removeEventListener('pause', onEnded)
    }
  }, [playing.state])

  return (
    <Grid gap="0.5rem">
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => {
          playing.ff()
        }}
        onPlay={playing.tt}
        onLoadedData={(e) => {
          loaded.tt()
          setDuration(e.currentTarget.duration)
        }}
      />
      <Button
        onClick={() => {
          if (playing.state) {
            audioRef.current?.pause()
            audioRef.current?.load()
            playing.ff()
          } else audioRef.current?.play()
        }}
      >
        {playing.state ? '⏸' : '▶'}
      </Button>
      <FlexRow
        justifyContent="space-between"
        fontFamily="var(--mono)"
        fontSize="0.8rem"
      >
        <P>{toAudioDuration(audioRef.current?.currentTime || 0)}</P>
        <P>{toAudioDuration(duration)}</P>
      </FlexRow>
      <Box
        position="relative"
        width="100%"
        height="1rem"
        backgroundColor="var(--trans-black-2)"
        borderRadius="1rem"
      >
        <AudioProgressBar
          playing={playing.state}
          duration={duration}
          audioRef={audioRef}
        />
      </Box>
    </Grid>
  )
}

const AudioProgressBar = ({
  playing,
  audioRef,
  duration,
}: {
  playing: boolean
  audioRef: RefObject<HTMLAudioElement>
  duration: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let animationFrame: number | null = null

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height

    ctx.clearRect(0, 0, width, height)

    const update = () => {
      ctx.clearRect(0, 0, width, height)
      const current = audioRef.current?.currentTime || 0

      ctx.strokeStyle = 'white'
      ctx.fillStyle = 'white'
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      ctx.lineTo(width * (current / duration), height / 2)
      ctx.stroke()

      // console.log('update', current, duration)

      if (playing) {
        animationFrame = requestAnimationFrame(update)
      }
    }

    if (playing) {
      // console.log('start', progress.current, duration)
      animationFrame = requestAnimationFrame(update)
    }

    if (!playing) {
      // console.log('stop', progress.current, duration)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [duration, playing, audioRef])

  return (
    <canvas
      ref={canvasRef}
      width="100%"
      height="1rem"
      style={{ width: '100%', height: '1rem' }}
    />
  )
}
