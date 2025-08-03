import { Divider, FlexRow, Grid, H1, Json, Link, Page } from '@/lib'
import { useAdmin } from '@/lib/hooks/api/useAdmin'
import { UserChip } from '@/widgets/UserChip'

export const AdminDashboard = () => {
  const admin = useAdmin()

  return (
    <Page
      width="60vw"
      maxWidth="700px"
      alignContent="center"
      maxHeight="100vh"
      overflow="auto"
      background="rgba(0,0,0,0.4)"
    >
      <FlexRow justifyContent="center">
        <Link to="/">
          <H1>Admin Dashboard</H1>
        </Link>
      </FlexRow>
      <Grid textAlign="center" gap="1rem">
        <Divider />
        <UserChip />
        <Divider />
        <Json data={admin.data} />
      </Grid>
    </Page>
  )
}
