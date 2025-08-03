import {
  Box,
  Flex,
  FlexCol,
  Grid,
  H3,
  Link,
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
          <H3>nothng here yet...</H3>
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
