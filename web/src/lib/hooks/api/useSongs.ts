import { useApiContext } from '@/lib/providers'
import { useMutation, useQuery } from '@tanstack/react-query'
import { keyBy } from 'lodash'
import { useForm } from '../useForm'
import { useQueryFns } from '../useQuery'

export type Song = {
  id: string
  bucket: string
  filename: string
  folder: string
  link: string
  mime: string
  name: string
  originalFilename: string
  size: number | string
  notes: string
  bpm: number | string
  key: string
}

export const useSongs = () => {
  const api = useApiContext()

  const fns = useQueryFns<Song>({
    queryKey: ['songs'],
    path: '/songs',
  })

  const query = useQuery({
    queryKey: ['songs'],
    queryFn: () => api.get<Song[]>('/songs'),
  })

  const index = keyBy(query.data, 'id')

  return { ...query, index, ...fns }
}

export const useSong = (id?: string | null) => {
  const songs = useSongs()
  const api = useApiContext()

  const song = id ? songs.index[id] : undefined

  const update = useMutation({
    mutationFn: (data: Partial<Song>) => api.patch(`/songs/${id}`, data),
    onSuccess: () => {
      songs.refetch()
    },
  })

  const form = useForm({
    values: {
      id: song?.id,
      name: song?.name,
      originalFilename: song?.originalFilename,
      notes: song?.notes,
    },
  })

  return { data: song, form, update }
}
