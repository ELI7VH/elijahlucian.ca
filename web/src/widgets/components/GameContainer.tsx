import { Box, Button, Flex, FlexCol, FlexRow, useBaseQuery } from '@/lib'
import { Grid } from '@/lib'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './WidgetBadge'
import { useHotkey } from '@/lib/hooks/api/useHotkey'
import { useEffect, useRef, useState } from 'react'
import { mapXY } from '@dank-inc/lewps'
import { fromUnix, toFormat, toUnix } from '@/lib/magic'

const magicNumber = 200000000000

export const GameContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const collapsed = useLocalState('game-container-collapsed', true)
  const mode = useLocalState('game-container-mode', 'play')
  const [userInput, setUserInput] = useState<string>('')
  const userInputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string>('')

  const xData = useBaseQuery<any>({
    path: '/X',
    queryKey: ['X'],
    params: {
      query: { scope: 'game' },
      sort: { createdAt: -1 },
    },
  })

  useHotkey({
    keycheck: (e) => e.key === 'Tab',
    callback: () => {
      mode.set(mode.state === 'play' ? 'build' : 'play')
    },
    deps: [mode.state],
  })

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

    const pixels = mapXY(40, 40, (x, y) => {
      return {
        x,
        y,
        h: Math.random() * 360,
        s: 60,
        l: 50,
      }
    })

    const rooms = xData.data?.map((room: any) => ({
      x: toUnix(room.name) / magicNumber,
      y: toUnix(room.name) / magicNumber,
    }))

    const mouse = {
      onElement: false,
      u: 0,
      v: 0,
      inertia: 0,
      update: () => {},
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return

      const width = canvasRef.current.width
      const height = canvasRef.current.height

      const mu = (Math.abs(e.movementX) / width) * 0.2
      const mv = (Math.abs(e.movementY) / height) * 0.2

      mouse.inertia += mu + mv

      mouse.onElement = true
      mouse.u = e.layerX / width
      mouse.v = e.layerY / height
      mouse.update = () => {
        mouse.inertia *= 0.9
      }
    }

    canvasRef.current?.addEventListener('mousemove', handleMouseMove)

    const update = () => {
      if (!canvasRef.current) return
      const ctx = canvasRef.current.getContext('2d')

      if (!ctx) return

      // update game time delta, but do not render

      if (collapsed.state) return

      const width = canvasRef.current.width
      const height = canvasRef.current.height

      ctx.fillStyle = `hsla(0, 0%, 0%, 1)`
      ctx.fillRect(0, 0, width, height)

      const h = Math.random() * 360
      const s = 70
      const l = 20
      ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, 0.2)`

      for (const pixel of pixels) {
        pixel.h += Math.random() * 5

        const s = 7

        ctx.fillStyle = `hsla(${pixel.h}, ${pixel.s}%, ${pixel.l}%, 0.2)`
        ctx.fillRect(pixel.x * width - s / 2, pixel.y * height - s / 2, s, s)
      }

      if (mouse.onElement) {
        ctx.fillStyle = `hsla(${80 + mouse.inertia * 100}, 50%, 50%, 1)`

        const x = mouse.u * width
        const y = mouse.v * height

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + 15, y + 15)
        ctx.lineTo(x, y + 20)
        ctx.closePath()
        ctx.fill()
      }

      mouse?.update?.()

      for (const room of rooms || []) {
        ctx.fillStyle = `#fff`
        ctx.font = '16px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(`⛺︎`, room.x * width, room.y * height)
      }

      requestAnimationFrame(update)
    }

    update()

    return () => {
      canvasRef.current?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mode.state, xData.data])

  useEffect(() => {
    if (!userInputRef.current) return

    userInputRef.current.focus()
  }, [collapsed.state])

  const handleSubmit = (input: string) => {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessage(trimmed)
  }

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
      className="game-container"
      borderWidth={collapsed.state ? '0px' : '2px'}
    >
      <FlexCol
        padding={collapsed.state ? '0' : '1rem'}
        position="absolute"
        overflowY="auto"
        // maxWidth="600px"

        transition="all 0.3s ease-in-out"
        width={collapsed.state ? '1px' : '100%'}
        height={collapsed.state ? '1px' : '100%'}

        // opacity={collapsed.state ? 0 : 1}
        // opacity={collapsed.state ? 0 : 1}
      >
        <WidgetBadge
          top="0"
          left="0"
          name={mode.state === 'play' ? 'play' : 'p'}
          backgroundColor={mode.state === 'play' ? 'var(--brand-1)' : 'white'}
          onClick={() => mode.set('play')}
          color={mode.state === 'play' ? 'white' : 'var(--brand-1)'}
        ></WidgetBadge>
        <WidgetBadge
          top="2rem"
          left="0"
          name={mode.state === 'build' ? 'build' : 'b'}
          backgroundColor={mode.state === 'build' ? 'var(--brand-1)' : 'white'}
          onClick={() => mode.set('build')}
          color={mode.state === 'build' ? 'white' : 'var(--brand-1)'}
        ></WidgetBadge>
      </FlexCol>
      <Grid
        borderRadius="1rem"
        background="rgba(0, 0, 0, 0.9)" /* MUD html background */
        width="100%"
        height="100%"
        transition="all 0.3s ease-in-out"
        opacity={collapsed.state ? 0 : 1}
        pointerEvents={collapsed.state ? 'none' : 'auto'}
        alignItems="center"
        justifyContent="center"
      >
        {!collapsed.state && mode.state === 'play' && (
          <Grid
            width="320px"
            height="320px"
            color="#fafffd"
            position="relative"
            className="interface-container"
          >
            <input
              ref={userInputRef}
              onBlur={() =>
                userInputRef.current && userInputRef.current.focus()
              }
              autoFocus
              autoComplete="off"
              type="text"
              required
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(userInput)
                  setUserInput('')
                }
              }}
              style={{
                gridArea: '1/1/1/1',
                opacity: 0,
                pointerEvents: 'none',
                width: 0,
                height: 0,
              }}
            />
            <canvas
              id="game-canvas"
              width={320}
              height={320}
              ref={canvasRef}
              style={{
                imageRendering: 'pixelated',
                gridArea: '1/1/1/1',
                pointerEvents: 'all',
              }}
            />
            <Box
              gridArea="1/1/1/1"
              bottom="0"
              left="0"
              width="100%"
              height="100%"
              color="#fafffd"
              fontFamily="'Josefin Sans', monospace"
              fontSize="14px"
              pointerEvents="none"
              padding="1ch"
            >
              <span className="interface-caret" style={{ color: '#3c91e6' }}>
                &gt;
              </span>
              <span className="interface-text">{userInput}</span>
              <span className="cursor" style={{ marginLeft: '2px' }}>
                █
              </span>
            </Box>
            <Grid
              gridArea="1/1/1/1"
              textAlign="right"
              justifyContent="end"
              alignItems="end"
              padding="1ch"
              fontFamily="'Josefin Sans', monospace"
              key={message}
              pointerEvents="none"
              animation="fade-in 0.3s ease-in"
              width="100%"
              height="100%"
            >
              {message}
            </Grid>
          </Grid>
        )}
        {mode.state === 'build' && (
          <FlexCol width="100%" height="100%" gap="1rem" padding="3rem">
            <Grid
              border="1px solid white"
              width="100%"
              height="100%"
              justifyContent="start"
              alignItems="start"
              padding="1rem"
            >
              <FlexRow
                padding="1rem"
                border="1px solid white"
                width="100%"
                justifyContent="end"
              >
                <Button
                  onClick={async () => {
                    const room = await xData.create.mutateAsync({
                      type: 'room',
                      scope: 'game',
                      name: 0,
                    })
                    console.log('room', room)
                  }}
                >
                  + ⛺︎
                </Button>
              </FlexRow>
              <Grid
                padding="1rem"
                gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                borderCollapse="collapse"
                border="1px solid white"
              >
                {xData.data?.map((room: any) => (
                  <Flex
                    order={room.name}
                    key={room.id}
                    justifyContent="space-between"
                    alignItems="center"
                    gap="1rem"
                    width="100%"
                    height="100%"
                    padding="1rem"
                    border="1px solid white"
                    fontFamily="monospace"
                  >
                    {toFormat(room.name)}
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const unix = Math.random() * magicNumber
                        console.log('unix', unix)

                        xData.update.mutateAsync({
                          id: room.id,
                          name: fromUnix(unix),
                        })
                      }}
                    >
                      ⛺︎
                    </Button>
                  </Flex>
                ))}
              </Grid>
            </Grid>
          </FlexCol>
        )}
      </Grid>
      <Box position="absolute" bottom="8rem" left="0" textAlign="right">
        <WidgetBadge
          name={collapsed.state ? 'g' : 'game'}
          onClick={() => collapsed.toggle()}
          backgroundColor="var(--gold-3)"
          // variant vs abstracted component
          textStyle={{
            color: collapsed.state ? 'var(--gold-4)' : 'white',
          }}
        />
      </Box>
    </Grid>
  )
}
