import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { createContext, ReactNode, useContext } from 'react'

type ApiContextType = {
  get<T>(url: string, params?: unknown): Promise<T>
  post<T, R = T>(url: string, body?: Partial<R>): Promise<T>
  patch<T, R = T>(url: string, body: Partial<T>): Promise<R>
  destroy<T>(url: string): Promise<T>
  client: QueryClient
  axios: AxiosInstance
  setCookie: (cookie: string | null) => void
}

export const ApiContext = createContext<ApiContextType | null>(null)

type Props = {
  children: ReactNode
  baseURL?: string
}

export const ApiContextProvider = ({ children, baseURL = '/api' }: Props) => {
  const axios = Axios.create({ baseURL })

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 0 } },
  })

  axios.interceptors.request.use((config) => {
    const cookie = localStorage.getItem('cookie')

    if (cookie) {
      config.headers.Authorization = `${cookie}`
    }
    return config
  })

  const setCookie = (cookie: string | null) => {
    if (!cookie) {
      localStorage.removeItem('cookie')
    } else {
      localStorage.setItem('cookie', cookie)
    }
  }

  async function get<T>(
    path: string,
    params?: AxiosRequestConfig['params'],
  ): Promise<T> {
    const res = await axios.get<T>(path, { params })
    return res.data
  }
  async function patch<T, R = T>(path: string, body?: Partial<T>) {
    const res = await axios.patch<T, AxiosResponse<R>>(path, body)
    return res.data
  }

  async function post<T, R = T>(
    path: string,
    body?: Partial<T>,
    config?: AxiosRequestConfig,
  ) {
    const res = await axios.post<T, AxiosResponse<R>>(path, body || {}, config)
    return res.data
  }

  async function destroy(path: string, data?: unknown) {
    const res = await axios.delete(path, { data })
    return res.data
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider
        value={{
          get,
          patch,
          post,
          destroy,
          axios,
          setCookie,
          client: queryClient,
        }}
      >
        {children}
      </ApiContext.Provider>
    </QueryClientProvider>
  )
}

export const useApiContext = () => {
  const api = useContext(ApiContext)
  if (!api) {
    throw new Error('useApi must be used within a ApiContextProvider')
  }
  return api
}
