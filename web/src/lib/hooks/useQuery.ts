import { QueryKey, useMutation } from '@tanstack/react-query'

import { useApiContext } from '../providers/ApiContext'
type QueryFnsProps = {
  id?: string | null // idk if we need
  queryKey: QueryKey
  path: string
}

export function useQueryFns<
  T extends { id: string },
  Create = T,
  Update extends { id: string } = T,
>(props: QueryFnsProps) {
  const api = useApiContext()

  const onSuccess = () => {
    api.client.invalidateQueries({
      queryKey: props.queryKey,
    })
  }

  const onError = (error: Error) => {
    console.error(error)
  }

  const create = useMutation({
    mutationFn: (data: Partial<Create>) =>
      api.post<T, Create>(props.path, data),
    onSuccess,
    onError,
  })

  const update = useMutation({
    mutationFn: (data: Partial<T>) =>
      api.patch<T, Update>(`${props.path}/${data.id}`, data),
    onSuccess,
    onError,
  })

  const destroy = useMutation({
    mutationFn: (id: string) => api.destroy(`${props.path}/${id}`),
    onSuccess,
    onError,
  })

  return {
    create,
    update,
    destroy,
    onSuccess,
    onError,
    queryKey: props.queryKey,
    path: props.path,
  }
}
