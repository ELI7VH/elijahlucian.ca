import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext } from 'react'
import { User, UserConfig } from '../hooks/api/useUsers'
import { useApiContext } from './ApiContext'
import { useForm } from '../hooks/useForm'
import { useToast } from '../hooks/useToast'
import { useLocalDB } from '../hooks/useLocalDB'

type UserContextType = {
  user: User | null
  login: (values: LoginValues) => Promise<unknown>
  logout: () => Promise<void>
  loginForm: ReturnType<typeof useForm<LoginValues>>
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void
  query: ReturnType<typeof useQuery<User>>
  update: (values: Partial<User>) => Promise<void>
  localConfig: ReturnType<typeof useLocalDB<UserConfig>>
}

type LoginValues = {
  username: string
  password: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | null>(null)

export function UserContextProvider({ children }: { children: ReactNode }) {
  const api = useApiContext()
  const { toast } = useToast()

  const loginForm = useForm<LoginValues>({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const query = useQuery<User>({
    queryKey: ['me', api.axios.defaults.headers.Authorization],
    queryFn: () => api.get<User>('/auth/me'),
  })

  const update = async (values: Partial<User>) => {
    await api.patch('/auth/me', values)
    toast('Profile updated successfully', 'success')
    query.refetch()
  }

  const login = async (values: LoginValues) => {
    try {
      const user = await api.post<User>('/auth/login', values)

      if (!user.cookie) {
        throw new Error('No cookie returned from login')
      }

      api.setCookie(user.cookie)
      toast(`Welcome back, ${user.username || 'user'}!`, 'success')
      query.refetch()
    } catch {
      toast('Invalid username or password', 'error')
      throw new Error('Invalid username or password')
    }
  }

  const logout = async () => {
    await api.post('/auth/logout')
    api.setCookie(null)
    toast('Logged out successfully', 'info')
    query.refetch()
  }

  const handleLogin = loginForm.handleSubmit(async (values) => {
    await login(values)
    loginForm.reset()
  })

  const localConfig = useLocalDB<UserConfig>('user-config', {
    fontFamily: '',
    fontSize: '',
    fontWeight: '',
    colorPrimary: '',
    colorSecondary: '',
  })

  return (
    <UserContext.Provider
      value={{
        user: query.data || null,
        query,
        localConfig,
        login,
        logout,
        update,
        loginForm,
        handleLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context
}
