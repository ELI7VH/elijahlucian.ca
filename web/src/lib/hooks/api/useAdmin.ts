import { useApiContext } from '@/lib/providers/ApiContext'
import { useMutation, useQuery } from '@tanstack/react-query'

type Admin = {
  s3: {
    bucket: string
  }
}

export const useAdmin = () => {
  const api = useApiContext()

  const query = useQuery({
    queryKey: ['admin', 'config'],
    queryFn: () => api.get<Admin>('/config'),
  })

  return query
}

type StaticObject = {
  id: string
  Key: string
  LastModified: string
  ETag: string
  Size: number
  StorageClass: string
  Owner: {
    DisplayName: string
    ID: string
  }
  record?: any
}

export const useStatic = (key?: string) => {
  const api = useApiContext()

  const query = useQuery({
    queryKey: ['admin', 'static', key],
    queryFn: () => api.get<StaticObject[]>(`/static${key ? `/${key}` : ''}`),
  })

  const deleteStaticObject = useMutation({
    mutationFn: (key: string) => api.destroy(`/static?key=${key}`),
    onSuccess: () => query.refetch(),
  })

  return { ...query, deleteStaticObject }
}
