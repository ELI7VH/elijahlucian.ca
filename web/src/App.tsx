import { Link } from 'react-router-dom'
import { Divider, FlexCol, P, Page } from './lib'

export const App = () => {
  return (
    <Page>
      <FlexCol
        justifyContent="center"
        alignItems="center"
        height="100vh"
        gap="1rem"
      >
        <P>elijahlucian.ca</P>
        <Divider />
        <P>- under construction - </P>
        <Divider />
        <Link
          target="_blank"
          to="https://open.spotify.com/artist/3DDcytjYeKW2oDq3tWZPVF"
        >
          spotify
        </Link>
        <Link target="_blank" to="https://www.instagram.com/elijahlucian">
          instagram
        </Link>
        <Link target="_blank" to="https://linktr.ee/eli7vh">
          linktree
        </Link>
        <Link target="_blank" to="https://github.com/eli7vh">
          github
        </Link>
      </FlexCol>
    </Page>
  )
}
