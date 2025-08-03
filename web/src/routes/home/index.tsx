import {
  Box,
  Flex,
  FlexCol,
  Grid,
  H3,
  Link,
  P,
  Section,
  useUserContext,
} from '@/lib'

export const Home = () => {
  const user = useUserContext()

  return (
    <Section width="100%">
      <Grid
        maxWidth="100%"
        gridTemplateColumns="repeat(auto-fill, minmax(20rem, 1fr))"
        gap="1rem"
      >
        <FlexCol gap="1rem" textAlign="center">
          <P>
            I'm gonna be real with you, this is an art project. Do not expect
            any kind of professional experience, or you will be hugely
            disappointed. You have to think a bit if you want to explore this
            website. If you don't want to think, there is tiktok, instagram, and
            youtube.
          </P>
          <P>
            If you like to try new things, you've found one of those places.
          </P>
          <Flex gap="1rem" justifyContent="end">
            <Box>
              <Link to="/null">♨︎</Link>
            </Box>
          </Flex>
        </FlexCol>
      </Grid>
    </Section>
  )
}
