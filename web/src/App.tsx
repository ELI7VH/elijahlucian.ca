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
import { Radio } from './widgets/Radio'
import { DesktopContainer } from './widgets/components/DesktopContainer'
import { Home } from './routes/home'
import { AdminPanel } from './widgets/AdminPanel'
import { SongInfo } from './widgets/SongInfo'

export const App = () => {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setStarted(true)
    }, 1000)
  }, [])

  // todo: grow the text on the home page

  return (
    <Grid height="100vh" gridTemplateRows="auto  1fr auto">
      <FlexRow justifyContent="center" padding="1rem" gap="1rem">
        <Clock />
      </FlexRow>
      <Page>
        <FlexCol justifyContent="center" alignItems="center" gap="1rem">
          <Box opacity={started ? 1 : 0} transition="all 0.5s ease-in">
            <Link to="/">
              <H1>elijah lucian</H1>
            </Link>
          </Box>
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
      <DesktopContainer>
        <Radio />
        <AdminPanel />
        <SongInfo />
      </DesktopContainer>
    </Grid>
  )
}
