import { Box, Flex, FlexCol, Grid, Link, P, Section } from '@/lib'

export const Home = () => {
  return (
    <Section width="100%">
      <Grid maxWidth="100%" gap="1rem" justifyContent="center">
        <FlexCol gap="1rem" textAlign="center" maxWidth="500px">
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
          <P>
            This site gets updated very often, so come back, and just peruse.
            Give yourself a minute to relax and take a break from the
            doomscroll.
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
