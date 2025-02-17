import {
  Box,
  Button,
  FlexRow,
  H1,
  H3,
  Link,
  Table,
  useSearchParams,
} from '@/lib'
import { useSongs } from '@/lib/hooks/api/useSongs'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetBody } from './components/WidgetBody'
import { WidgetContainer } from './components/WidgetContainer'

export const PlaylistWidget = () => {
  const songs = useSongs()
  const collapsed = useLocalState('playlist-panel-collapsed', true)
  const sp = useSearchParams()
  if (songs.isLoading) return <div>Loading...</div>
  if (songs.error) return <div>Error: {songs.error.message}</div>

  if (!songs.data) return <div>no data?</div>

  return (
    <WidgetContainer>
      <WidgetBadge
        name={collapsed.state ? 'p' : 'Playlists'}
        onClick={() => collapsed.toggle()}
      ></WidgetBadge>
      <WidgetBody
        collapsed={collapsed.state}
        opacity={1}
        backgroundColor="white"
        color="black"
      >
        <FlexRow justifyContent="space-between">
          <H1>songs ({songs.data.length})</H1>
          <Button size="small">add</Button>
        </FlexRow>
        <Table
          maxHeight="20vh"
          data={songs.data}
          columns={[
            {
              render: (r) => (
                <Link
                  to={{
                    search: `?song-id=${r.id}`,
                  }}
                  onClick={() => sp.set('song-id', r.id)}
                >
                  {r.originalFilename || r.name}
                </Link>
              ),
              label: 'Name',
            },
          ]}
        />
      </WidgetBody>
    </WidgetContainer>
  )
}
