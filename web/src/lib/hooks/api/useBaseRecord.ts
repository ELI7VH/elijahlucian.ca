import { useQuery } from '@tanstack/react-query'
import { useApiContext, useQueryFns } from '../..'
import { useForm, DefaultValues } from 'react-hook-form'

type BaseRecordProps = {
  id?: string
  path: string
  baseQueryKey?: string[]
}

// todo name these types better
export function useBaseRecord<
  T extends { id: string },
  R extends { id: string } = T,
>(props: BaseRecordProps) {
  const api = useApiContext()

  const fns = useQueryFns<T, Partial<T>>({
    queryKey: [props.path, props.id],
    path: props.path,
  })

  const query = useQuery({
    queryKey: [props.path, props.id],
    queryFn: () => api.get<R>(`${props.path}/${props.id}`),
    enabled: !!props.id,
  })

  const form = useForm<T>({
    defaultValues: (query.data ? { ...query.data } : {}) as DefaultValues<T>,
  })

  const update = (data: Partial<T>) =>
    props.id
      ? fns.update.mutate({ ...data, id: props.id } as unknown as Partial<T>, {
          onSuccess: () => {
            api.client.invalidateQueries({ queryKey: props.baseQueryKey })
          },
        })
      : Promise.reject(`update: No id: ${props.path}`)

  const destroy = () =>
    props.id
      ? fns.destroy.mutate(props.id, {
          onSuccess: () => {
            api.client.invalidateQueries({ queryKey: props.baseQueryKey })
          },
        })
      : Promise.reject(`destroy: No id: ${props.path}`)

  return { ...query, form, update, destroy }
}
