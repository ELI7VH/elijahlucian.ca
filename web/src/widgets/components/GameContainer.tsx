import { Box, Button, Flex, FlexCol, FlexRow, useBaseQuery } from '@/lib'
import { Grid } from '@/lib'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './WidgetBadge'
import { useHotkey } from '@/lib/hooks/api/useHotkey'
import { useEffect, useRef, useState } from 'react'
import { mapXY } from '@dank-inc/lewps'
import { SuperMouse } from '@dank-inc/super-mouse'
import { fromUnix, toFormat, toHuman, toRelative, toUnix } from '@/lib/magic'

const magicNumber = 200000000000

export const GameContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const collapsed = useLocalState('game-container-collapsed', true)
  const mode = useLocalState('game-container-mode', 'play')
  const [userInput, setUserInput] = useState<string>('')
  const userInputRef = useRef<HTMLInputElement>(null)

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

    const pixels = mapXY(20, 20, (x, y) => {
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

    const mouse = new SuperMouse({
      element: canvasRef.current,
      onScroll(e) {
        e.preventDefault()
        e.stopPropagation()
      },
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
        ctx.fillStyle = `hsla(${80 + mouse.scrollY}, 50%, 50%, 1)`
        const s = 16 + mouse.inertia * 100
        ctx.fillRect(mouse.u * width - s / 2, mouse.v * height - s / 2, s, s)
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
  }, [mode.state, xData.data])

  useEffect(() => {
    if (userInputRef.current) userInputRef.current.focus()
  })

  const handleSubmit = (input: string) => {
    const trimmed = input.trim()
    if (!trimmed) return
    // Placeholder for command handling
    // Integrate with game logic or server here if desired
    // For now, just log the command
    console.log('[game] command:', trimmed)
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
        background="#342e37" /* MUD html background */
        width="100%"
        height="100%"
        transition="all 0.3s ease-in-out"
        opacity={collapsed.state ? 0 : 1}
        pointerEvents={collapsed.state ? 'none' : 'auto'}
        alignItems="center"
        justifyContent="center"
      >
        {mode.state === 'play' && (
          <Grid
            width="320px"
            height="320px"
            color="#fafffd"
            position="relative"
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
            >
              <span style={{ color: '#3c91e6' }}>&gt;</span> {userInput}
              <span className="cursor" style={{ marginLeft: '2px' }}>
                █
              </span>
            </Box>
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
