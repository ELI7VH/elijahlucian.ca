import { useBaseQuery } from './useBaseQuery'
import { useBaseRecord } from './useBaseRecord'

type Thought = {
  id: string
  title: string
  text: string
  md: string // maybe markdown. but maybe this is for pages.
  createdAt: string
  items: string[]
}

export const useThoughts = () => {
  return useBaseQuery<Thought>({
    path: '/thoughts',
    queryKey: ['thoughts'],
    params: {
      sort: {
        createdAt: 1,
      },
    },
  })
}

export const useThought = (id?: string) => {
  return useBaseRecord<Thought>({
    path: '/thoughts',
    baseQueryKey: ['thoughts'],
    id,
  })
}
