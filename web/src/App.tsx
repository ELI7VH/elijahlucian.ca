import { Link, Route, Routes } from 'react-router-dom'
import {
  Box,
  Clock,
  Divider,
  Flex,
  FlexCol,
  FlexRow,
  Grid,
  H1,
  Page,
  useSearchParams,
  useUserContext,
} from './lib'
import { useEffect } from 'react'
import { useState } from 'react'
import { Home } from './routes/home'
import { Bub3 } from './widgets/components/Bub3'
import { useThoughts } from './lib/hooks/api/useThoughts'
import { useLocalState } from './lib/hooks/useLocalState'
import { useToast } from './lib/hooks/useToast'
import { useHotkeyMap } from './lib/hooks/api/useHotkeyMap'

export const App = () => {
  const [started, setStarted] = useState(false)
  const thoughts = useThoughts({ params: { sort: { createdAt: 1 } } })
  const user = useUserContext()
  const sp = useSearchParams()
  const [hideSite, setHideSite] = useState(false)

  const index = useLocalState('thoughts-index', 0)
  const { toast } = useToast()

  useEffect(() => {
    setTimeout(() => {
      setStarted(true)
    }, 1000)
  }, [])

  // todo: ui sound effects, because we're making a fucking banger here.

  const thoughtId = sp.get('thought-id')

  const thought = thoughtId
    ? thoughts.data?.find((thought) => thought.id == thoughtId)
    : thoughts.data?.[index.state]

  useHotkeyMap({
    mappings: [
      [
        (e) => e.key === 'ArrowRight' && e.shiftKey,
        () => index.set((index.state + 1) % (thoughts.data?.length ?? 0)),
      ],
      [
        (e) => e.key === 'ArrowLeft' && e.shiftKey,
        () => index.set(index.state - 1),
      ],
    ],
    deps: [index.state],
  })

  return (
    <Grid
      height="100vh"
      maxHeight="100vh"
      overflowY="auto"
      gridTemplateRows="auto  1fr auto"
    >
      <FlexRow justifyContent="center" padding="1rem" gap="1rem">
        <Clock />
      </FlexRow>
      <Page>
        <FlexCol justifyContent="center" alignItems="center" gap="1rem">
          <Box opacity={started ? 1 : 0} transition="all 0.5s ease-in">
            <Box position="relative" top="-2rem">
              {thought && (
                <Bub3
                  id={`app-bub3-${thought?.id}`}
                  title={thought?.title ?? ''}
                  text={thought?.text ?? ''}
                  pinned={user?.user?.pinned?.includes(`${thought?.id}`)}
                  onPin={() => {
                    if (!user?.user) {
                      toast('You must be logged in to pin thoughts', 'error')
                      return
                    }

                    if (user?.user?.pinned?.includes(`${thought?.id}`)) {
                      user?.update({
                        pinned: user?.user?.pinned?.filter(
                          (pin) => pin !== `${thought?.id}`,
                        ),
                      })
                      toast(
                        `Unpinned thought: ${thought?.title || 'Untitled'}`,
                        'info',
                      )
                      index.set(index.state - 1)
                    } else {
                      user?.update({
                        pinned: [
                          ...(user?.user?.pinned ?? []),
                          `${thought?.id}`,
                        ],
                      })
                      toast(
                        `Pinned thought: ${thought?.title || 'Untitled'}`,
                        'success',
                      )
                      index.set(index.state + 1)
                    }
                  }}
                  createdAt={thought?.createdAt ?? ''}
                  onPrev={
                    index.state > 0
                      ? () => {
                          index.set(index.state - 1)
                        }
                      : undefined
                  }
                  onNext={
                    index.state < (thoughts.data?.length ?? 0) - 1
                      ? () => {
                          index.set(index.state + 1)
                        }
                      : undefined
                  }
                />
              )}
            </Box>
          </Box>
          {!hideSite && (
            <>
              <Flex gap="1ch">
                <Box cursor="pointer" onClick={() => setHideSite(!hideSite)}>
                  {'𝔁'}
                </Box>
                <Link to="/">
                  <H1>elijah lucian</H1>
                </Link>
                <Box cursor="pointer" onClick={() => index.set(0)}>
                  ☕︎
                </Box>
              </Flex>
              <Divider />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Link to="/home">
                      <Flex gap="1ch">
                        <Box>➫</Box>
                        <Box>enter</Box>
                      </Flex>
                    </Link>
                  }
                />
                <Route path="/home" element={<Home />} />
              </Routes>
              <Divider />
              <FlexRow justifyContent="center" gap="1rem" flexWrap="wrap">
                <Link
                  target="_blank"
                  to="https://music.youtube.com/playlist?list=PLMrGa3-RIUa6vT8mJFYsEHGhsrcnJ3kkM"
                >
                  ▻ youtube (music)
                </Link>
                <Link
                  target="_blank"
                  to="https://open.spotify.com/artist/3DDcytjYeKW2oDq3tWZPVF"
                >
                  ▻ spotify
                </Link>
                <Link
                  target="_blank"
                  to="https://www.instagram.com/elijahlucian"
                >
                  ▻ instagram
                </Link>
                <Link target="_blank" to="https://linktr.ee/eli7vh">
                  ▻ linktree
                </Link>
              </FlexRow>
            </>
          )}
        </FlexCol>
      </Page>
      <FlexRow justifyContent="end" padding="1rem" opacity={0.3} gap="1rem">
        <Flex>
          <Link to="https://nextgenart.elijahlucian.ca">▻ pretty things</Link>
        </Flex>

        <Link target="_blank" to="https://www.patreon.com/c/elijahlucian">
          ▻ patreon
        </Link>
        <Link target="_blank" to="https://github.com/eli7vh/elijahlucian.ca">
          ▻ source code
        </Link>
      </FlexRow>
    </Grid>
  )
}
