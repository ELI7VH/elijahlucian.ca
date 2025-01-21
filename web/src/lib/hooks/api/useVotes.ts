import { useBaseQuery } from './useBaseQuery'

type Vote = {
  id: string
  item: string
  user: string
  createdAt: string // date string
  updatedAt: string // date string
}

export const useVotes = () => {
  const query = useBaseQuery<Vote>({
    path: '/votes',
    queryKey: ['votes'],
    initialValues: {},
  })

  return query
}
