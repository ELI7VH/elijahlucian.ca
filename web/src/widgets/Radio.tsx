import {
  Button,
  Checkbox,
  Flex,
  FlexRow,
  Grid,
  Link,
  P,
  Pre,
  useSearchParams,
} from '@/lib'
import { Tooltip } from '@/lib/components/widgets/Tooltip'
import { useSongs } from '@/lib/hooks/api/useSongs'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { Rando } from '@dank-inc/numbaz'
import { useEffect, useRef, useState } from 'react'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetBody } from './components/WidgetBody'
import { WidgetContainer } from './components/WidgetContainer'
// import { useNavigate } from 'react-router-dom'

export const Radio = () => {
  const songs = useSongs()
  const sp = useSearchParams()
  const collapsed = useLocalState('radio-collapsed', false)
  const [history, setHistory] = useState<number[]>([])

  // const songPosition = useLocalState('radio-song-position', 0)
  const repeat = useLocalState('radio-repeat', false)
  const shuffle = useLocalState('radio-shuffle', false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const autoplay = useLocalState('radio-autoplay', false)

  const index = useLocalState('radio-index', 0)
  const queueId = sp.get('queue-id')
  // const navigate = useNavigate()

  useEffect(() => {
    if (!queueId || !audioRef.current) return

    const song = songs.index?.[queueId]

    console.log('playing song:', queueId, song)
    // if audio playing, set listener to go to (song)

    if (!song) return

    const i = songs.data?.findIndex((s) => s.id === queueId)

    if (!i || i === -1) return

    index.set(i)
    setHistory([...history, i])

    sp.set('queue-id')
  }, [queueId])

  useEffect(() => {
    if (autoplay.state && audioRef.current?.src) audioRef.current?.play()
  }, [audioRef.current?.src])

  if (songs.isLoading) return null
  if (songs.error) return null
  if (!songs.data) return null

  // todo: generate playlist - save seed to local storage
  // todo: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
  // https://stackoverflow.com/a/70638608/2213321

  const selected = songs.data[index.state]

  if (!selected) return null

  return (
    <WidgetContainer>
      <WidgetBadge
        name={collapsed.state ? 'r' : 'Radio'}
        onClick={() => collapsed.toggle()}
      />
      <WidgetBody
        collapsed={collapsed.state}
        backgroundColor="#111"
        border="2px solid var(--gray-6)"
      >
        <FlexRow justifyContent="space-between" width="100%">
          <Tooltip
            text={
              <Grid gap="0.2rem">
                {songs.data
                  ?.slice(index.state - 3, index.state + 4)
                  .map((s, i) =>
                    index.state - 3 + i === index.state ? (
                      <P
                        textAlign="center"
                        key={`${s.originalFilename}-${s.id}`}
                        backgroundColor={'var(--brand-2)'}
                        padding="0.2rem"
                        borderRadius="0.2rem"
                      >
                        {index.state - 3 + i}: {s.originalFilename}
                      </P>
                    ) : (
                      <Button
                        size="small"
                        key={`${s.originalFilename}-${s.id}`}
                        onClick={() => index.set(index.state - 3 + i)}
                      >
                        {index.state - 3 + i}: {s.originalFilename}
                      </Button>
                    ),
                  )}
              </Grid>
            }
          >
            <Pre>
              [{index.state + 1}/{songs.data.length}]
            </Pre>
          </Tooltip>
          <Link
            to={{
              search: `?song-id=${selected.id}`,
            }}
          >
            <Flex gap="1rem" justifyContent="space-between">
              <Pre>{selected?.originalFilename || selected?.name}</Pre>
            </Flex>
          </Link>
        </FlexRow>
        <audio
          ref={audioRef}
          src={selected.link}
          controls
          autoPlay={autoplay.state}
          preload=""
          onPause={() => {
            console.log('playback paused')
          }}
          onEnded={() => {
            if (repeat.state) {
              audioRef.current?.play()
              return
            }

            if (!autoplay.state) return

            if (shuffle.state) {
              index.set(Math.floor(Rando.range(0, songs.data.length - 1)))
            } else {
              index.set(index.state + 1)
            }
          }}
          style={{
            width: '100%',
            height: '2rem',
            pointerEvents: 'all',
            // borderRadius: '0.1rem',
            // backgroundColor: 'black',
          }}
        />
        <FlexRow gap="1rem" justifyContent="space-between">
          <Button
            onClick={() => {
              const i = Math.floor(Rando.range(0, songs.data.length - 1))
              index.set(i)
              setHistory([...history, i])
            }}
          >
            <Pre>random</Pre>
          </Button>
          <Flex gap="1rem">
            <label
              style={{ fontSize: '0.8rem', cursor: 'pointer' }}
              htmlFor="autoplay"
            >
              <Flex gap="0.5rem">
                <Checkbox
                  id="autoplay"
                  checked={autoplay.state}
                  onChange={(checked) => autoplay.set(checked)}
                />
                autoplay
              </Flex>
            </label>
            <label
              style={{ fontSize: '0.8rem', cursor: 'pointer' }}
              htmlFor="shuffle"
            >
              <Flex gap="0.5rem">
                <Checkbox
                  id="shuffle"
                  checked={shuffle.state}
                  onChange={(checked) => shuffle.set(checked)}
                />
                shuffle
              </Flex>
            </label>
            <label
              style={{ fontSize: '0.8rem', cursor: 'pointer' }}
              htmlFor="repeat"
            >
              <Flex gap="0.5rem">
                <Checkbox
                  id="repeat"
                  checked={repeat.state}
                  onChange={(checked) => repeat.set(checked)}
                />
                repeat
              </Flex>
            </label>
          </Flex>
          <FlexRow>
            <Button
              onClick={() => {
                const prev = history.pop()

                const last =
                  index.state === 0 ? songs.data.length - 1 : index.state - 1

                index.set(prev || last)
                setHistory([...history.slice(0, -1)])
              }}
            >
              <span
                style={{
                  transform: 'scaleX(-1)',
                  display: 'inline-block',
                }}
              >
                ➢
              </span>
            </Button>
            <Button
              onClick={() => {
                const next = shuffle.state
                  ? history[Math.floor(Rando.range(0, history.length - 1))]
                  : index.state === songs.data.length - 1
                  ? 0
                  : index.state + 1

                setHistory([...history, next])
                index.set(next)
              }}
            >
              ➢
            </Button>
          </FlexRow>
        </FlexRow>
      </WidgetBody>
    </WidgetContainer>
  )
}
