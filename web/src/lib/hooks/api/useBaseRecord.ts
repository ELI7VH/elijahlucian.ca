import { useQuery } from '@tanstack/react-query'
import { useApiContext, useForm, useQueryFns, useToast } from '../..'

type BaseRecordProps<T, R> = {
  id?: string
  path: string
  baseQueryKey?: string[]
  options?: {
    onUpdate?: (payload: Partial<R>, response: Partial<T>) => void
    onDestroy?: (id?: string) => void
  }
}

// todo name these types better
export function useBaseRecord<
  T extends { id: string },
  R extends { id: string } = T,
>(props: BaseRecordProps<T, R>) {
  const api = useApiContext()

  const fns = useQueryFns<T, Partial<T>, R>({
    queryKey: [props.path, props.id],
    path: props.path,
  })

  const query = useQuery({
    queryKey: [props.path, props.id],
    queryFn: () => api.get<R>(`${props.path}/${props.id}`),
    enabled: !!props.id,
  })

  const form = useForm<T>({
    // @ts-expect-error - todo: idk..
    values: query.data,
  })

  const update = (data: Partial<T>) =>
    props.id
      ? fns.update.mutate(
          { ...data, id: props.id },
          {
            onSuccess: (response) => {
              props.options?.onUpdate?.(response, data)
              api.client.invalidateQueries({ queryKey: props.baseQueryKey })
            },
          },
        )
      : Promise.reject(`update: No id: ${props.path}`)

  const destroy = () =>
    props.id
      ? fns.destroy.mutate(props.id, {
          onSuccess: () => {
            props.options?.onDestroy?.(props.id)
            api.client.invalidateQueries({ queryKey: props.baseQueryKey })
          },
        })
      : Promise.reject(`destroy: No id: ${props.path}`)

  const handleFormUpdate = form.handleSubmit(() => {
    update(form.updatedValues)
    form.reset()
  })

  return { ...query, form, update, destroy, handleFormUpdate }
}
