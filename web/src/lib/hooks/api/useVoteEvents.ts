import { BaseQueryProps, useBaseQuery } from './useBaseQuery'
import { useBaseRecord } from './useBaseRecord'
import { Nation } from './useNations'

export type VoteEvent = {
  id: string
  name: string
  at: string // date string
  duration: number // in minutes
  nation: string
  items: string[]
  active?: boolean
  createdAt: string // date string
  updatedAt: string // date string
}

export type VoteEventResponse = Omit<VoteEvent, 'nation'> & {
  nation: Pick<Nation, 'id' | 'name'>
}

export const useVoteEvents = (props?: Partial<BaseQueryProps<VoteEvent>>) => {
  const query = useBaseQuery<VoteEvent, VoteEventResponse>({
    path: '/vote-events',
    queryKey: ['vote-events'],
    initialValues: {
      name: '',
    },
    ...props,
  })

  return query
}

export type VoteEventRecord = Omit<VoteEvent, 'nation'> & {
  nation: Nation
}

export const useVoteEvent = (id?: string) => {
  const base = useBaseRecord<VoteEventRecord>({
    id,
    path: '/vote-events',
    options: {
      onUpdate: (data, response) => {
        console.log('onUpdate', data, response)
      },
    },
  })

  return { ...base }
}
