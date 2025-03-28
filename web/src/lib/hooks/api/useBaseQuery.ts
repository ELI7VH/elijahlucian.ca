import { useApiContext } from '@/lib/providers'
import { QueryKey, useQuery } from '@tanstack/react-query'
import { useQueryFns } from '../useQuery'
import { keyBy, filter } from 'lodash'
import { useDisclosure } from '../useDisclosure'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export type BaseQueryProps<T> = {
  path: string
  queryKey: QueryKey
  initialValues?: Partial<T>
  values?: Partial<T>
  params?: Partial<T>
  filterBy?: keyof T
  noDefaultData?: boolean
  onCreate?: (data: T) => void
  onUpdate?: (data: T) => void
}

export const useBaseQuery = <
  T extends { id: string },
  R extends { id: string } = T,
>({
  path,
  queryKey,
  params,
  filterBy,
  noDefaultData,
  onCreate,
}: BaseQueryProps<T>) => {
  const api = useApiContext()
  const form = useForm<T>()
  const createDialog = useDisclosure()
  const editing = useDisclosure()
  const [search, setSearch] = useState<string>('')

  const fns = useQueryFns<T>({
    path,
    queryKey,
  })

  const query = useQuery({
    queryKey: fns.queryKey,
    queryFn: () => api.get<R[]>(fns.path, params),
  })

  const create = async (data?: Partial<T>) =>
    await fns.create.mutateAsync({ ...form.getValues(), ...data })

  const handleFormCreate = form.handleSubmit(async (values) => {
    const record = await create(values)
    onCreate?.(record)
    form.reset()
  })

  const index = keyBy(query.data, 'id')

  const data = query.data?.map((record) => ({
    ...record,
    update: (data: Partial<T>) =>
      fns.update.mutateAsync({ id: record.id, ...data }),
    destroy: () => fns.destroy.mutateAsync(record.id),
  }))

  const filtered =
    search && filterBy
      ? filter(query.data, (r) => {
          // @ts-expect-error typescript voodoo
          return (r[filterBy] as string)
            .toLowerCase()
            .includes(search.toLowerCase())
        })
      : noDefaultData
      ? undefined
      : query.data

  return {
    ...query,
    ...fns,
    form,
    createDialog,
    index,
    handleFormCreate,
    data,
    filtered,
    editing,
    search,
    setSearch,
  }
}
