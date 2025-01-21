import { BaseQueryProps, useBaseQuery } from './useBaseQuery'

export type Reserve = {
  id: string
  name: string
  reserve_number: string
  registered_name: string
  hectares: string
  location: string
  map_url: string
  govt_url: string
  govt_link_params: string
}

export const useReserves = (options?: Partial<BaseQueryProps<Reserve>>) => {
  return useBaseQuery<Reserve>({
    queryKey: ['reserves'],
    path: '/reserves',
    initialValues: {
      name: '',
      reserve_number: '',
      registered_name: '',
      hectares: '',
      map_url: '',
      location: '',
    },
    ...options,
  })
}
