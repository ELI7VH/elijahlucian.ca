import { BaseQueryProps, useBaseQuery } from './useBaseQuery'

type VoteItem = {
  id: string
  name: string
  first_name: string
  last_name: string
  middle_name: string
  description: string
  category: string
  votes: number
  createdAt: string // date string
  updatedAt: string // date string
}

export const useVoteItems = (props?: Partial<BaseQueryProps<VoteItem>>) => {
  const query = useBaseQuery<VoteItem>({
    path: '/vote-items',
    queryKey: ['vote-items'],
    initialValues: {},
    ...props,
  })

  return query
}
