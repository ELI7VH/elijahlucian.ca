import { Button, Divider, Grid, Input, Pre, useUserContext } from '@/lib'
import { useToast } from '@/lib/hooks/useToast'

export const UserChip = () => {
  const user = useUserContext()
  const { toast } = useToast()

  if (!user.user)
    return (
      <form onSubmit={user.handleLogin}>
        <Grid>
          <Grid gridTemplateColumns="1fr 1fr">
            <Input
              placeholder="username"
              {...user.loginForm.register('username')}
            />
            <Input
              placeholder="password"
              {...user.loginForm.register('password')}
              type="password"
            />
          </Grid>
          <Button type="submit">
            Sign In
          </Button>
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
      <Divider />
      {/* <Json data={user.user} /> */}
    </Grid>
  )
}
