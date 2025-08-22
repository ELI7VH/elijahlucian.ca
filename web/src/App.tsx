import { Link, Route, Routes } from 'react-router-dom'
import {
  Box,
  Button,
  Clock,
  Divider,
  Flex,
  FlexCol,
  FlexRow,
  Grid,
  H1,
  HotkeyButton,
  Page,
  useUserContext,
} from './lib'
import { useEffect } from 'react'
import { useState } from 'react'
import { Home } from './routes/home'
import { Bub3 } from './widgets/components/Bub3'
import { useThoughts } from './lib/hooks/api/useThoughts'
import { useLocalState } from './lib/hooks/useLocalState'
import { useToast } from './lib/hooks/useToast'
import { useBangerz } from './lib/hooks/useBangerz'

export const App = () => {
  const [started, setStarted] = useState(false)
  const thoughts = useThoughts({ params: { sort: { createdAt: 1 } } })
  const user = useUserContext()
  const [hideSite, setHideSite] = useState(false)
  const hiddenThoughts = useLocalState('hidden-thoughts', false)
  const bangerz = useBangerz()

  const index = useLocalState('thoughts-index', 0)
  const { toast } = useToast()

  useEffect(() => {
    setTimeout(() => {
      setStarted(true)
    }, 1000)
  }, [])

  // todo: ui sound effects, because we're making a fucking banger here.
  const thought = hiddenThoughts.state ? null : thoughts.data?.[index.state]

  return (
    <Grid
      ariaLabel="elijah lucian's personal website, accessibility is not a priority, proceed at your own risk"
      height="100vh"
      maxHeight="100vh"
      overflowY="auto"
      gridTemplateRows="auto  1fr auto"
    >
      <FlexRow justifyContent="center" padding="2rem" gap="1rem">
        <Clock />
      </FlexRow>
      <Page>
        <FlexCol justifyContent="center" alignItems="center" gap="1rem">
          <Box key={`app-bub3-${thought?.id}-${index.state}`}>
            <Box position="relative" top="-2rem">
              {thought && (
                <Bub3
                  onStart={() => {
                    bangerz.play()
                  }}
                  id={`app-bub3-${thought?.id}-${index.state}`}
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
              <FlexRow>
                <Link to="/">
                  <H1>elijah lucian</H1>
                </Link>
              </FlexRow>
              <Flex gap="1ch">
                <Button
                  variant="text"
                  onClick={() => {
                    setHideSite(!hideSite)
                    toast('notice: hiding site content until next reload')
                  }}
                  title="Toggle site visibility"
                >
                  {'𝔁'}
                </Button>

                <HotkeyButton
                  onClick={hiddenThoughts.toggle}
                  hotkey={(e) => e.key === 'h' && (e.ctrlKey || e.metaKey)}
                  hotkeyLabel="Toggle hidden thoughts (ctrl + h)"
                >
                  ☕︎
                </HotkeyButton>
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
      <FlexRow justifyContent="end" padding="2rem" opacity={0.3} gap="1rem">
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
