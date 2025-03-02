import { useBaseQuery } from './useBaseQuery'

type Resource = {
  id: string
  name: string
  path: string
  dbType: string
  dbScope: string
  createdAt: string
}

export const useResources = () => {
  return useBaseQuery<Resource>({
    path: '/resources',
    queryKey: ['resources'],
    initialValues: {
      name: '',
      path: '',
      dbType: '',
      dbScope: '',
    },
  })
}
