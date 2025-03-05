import { BrowserRouter } from 'react-router-dom'
import { ApiContextProvider } from './ApiContext'
import { UserContextProvider } from './UserContext'
import { ToastProvider } from './ToastProvider'

export function RootProvider({ children }: { children: React.ReactNode }) {
  const baseURL = import.meta.env.VITE_API_URL

  return (
    <BrowserRouter>
      <ApiContextProvider baseURL={baseURL}>
        <ToastProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </ToastProvider>
      </ApiContextProvider>
    </BrowserRouter>
  )
}
