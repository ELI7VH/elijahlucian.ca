import {
  Box,
  Button,
  Divider,
  FlexRow,
  Grid,
  H1,
  Json,
  Link,
  P,
  Page,
  Table,
  useToast,
} from '@/lib'
import { useAdmin, useStatic } from '@/lib/hooks/api/useAdmin'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { toMaxDenom, toRelative } from '@/lib/magic'

export const AdminDashboard = () => {
  const admin = useAdmin()
  const staticObjects = useStatic()
  const search = useLocalState('admin-static-search', '')
  const page = useLocalState('admin-static-page', 0)
  const pageSize = useLocalState('admin-static-page-size', 100)

  const toast = useToast()

  return (
    <Page
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
        <P>Server Config</P>
        <Box textAlign="left">
          <Json data={admin.data} />
        </Box>
        <Divider />
      </Grid>
      <P>Static Objects ({staticObjects.data?.length})</P>
      <Grid gap="1rem" maxHeight="50vh" overflow="auto">
        <Button onClick={() => staticObjects.refetch()}>Refresh</Button>
        <Table
          minHeight="20vh"
          header={
            <FlexRow justifyContent="between">
              <input
                type="search"
                value={search.state}
                onChange={(e) => search.set(e.target.value)}
                placeholder="Search"
              />
            </FlexRow>
          }
          fontSize="0.5rem"
          data={staticObjects.data
            ?.filter((o) => o.Key.includes(search.state))
            .slice(
              page.state * pageSize.state,
              (page.state + 1) * pageSize.state,
            )}
          columns={[
            {
              key: 'Key',
              label: 'Key',
              style: {
                textAlign: 'left',
              },
              render: (value) => (
                <Link to={`https://dev.cdn.elijahlucian.ca/${value.Key}`}>
                  {value.Key}
                </Link>
              ),
            },

            {
              key: 'Size',
              label: 'Size',
              render: (value) => toMaxDenom(value.Size),
            },
            {
              key: 'LastModified',
              label: 'Last Modified',
              render: (value) => toRelative(value.LastModified),
            },

            {
              label: 'R',
              style: {
                textAlign: 'center',
                width: '2ch',
              },
              render: (value) =>
                value.record ? (
                  'Y'
                ) : (
                  <Button
                    size="small"
                    onClick={async () => {
                      try {
                        await staticObjects.deleteStaticObject.mutateAsync(
                          value.Key,
                        )
                        toast.toast('Object deleted', 'success')
                      } catch (error) {
                        toast.toast('Failed to delete object', 'error')
                      }
                    }}
                  >
                    X
                  </Button>
                ),
            },
          ]}
        />
      </Grid>
    </Page>
  )
}
