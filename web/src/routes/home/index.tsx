import { Link, P } from '@/lib'

import { Page } from '@/lib'

export const Home = () => {
  return (
    <Page>
      <P>home - nothing here yet...</P>
      <Link to="/">
        <span
          style={{
            transform: 'scaleX(-1)',
          }}
        >
          ➫
        </span>
        back
      </Link>
    </Page>
  )
}
