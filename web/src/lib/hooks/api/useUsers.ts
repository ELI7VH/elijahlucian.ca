import { useBaseQuery } from './useBaseQuery'

export type User = {
  id: string
  name: string
  username: string
  email: string
  password: string
  cookie: string
  visits: number
  selected_nation: string

  createdAt: string
  updatedAt: string
}

export function useUsers() {
  const query = useBaseQuery<User>({
    path: '/users',
    queryKey: ['users'],
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  return query
}
