import { useMutation, useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useState } from 'react'
import { User } from '../hooks/api/useUsers'
import { useApiContext } from './ApiContext'
import { useForm } from '../hooks/useForm'

type UserContextType = {
  user: User | null
  login: (values: LoginValues) => Promise<unknown>
  logout: () => Promise<void>
  loginForm: ReturnType<typeof useForm<LoginValues>>
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void
  query: ReturnType<typeof useQuery<User>>
  update: (values: Partial<User>) => Promise<void>
}

type LoginValues = {
  username: string
  password: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | null>(null)

export function UserContextProvider({ children }: { children: ReactNode }) {
  const api = useApiContext()

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
    query.refetch()
  }

  const login = async (values: LoginValues) => {
    try {
      const user = await api.post<User>('/auth/login', values)

      if (!user.cookie) {
        throw new Error('No cookie returned from login')
      }

      api.setCookie(user.cookie)
      query.refetch()
    } catch (error) {
      throw new Error('Invalid username or password')
    }
  }

  const logout = async () => {
    await api.post('/auth/logout')
    api.setCookie(null)
    query.refetch()
  }

  const handleLogin = loginForm.handleSubmit(async (values) => {
    await login(values)
    loginForm.reset()
  })

  return (
    <UserContext.Provider
      value={{
        user: query.data || null,
        query,
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
