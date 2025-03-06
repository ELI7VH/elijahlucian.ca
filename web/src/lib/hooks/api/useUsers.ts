import { useBaseQuery } from './useBaseQuery'

export type UserConfig = {
  fontFamily: string
  fontSize: string
  fontWeight: string
  colorPrimary: string
  colorSecondary: string
}

export type User = {
  id: string
  name: string
  username: string
  email: string
  password: string
  cookie: string
  visits: number
  starred: string[]
  pinned: string[]
  metadata: Record<string, unknown>
  localConfig: UserConfig
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
