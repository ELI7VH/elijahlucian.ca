import { useApiContext } from '@/lib/providers'
import { useQuery } from '@tanstack/react-query'

type Pinned = {
  id: string
  type: string
  scope: string
  // if thought
  title: string
  text: string
  // todo: other types of pins
  createdAt: string
  updatedAt: string
}

export const usePinned = () => {
  const api = useApiContext()

  const query = useQuery({
    queryKey: ['me', 'pinned'],
    queryFn: () => api.get<Pinned[]>('/me/pinned'),
  })

  const add = async (id: string) => {
    await api.post('/me/pinned', { id })
    query.refetch()
  }

  const remove = async (id: string) => {
    await api.destroy(`/me/pinned/${id}`)
    query.refetch()
  }

  return { ...query, add, remove }
}
