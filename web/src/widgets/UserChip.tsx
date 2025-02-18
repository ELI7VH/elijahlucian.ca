import {
  Button,
  Divider,
  Grid,
  Input,
  Json,
  P,
  Pre,
  useUserContext,
} from '@/lib'

export const UserChip = () => {
  const user = useUserContext()

  if (!user.user)
    return (
      <Grid>
        <Grid gridTemplateColumns="1fr 1fr">
          <Input placeholder="username" {...user.loginForm.bind('username')} />
          <Input placeholder="password" {...user.loginForm.bind('password')} />
        </Grid>
        <Button
          onClick={() =>
            user.login({
              username: user.loginForm.values.username || '',
              password: user.loginForm.values.password || '',
            })
          }
        >
          Sign In
        </Button>
      </Grid>
    )

  return (
    <Grid gap="1rem">
      <Pre>{user.user?.username}</Pre>
      <Button onClick={() => user.logout()}>Sign Out</Button>
      <Divider />
      {/* <Json data={user.user} /> */}
    </Grid>
  )
}
