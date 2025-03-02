import { FlexCol, H1, Link, Page } from '@/lib'

export const Null = () => {
  // todo grow out things from the center

  return (
    <Page
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      height="100vh"
      maxWidth="100vw"
      // border="1px solid blue"
    >
      <FlexCol gap="1rem">
        <H1>Null</H1>
        <Link to="/">☜ home</Link>
        <Link to="/admin">☞ admin</Link>
      </FlexCol>
    </Page>
  )
}
