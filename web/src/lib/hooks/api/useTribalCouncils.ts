import { Nation } from '../..'
import { useBaseQuery } from './useBaseQuery'
import { useBaseRecord } from './useBaseRecord'

export type TribalCouncil = {
  id: string
  name: string
  address: string
  municipality: string
  postal_code: string
  website: string
  code: string
  tc_number: string
  govt_url: string
  govt_link_params: string
}

export const useTribalCouncils = () => {
  return useBaseQuery<TribalCouncil>({
    queryKey: ['tribal-councils'],
    path: '/tribal-councils',
    initialValues: {
      name: '',
      address: '',
      municipality: '',
      postal_code: '',
      website: '',
      code: '',
      tc_number: '',
      govt_url: '',
    },
    filterBy: 'name',
  })
}

type TribalCouncilRecord = TribalCouncil & {
  nations?: Nation[]
}

export const useTribalCouncil = (id?: string) => {
  return useBaseRecord<TribalCouncilRecord>({
    id,
    path: '/tribal-councils',
  })
}
