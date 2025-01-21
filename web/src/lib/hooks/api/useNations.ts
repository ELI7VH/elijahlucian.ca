import { BaseQueryProps, useBaseQuery } from './useBaseQuery'
import { useBaseRecord } from './useBaseRecord'
import { Reserve } from './useReserves'
import { TribalCouncil } from './useTribalCouncils'

export type Nation = {
  id: string
  name: string
  code: string
  website: string
  address: string
  postal_code: string
  phone: string
  email: string
  reserves: string[]
  band_number: string
  tribal_council: string
  govt_url: string
  govt_link_params: string
}

export const useNations = (options?: Partial<BaseQueryProps<Nation>>) => {
  return useBaseQuery<Nation>({
    queryKey: ['nations', options?.params],
    path: '/nations',
    initialValues: {
      name: '',
      code: '',
      website: '',
      phone: '',
      email: '',
      band_number: '',
    },
    filterBy: 'name',
    ...options,
  })
}

type NationRecord = Omit<Nation, 'reserves' | 'tribal_council'> & {
  tribal_council?: TribalCouncil
  reserves?: Reserve[]
}

export const useNation = (id?: string) => {
  return useBaseRecord<Nation, NationRecord>({
    id,
    path: '/nations',
    options: {
      onUpdate: (data, response) => {
        console.log('nation updated', data, response)
      },
      onDestroy: (id) => {
        console.log('nation destroyed', id)
      },
    },
  })
}
