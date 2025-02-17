import { useApiContext } from '@/lib/providers'
import { useQuery } from '@tanstack/react-query'
import { keyBy } from 'lodash'
import { useForm } from '../useForm'
import { useQueryFns } from '../useQuery'

type Song = {
  id: string
  bucket: string
  filename: string
  folder: string
  link: string
  mime: string
  name: string
  originalFilename: string
  size: number
  notes: string
}

export const useSongs = () => {
  const api = useApiContext()

  const query = useQuery({
    queryKey: ['songs'],
    queryFn: () => api.get<Song[]>('/songs'),
  })

  const index = keyBy(query.data, 'id')

  return { ...query, index }
}

export const useSong = (id?: string | null) => {
  const { index } = useSongs()

  // const query = useQuery({
  //   queryKey: ['songs', id],
  //   queryFn: () => api.get<Song>(`/songs/${id}`),
  // })
  const song = id ? index[id] : undefined

  const fns = useQueryFns({
    path: '/songs',
    queryKey: ['songs'],
    id,
  })

  const form = useForm({
    values: {
      id: song?.id,
      name: song?.name,
      originalFilename: song?.originalFilename,
      notes: song?.notes,
    },
  })

  return { ...song, form, fns }
}
