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
  const deletable = useLocalState('admin-static-deletable', false)

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
            <FlexRow justifyContent="space-between" gap="1rem">
              <input
                width="10ch"
                type="search"
                value={search.state}
                onChange={(e) => search.set(e.target.value)}
                placeholder="Search"
              />
              <FlexRow gap="0.5rem">
                <P>Deletable</P>
                <input
                  type="checkbox"
                  checked={deletable.state}
                  onChange={(e) => deletable.set(e.target.checked)}
                  placeholder="Deletable"
                />
              </FlexRow>
              <FlexRow gap="0.5rem">
                <input
                  width="10ch"
                  value={pageSize.state}
                  onChange={(e) => pageSize.set(Number(e.target.value))}
                  placeholder="Page Size"
                />
                <Button
                  disabled={page.state === 0}
                  size="small"
                  onClick={() => page.set(page.state - 1)}
                >
                  Prev
                </Button>
                <P fontSize="0.5rem" textAlign="center">
                  Page {page.state + 1}
                </P>
                <Button
                  disabled={
                    !!staticObjects.data?.length &&
                    page.state ===
                      Math.ceil(
                        (staticObjects.data?.length || 0) / pageSize.state,
                      )
                  }
                  size="small"
                  onClick={() => page.set(page.state + 1)}
                >
                  Next
                </Button>
              </FlexRow>
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
                    disabled={!deletable.state}
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
