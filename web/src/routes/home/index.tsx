import { Box, Button, Flex, Grid, H3, Link, Section, useToast } from '@/lib'

export const Home = () => {
  return (
    <Section width="100%">
      <Grid
        maxWidth="100%"
        gridTemplateColumns="repeat(auto-fill, minmax(20rem, 1fr))"
        gap="1rem"
      >
        <Flex gap="1rem" flexDirection="column">
          <H3>nothng here yet...</H3>
          <Flex gap="1rem" justifyContent="end">
            <Box>
              <Link to="/null">♨︎</Link>
            </Box>
          </Flex>
        </Flex>
      </Grid>
    </Section>
  )
}
