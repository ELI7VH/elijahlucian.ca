import { Button, Grid, Input, Pre, useUserContext } from '@/lib'
import { useToast } from '@/lib/hooks/useToast'
import { useState } from 'react'

export const UserChip = () => {
  const user = useUserContext()
  const { toast } = useToast()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    user.login({ username, password })
  }

  if (!user.user)
    return (
      <form onSubmit={handleLogin}>
        <Grid>
          <Grid gridTemplateColumns="1fr 1fr">
            <Input
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </Grid>
          <Button type="submit">Sign In</Button>
        </Grid>
      </form>
    )

  return (
    <Grid gap="1rem">
      <Pre>{user.user?.username}</Pre>
      <Button
        onClick={async () => {
          await user.logout()
          toast('Signed out')
        }}
      >
        Sign Out
      </Button>
    </Grid>
  )
}
