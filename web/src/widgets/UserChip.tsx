import { Button, Divider, Grid, Input, Pre, useUserContext } from '@/lib'
import { useToast } from '@/lib/hooks/useToast'

export const UserChip = () => {
  const user = useUserContext()
  const { toast } = useToast()

  if (!user.user)
    return (
      <Grid>
        <Grid gridTemplateColumns="1fr 1fr">
          <Input placeholder="username" {...user.loginForm.bind('username')} />
          <Input
            placeholder="password"
            {...user.loginForm.bind('password')}
            type="password"
          />
        </Grid>
        <Button
          onClick={async () => {
            try {
              await user.login({
                username: user.loginForm.values.username || '',
                password: user.loginForm.values.password || '',
              })
              toast.toast('Signed in')
            } catch (error) {
              toast.toast('Invalid username or password')
            }
          }}
        >
          Sign In
        </Button>
      </Grid>
    )

  return (
    <Grid gap="1rem">
      <Pre>{user.user?.username}</Pre>
      <Button
        onClick={async () => {
          await user.logout()
          toast.toast('Signed out')
        }}
      >
        Sign Out
      </Button>
      <Divider />
      {/* <Json data={user.user} /> */}
    </Grid>
  )
}
