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
  useDisclosure,
  useForm,
  useSearchParams,
  useUserContext,
} from '@/lib'
import { useSongs } from '@/lib/hooks/api/useSongs'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetBody } from './components/WidgetBody'
import { WidgetContainer } from './components/WidgetContainer'
import { useNavigate } from 'react-router-dom'
import { useLocalDB } from '@/lib/hooks/useLocalDB'
import { usePlaylists } from '@/lib/hooks/api/usePlaylists'
import { Modal } from './Modal'
import { useToast } from '@/lib/hooks/useToast'

export const PlaylistWidget = () => {
  const songs = useSongs()
  const user = useUserContext()
  const collapsed = useLocalState('playlist-panel-collapsed', true)
  // use localdb to store user state

  const starred = useLocalDB<Record<string, boolean>>('starred-songs')

  const playlists = usePlaylists()

  const onlyStars = useLocalState('playlist-only-stars', false)
  const sp = useSearchParams()
  const navigate = useNavigate()
  const search = sp.get('search')
  const index = useLocalState('radio-index', 0)
  const songId = sp.get('song-id')
  const toast = useToast()

  const playlist = useLocalState('playlist-id', '', {
    onSet: () => sp.set('search'),
  })

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

  const handlePlaylistCreate = async () => {
    await playlists.create.mutateAsync({
      name: playlists.form.values.name,
    })
    toast.toast('Playlist created')
    playlists.createDialog.close()
  }

  const next = () => {
    // if only stars, find next starred song
  }

  const prev = () => {
    // if only stars, find prev starred song
  }

  const playlistSongs = playlists.index[playlist.state]?.items.map(
    (id) => songs.index[id],
  )

  console.log('songs', playlistSongs)
  console.log('filtered', filtered)

  return (
    <>
      <WidgetContainer>
        <WidgetBadge
          name={collapsed.state ? 'p' : 'Playlists'}
          onClick={() => collapsed.toggle()}
        ></WidgetBadge>
        <WidgetBody
          collapsed={collapsed.state}
          backgroundColor="white"
          color="black"
          width="100%"
          border="2px solid var(--gray-6)"
        >
          <FlexRow justifyContent="space-between" gap="1rem">
            <FlexRow gap="0.5rem">
              <H1 fontSize="1rem" position="relative" top="7px">
                songs {search ? '' : ''}({songs.data.length})
              </H1>
              <Button
                size="small"
                onClick={() => onlyStars.toggle()}
                variant={onlyStars.state ? 'contained' : 'ghost'}
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
              {playlists.data?.map((p) => (
                <Button
                  key={p.id}
                  size="small"
                  onClick={() => playlist.set(p.id)}
                  variant={playlist.state === p.id ? 'contained' : 'ghost'}
                >
                  {p.name}
                </Button>
              ))}

              <Button
                size="small"
                onClick={() => playlist.set('')}
                variant="reset"
              >
                All
              </Button>
            </FlexRow>
            {playlist.state ? (
              <Button
                size="small"
                variant="contained"
                onClick={async () => {
                  const songId = sp.get('song-id')
                  if (!playlist.state || !songId) return
                  await playlists.update.mutateAsync({
                    id: playlist.state,
                    items: [...playlists.index[playlist.state].items, songId],
                  })
                }}
              >
                + song
              </Button>
            ) : (
              <Button size="small" onClick={playlists.createDialog.toggle}>
                + playlist
              </Button>
            )}
          </FlexRow>
          <Table
            maxHeight="20vh"
            data={(filtered || playlistSongs || songs.data || []).filter((s) =>
              onlyStars.state ? starred.value[s.id] : true,
            )}
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
                    <P>
                      {i + 1}. {r.name || r.originalFilename}
                    </P>
                  </Link>
                ),
                style: {
                  width: '100%',
                  padding: '0 0.25rem',
                },
                label: `Song (total: ${
                  (filtered || playlistSongs || songs.data || []).length
                })`,
              },
              {
                label: 'Remove',
                style: {
                  textAlign: 'center',
                },
                render: (r, i) => (
                  <Button
                    disabled={!playlist.state}
                    size="small"
                    variant="reset"
                    onClick={async () => {
                      if (!playlist.state) return
                      await playlists.update.mutateAsync({
                        id: playlist.state,
                        items: [
                          ...playlists.index[playlist.state].items.slice(0, i),
                          ...playlists.index[playlist.state].items.slice(i + 1),
                        ],
                      })
                    }}
                  >
                    -
                  </Button>
                ),
              },
              {
                label: 'Star',
                style: {
                  textAlign: 'center',
                  padding: '0 0.25rem',
                },
                render: (r) => (
                  <Button
                    size="small"
                    variant={starred.value[r.id] ? 'contained' : 'ghost'}
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
          <Divider />
          <FlexRow>
            <Button
              size="small"
              variant="reset"
              onClick={() => {
                playlists.destroy.mutateAsync(playlist.state)
                playlist.set('')
              }}
            >
              delete playlist
            </Button>
          </FlexRow>
        </WidgetBody>
      </WidgetContainer>
      <Modal
        open={playlists.createDialog.isOpen}
        onClose={playlists.createDialog.close}
      >
        <P>Create Playlist</P>
        <Input
          {...playlists.form.bind('name')}
          placeholder="Playlist Name"
          style={{ padding: '0.33rem' }}
          onEnter={handlePlaylistCreate}
        />
        <Button onClick={handlePlaylistCreate}>Create</Button>
      </Modal>
    </>
  )
}
