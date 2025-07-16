import { useApiContext } from '@/lib/providers/ApiContext'
import { useMutation, useQuery } from '@tanstack/react-query'

type Upload = {
  id: string
  name: string
  link: string
  filename: string
  metadata: {
    signedUrl: string
    bucket: string
    key: string
  }
}

type CreateUpload = {
  name: string
  filename: string
  mime: string
}

export const useUploads = () => {
  const api = useApiContext()

  const query = useQuery({
    queryKey: ['uploads'],
    queryFn: () => api.get<Upload[]>('/uploads'),
    // enabled: false,
  })

  const put = (path: string, file: File) => {
    return api.put(path, file, {
      headers: {
        'Cache-Control': 'public,max-age=31536000,immutable',
        'x-amz-acl': 'public-read',
      },
    })
  }

  const create = useMutation({
    mutationFn: (data: CreateUpload) => api.post<Upload>('/uploads', data),
    onSuccess: () => query.refetch(),
  })

  return { ...query, create, put }
}

export const useUpload = (id: string) => {
  const api = useApiContext()

  const query = useQuery({
    queryKey: ['uplaods', id],
    queryFn: () => api.get<Upload>('/uploads'),
  })

  return { query }
}
