import {
  Box,
  Button,
  Divider,
  FlexRow,
  H1,
  Input,
  Link,
  P,
  Table,
  useSearchParams,
} from '@/lib'
import { Song, useSongs } from '@/lib/hooks/api/useSongs'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetBody } from './components/WidgetBody'
import { WidgetContainer } from './components/WidgetContainer'
import { useNavigate } from 'react-router-dom'
import { useLocalDB } from '@/lib/hooks/useLocalDB'

export const PlaylistWidget = () => {
  const songs = useSongs()
  const collapsed = useLocalState('playlist-panel-collapsed', true)
  // use localdb to store user state

  const starred = useLocalDB<Record<string, boolean>>('starred-songs')
  const playlists = useLocalDB<Record<string, string[]>>('playlists', {
    vibes: [],
    ambient: [],
    podcasts: [],
    releases: [],
  })
  const playlist = useLocalState('playlist-name', 'vibes')
  const onlyStars = useLocalState('playlist-only-stars', false)
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

  const next = () => {
    // if only stars, find next starred song
  }

  const prev = () => {
    // if only stars, find prev starred song
  }

  const playlistSongs = playlist.state
    ? (playlists.value[playlist.state]
        ?.map((id) => songs.data.find((s) => s.id === id))
        .filter(Boolean) as Song[]) || []
    : songs.data

  return (
    <WidgetContainer>
      <WidgetBadge
        name={collapsed.state ? 'p' : 'Playlist'}
        onClick={() => collapsed.toggle()}
      ></WidgetBadge>
      <WidgetBody
        collapsed={collapsed.state}
        opacity={1}
        backgroundColor="white"
        color="black"
        maxWidth="600px"
        border="2px solid var(--gray-6)"
      >
        <FlexRow justifyContent="space-between">
          <FlexRow gap="0.5rem">
            <H1 fontSize="1rem" position="relative" top="7px">
              songs {search ? '' : ''}({songs.data.length})
            </H1>
            <Button
              size="small"
              onClick={() => onlyStars.toggle()}
              variant={onlyStars.state ? 'contained' : 'text'}
            >
              {onlyStars.state ? '★' : '☆'}
            </Button>
          </FlexRow>
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
            +
          </Button>
        </FlexRow>
        <Divider />
        <FlexRow gap="0.5rem" alignItems="end" justifyContent="space-between">
          <FlexRow gap="0.5rem">
            <Button
              size="small"
              onClick={() => playlist.set('releases')}
              variant={playlist.state === 'releases' ? 'contained' : 'text'}
            >
              Releases
            </Button>
            <Button
              size="small"
              onClick={() => playlist.set('podcasts')}
              variant={playlist.state === 'podcasts' ? 'contained' : 'text'}
            >
              Podcasts
            </Button>
            <Button
              size="small"
              onClick={() => playlist.set('vibes')}
              variant={playlist.state === 'vibes' ? 'contained' : 'text'}
            >
              Vibes
            </Button>

            <Button
              size="small"
              onClick={() => playlist.set('ambient')}
              variant={playlist.state === 'ambient' ? 'contained' : 'text'}
            >
              Ambient
            </Button>
            <Button
              size="small"
              onClick={() => playlist.set('')}
              variant="text"
            >
              All
            </Button>
          </FlexRow>
          <Button
            size="small"
            onClick={() => {
              playlists.set(playlist.state, [
                ...(playlists.value[playlist.state] || []),
                songId,
              ])
            }}
          >
            +
          </Button>
        </FlexRow>
        <Table
          maxHeight="20vh"
          data={(filtered || playlistSongs).filter((s) =>
            onlyStars.state ? starred.value[s.id] : true,
          )}
          padding="0.25rem"
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
            {
              label: 'Remove',
              render: (r, i) => (
                <Button
                  disabled={!playlist.state}
                  size="small"
                  variant="text"
                  onClick={() => {
                    playlists.set(
                      playlist.state,
                      playlists.value[playlist.state]
                        .slice(0, i)
                        .concat(playlists.value[playlist.state].slice(i + 1)),
                    )
                  }}
                >
                  -
                </Button>
              ),
            },
            {
              label: 'Star',
              render: (r) => (
                <Button
                  size="small"
                  variant={starred.value[r.id] ? 'contained' : 'text'}
                  onClick={() => {
                    starred.set(r.id, !starred.get(r.id))
                  }}
                >
                  {starred.value[r.id] ? '★' : '☆'}
                </Button>
              ),
            },
          ]}
        />
      </WidgetBody>
    </WidgetContainer>
  )
}
