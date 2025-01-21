import { useBaseQuery } from './useBaseQuery'

export type PoliticalOrganization = {
  id: string
  name: string
  address: string
  municipality: string
  postal_code: string
  website: string
  code: string
  fnpo_number: string
}

export const usePoliticalOrganizations = () => {
  return useBaseQuery<PoliticalOrganization>({
    queryKey: ['political-organizations'],
    path: '/political-organizations',
    initialValues: {
      name: '',
      address: '',
      municipality: '',
      postal_code: '',
      website: '',
      code: '',
    },
  })
}
