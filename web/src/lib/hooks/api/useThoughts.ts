import { useBaseQuery } from './useBaseQuery'

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
  })
}
