import {
  Button,
  FlexRow,
  Grid,
  HotInput,
  Json,
  Link,
  Pre,
  useUserContext,
} from '@/lib'
import { useToast } from '@/lib/hooks/useToast'
import { useState } from 'react'

export const UserChip = () => {
  const user = useUserContext()
  const { toast } = useToast()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    console.log('login', username, password)
    await user.login({ username, password })
  }

  if (!user.user)
    return (
      <form onSubmit={handleLogin}>
        <Grid
          gap="1rem"
          padding="1rem"
          background="var(--trans-black-1)"
          borderRadius="0.2rem"
          border="1px solid var(--gray-3)"
        >
          <Grid gridTemplateColumns="1fr 1fr" gap="1rem">
            <input
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </Grid>
          <FlexRow justifyContent="end">
            <Button type="submit" variant="highlighted">
              Sign In
            </Button>
          </FlexRow>
        </Grid>
      </form>
    )

  return (
    <Grid gap="1rem">
      <Pre>{user.user?.username}</Pre>
      <HotInput
        value={user.user?.telegramId || ''}
        onFinish={async (value) => {
          await user.update({ telegramId: value })
        }}
      />
      <Button
        onClick={async () => {
          await user.logout()
          toast('Signed out')
        }}
      >
        Sign Out
      </Button>
      {user.user.admin && <Link to="/admin">Admin Panel</Link>}
      {user.user.admin && <Json data={user.user} />}
    </Grid>
  )
}
