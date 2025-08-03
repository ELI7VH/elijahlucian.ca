import { useApiContext } from '@/lib/providers/ApiContext'
import { useQuery } from '@tanstack/react-query'

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

export const useStatic = (key?: string) => {
  const api = useApiContext()

  const query = useQuery({
    queryKey: ['admin', 'static', key],
    queryFn: () => api.get<Admin>(`/static${key ? `/${key}` : ''}`),
  })

  return query
}
