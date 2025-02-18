import {
  Box,
  Button,
  FlexRow,
  H1,
  H3,
  Input,
  Link,
  P,
  Table,
  useSearchParams,
} from '@/lib'
import { useSongs } from '@/lib/hooks/api/useSongs'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetBody } from './components/WidgetBody'
import { WidgetContainer } from './components/WidgetContainer'
import { useNavigate } from 'react-router-dom'

export const PlaylistWidget = () => {
  const songs = useSongs()
  const collapsed = useLocalState('playlist-panel-collapsed', true)
  const sp = useSearchParams()
  const navigate = useNavigate()
  const search = sp.get('search')
  const index = useLocalState('radio-index', 0)
  const songId = sp.get('song-id')

  if (songs.isLoading) return <div>Loading...</div>
  if (songs.error) return <div>Error: {songs.error.message}</div>

  if (!songs.data) return <div>no data?</div>

  const filtered = search
    ? songs.data.filter((s) => {
        const searchable = [s.originalFilename, s.name, s.key, s.bpm, s.notes]
          .filter(Boolean)
          .join(' ')

        return searchable.toLowerCase().includes(search.toLowerCase())
      })
    : null

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
        width="600px"
        maxWidth="600px"
      >
        <FlexRow justifyContent="space-between">
          <H1 fontSize="1rem" position="relative" top="7px">
            songs {search ? '' : ''}({songs.data.length})
          </H1>
          {search && <P>search: '{search}'</P>}
          <Input
            placeholder="search"
            style={{ padding: '0.33rem' }}
            value={search}
            onChange={(e) => sp.set('search', e.target.value)}
          />
          <Button
            size="small"
            onClick={() => {
              navigate('/admin')
              collapsed.set(true)
            }}
          >
            add
          </Button>
        </FlexRow>
        <Table
          maxHeight="20vh"
          data={filtered || songs.data}
          columns={[
            {
              render: (r, i) => (
                <Link
                  id={r.id}
                  style={{
                    color:
                      i === index.state
                        ? 'var(--brand-1)'
                        : r.id === songId
                        ? 'var(--brand-2)'
                        : 'var(--gray-6)',
                  }}
                  to={{
                    search: `?song-id=${r.id}`,
                  }}
                  onClick={() => sp.set('song-id', r.id)}
                >
                  {i + 1}: {r.name || r.originalFilename}
                </Link>
              ),
              style: {
                width: '100%',
              },
              label: 'Name',
            },
          ]}
        />
      </WidgetBody>
    </WidgetContainer>
  )
}
