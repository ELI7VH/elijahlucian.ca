import { Box } from '@/lib'
import { Grid } from '@/lib'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './WidgetBadge'
import { useHotkey } from '@/lib/hooks/api/useHotkey'
import { useEffect, useRef } from 'react'
import { mapXY } from '@dank-inc/lewps'
import { SuperMouse } from '@dank-inc/super-mouse'

export const GameContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const collapsed = useLocalState('game-container-collapsed', true)
  useHotkey({
    keycheck: (e) => e.key === 'g' && (e.ctrlKey || e.metaKey),
    callback: collapsed.toggle,
    deps: [collapsed.state],
    onEscape: () => {
      collapsed.set(true)
    },
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const pixels = mapXY(20, 20, (x, y) => {
      return {
        x,
        y,
        h: Math.random() * 360,
        s: 60,
        l: 50,
      }
    })

    const mouse = new SuperMouse({
      element: canvasRef.current,
    })

    const update = () => {
      if (!canvasRef.current) return
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return

      const width = canvasRef.current.width
      const height = canvasRef.current.height

      ctx.clearRect(0, 0, width, height)

      const h = Math.random() * 360
      const s = 60
      const l = 50
      ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, 1)`

      for (const pixel of pixels) {
        pixel.h += Math.random() * 5

        ctx.fillStyle = `hsla(${pixel.h}, ${pixel.s}%, ${pixel.l}%, 1)`
        ctx.fillRect(pixel.x * width - 4, pixel.y * height - 4, 8, 8)
      }

      if (mouse.onElement) {
        ctx.fillStyle = `hsla(${mouse.scrollY}, 50%, 50%, 1)`
        ctx.fillRect(mouse.u * width - 8, mouse.v * height - 8, 16, 16)
      }

      requestAnimationFrame(update)
    }

    update()
  }, [])

  return (
    <Grid
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      transition="all 0.3s ease-in-out"
      borderColor="white"
      borderRadius="1rem"
      borderStyle="dashed"
      pointerEvents="none"
      borderWidth={collapsed.state ? '0px' : '2px'}
    >
      <Grid
        borderRadius="1rem"
        background="black"
        width="100%"
        height="100%"
        transition="all 0.3s ease-in-out"
        opacity={collapsed.state ? 0 : 1}
        pointerEvents={collapsed.state ? 'none' : 'auto'}
        alignItems="center"
        justifyContent="center"
      >
        <Box width="320px" height="320px">
          <canvas id="game-canvas" width={320} height={320} ref={canvasRef} />
        </Box>
      </Grid>
      <Box position="absolute" bottom="8rem" left="0" textAlign="right">
        <WidgetBadge
          name={collapsed.state ? 'g' : 'game'}
          onClick={() => collapsed.toggle()}
          backgroundColor="white"
          // variant vs abstracted component
          textStyle={{
            color: collapsed.state ? 'white' : 'white',
          }}
        />
      </Box>
    </Grid>
  )
}
