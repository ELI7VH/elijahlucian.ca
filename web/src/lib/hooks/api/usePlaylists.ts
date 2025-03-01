import { useBaseQuery } from './useBaseQuery'

type Playlist = {
  id: string
  name: string
  items: string[]
}

export const usePlaylists = () => {
  return useBaseQuery<Playlist>({
    path: '/playlists',
    queryKey: ['playlists'],
  })
}
