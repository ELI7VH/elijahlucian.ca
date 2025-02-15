import { H3, Link, P } from '@/lib'

import { Page } from '@/lib'

export const Home = () => {
  return (
    <Page>
      <P>home - nothing here yet...</P>
      <Link to="/">
        <div
          style={{
            transform: 'scaleX(-1)',
            display: 'inline-block',
          }}
        >
          ➫
        </div>{' '}
        back
      </Link>
    </Page>
  )
}
