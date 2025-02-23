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
} from './lib'
import { useEffect } from 'react'
import { useState } from 'react'
import { Home } from './routes/home'
import { ThoughtBubby } from './widgets/ThoughtBubby'
import { Null } from './routes/null'

export const App = () => {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setStarted(true)
    }, 1000)
  }, [])

  // todo: grow the text on the home page
  // todo: ui sound effects, because we're making a fucking banger here.

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
            <ThoughtBubby />
            <Link to="/">
              <H1>elijah lucian</H1>
            </Link>
          </Box>
          <Divider />
          <Routes>
            <Route path="/null" element={<Null />} />
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
          <FlexRow justifyContent="center" gap="1rem">
            <Link
              target="_blank"
              to="https://music.youtube.com/playlist?list=PLMrGa3-RIUa6vT8mJFYsEHGhsrcnJ3kkM"
            >
              ▻ my current "album" (youtube)
            </Link>
            <Link
              target="_blank"
              to="https://open.spotify.com/artist/3DDcytjYeKW2oDq3tWZPVF"
            >
              ▻ spotify
            </Link>
            <Link target="_blank" to="https://www.instagram.com/elijahlucian">
              ▻ instagram
            </Link>
            <Link target="_blank" to="https://linktr.ee/eli7vh">
              ▻ linktree
            </Link>
          </FlexRow>
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
