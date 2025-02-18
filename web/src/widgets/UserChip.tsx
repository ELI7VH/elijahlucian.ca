import { Button, Grid, Input, P, useUserContext } from '@/lib'

export const UserChip = () => {
  const user = useUserContext()

  if (!user.user)
    return (
      <Grid>
        <Grid gridTemplateColumns="1fr 1fr">
          <Input placeholder="username" {...user.loginForm.bind('username')} />
          <Input placeholder="password" {...user.loginForm.bind('password')} />
        </Grid>
        <Button onClick={() => user.login(user.loginForm.values)}>
          Sign In
        </Button>
      </Grid>
    )

  return (
    <Grid>
      <P>{user.user?.name}</P>
      <Button onClick={() => user.logout()}>Sign Out</Button>
    </Grid>
  )
}
