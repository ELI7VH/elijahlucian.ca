import { useApiContext } from '@/lib/providers'
import { useQuery } from '@tanstack/react-query'
import { keyBy } from 'lodash'

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
