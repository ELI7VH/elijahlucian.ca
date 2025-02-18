import {
  Button,
  Flex,
  FlexRow,
  Grid,
  H1,
  Json,
  Link,
  P,
  Pre,
  useSearchParams,
} from '@/lib'
import { Tooltip } from '@/lib/components/widgets/Tooltip'
import { useSongs } from '@/lib/hooks/api/useSongs'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { Rando } from '@dank-inc/numbaz'
import { useEffect, useRef } from 'react'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetBody } from './components/WidgetBody'
import { WidgetContainer } from './components/WidgetContainer'

export const Radio = () => {
  const songs = useSongs()
  const sp = useSearchParams()
  const collapsed = useLocalState('radio-collapsed', true)

  const songPosition = useLocalState('radio-song-position', 0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const autoplay = useLocalState('autoplay', false)
  const index = useLocalState('radio-index', 0)
  const queueId = sp.get('queue-id')

  useEffect(() => {
    if (!queueId || !audioRef.current) return

    const song = songs.index?.[queueId]

    console.log('playing song:', queueId, song)
    // if audio playing, set listener to go to (song)

    if (!song) return

    const i = songs.data?.findIndex((s) => s.id === queueId)

    if (!i || i === -1) return

    index.set(i)

    // audioRef.current.src = song.link
    // audioRef.current.load()
    // audioRef.current.play()

    sp.set('queue-id')
  }, [queueId])

  useEffect(() => {
    console.log('autoplay', audioRef.current, autoplay.state)
    if (autoplay.state) audioRef.current?.play()
    else audioRef.current?.pause()
  }, [audioRef.current, autoplay.state])

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
      <WidgetBody collapsed={collapsed.state} width="600px" maxWidth="600px">
        <FlexRow justifyContent="space-between" width="100%" maxWidth="600px">
          <Tooltip
            text={
              <Grid gap="0.2rem">
                {songs.data
                  .slice(index.state - 3, index.state + 4)
                  .map((s, i) =>
                    index.state - 3 + i === index.state ? (
                      <P
                        textAlign="center"
                        key={s.originalFilename}
                        backgroundColor={'var(--brand-2)'}
                        padding="0.2rem"
                        borderRadius="0.2rem"
                      >
                        {index.state - 3 + i}: {s.originalFilename}
                      </P>
                    ) : (
                      <Button
                        key={s.originalFilename}
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
              [{index.state}/{songs.data.length}]
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
          onEnded={() => index.set(index.state + 1)}
          onPlay={() => autoplay.set(true)}
          onPause={() => autoplay.set(false)}
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
            onClick={() =>
              index.set(Math.floor(Rando.range(0, songs.data.length - 1)))
            }
          >
            <Pre>random</Pre>
          </Button>
          <FlexRow>
            <Button
              onClick={() =>
                index.set(
                  index.state === 0 ? songs.data.length - 1 : index.state - 1,
                )
              }
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
              onClick={() =>
                index.set(
                  index.state === songs.data.length - 1 ? 0 : index.state + 1,
                )
              }
            >
              ➢
            </Button>
          </FlexRow>
        </FlexRow>
      </WidgetBody>
    </WidgetContainer>
  )
}
