import { Box, Flex, Link, P } from '@/lib'

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
    </Page>
  )
}
