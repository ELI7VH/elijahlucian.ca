import { Box, Flex, FlexRow, Link, P } from '@/lib'

import { Page } from '@/lib'

export const Home = () => {
  return (
    <Page>
      <P>home - nothing here yet...</P>
      <Link to="/">
        <Flex gap="1ch">
          <span
            style={{
              transform: 'scaleX(-1)',
              display: 'inline-block',
            }}
          >
            ➫
          </span>
          <Box>back</Box>
        </Flex>
      </Link>
      <FlexRow justifyContent="end">
        <Link to="/null">
          <Flex gap="1ch" color="var(--gray-5)">
            <Box>№</Box>
            <Box>null</Box>
          </Flex>
        </Link>
      </FlexRow>
    </Page>
  )
}
