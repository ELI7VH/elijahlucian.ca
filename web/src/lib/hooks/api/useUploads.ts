import { useApiContext } from '@/lib/providers/ApiContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import Axios, { AxiosProgressEvent } from 'axios'

type Upload = {
  id: string
  name: string
  link: string
  filename: string
  status: string
  metadata: {
    signedUrl: string
    bucket: string
    key: string
    size: number
    mime: string
  }
  createdAt: string
  updatedAt: string
}

type CreateUpload = {
  name: string
  filename: string
  mime: string
  size: number
}

type UseUploadsParams = {
  abortController?: AbortSignal
  onUploadProgress?: (progress: AxiosProgressEvent) => void
}

export const useUploads = (params?: UseUploadsParams) => {
  const api = useApiContext()
  const s3Axios = Axios.create()

  const query = useQuery({
    queryKey: ['uploads'],
    queryFn: () => api.get<Upload[]>('/uploads'),
    // enabled: false,
  })

  const put = (path: string, file: File) => {
    return s3Axios.put(path, file, {
      signal: params?.abortController,
      onUploadProgress: (progress) => {
        params?.onUploadProgress?.(progress)
      },
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

  const update = useMutation({
    mutationFn: (data: Partial<Upload>) =>
      api.patch<Upload>(`/uploads/${data.id}`, data),
    onSuccess: () => query.refetch(),
  })

  const destroy = useMutation({
    mutationFn: (id: string) => api.destroy(`/uploads/${id}`),
    onSuccess: () => query.refetch(),
  })

  const data = query.data?.map((record) => ({
    ...record,
    update: (data: Partial<Upload>) =>
      update.mutateAsync({ id: record.id, ...data }),
    destroy: () => destroy.mutateAsync(record.id),
  }))

  return { ...query, create, put, destroy, update, data }
}

export const useUpload = (id: string) => {
  const api = useApiContext()

  const query = useQuery({
    queryKey: ['uplaods', id],
    queryFn: () => api.get<Upload>('/uploads'),
  })

  return { query }
}
