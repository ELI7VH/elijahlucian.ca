import { Link } from 'react-router-dom'
import { Divider, FlexCol, FlexRow, Grid, H1, P, Page } from './lib'

export const App = () => {
  return (
    <Grid height="100vh" gridTemplateRows="auto  1fr auto">
      <FlexRow justifyContent="start" padding="1rem" opacity={0.3}>
        <Link to="https://nextgenart.elijahlucian.ca">▻ pretty things</Link>
      </FlexRow>
      <Page>
        <FlexCol justifyContent="center" alignItems="center" gap="1rem">
          <Link to="/">
            <H1>elijah lucian</H1>
          </Link>
          <Divider />
          <Divider />
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
        </FlexCol>
      </Page>
      <FlexRow justifyContent="end" padding="1rem" opacity={0.3} gap="1rem">
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
