import { ReactNode, createContext, useContext, useState } from 'react'
import { Box } from '../components/layout/Box'
import { FlexCol } from '../components/layout/Flex'

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export type Toast = {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  toasts: Toast[]
  toast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
      <FlexCol
        position="fixed"
        bottom="1rem"
        right="1rem"
        gap="0.5rem"
        zIndex="999"
      >
        {toasts.map(toast => {
          // Get color based on toast type
          const getColor = () => {
            switch (toast.type) {
              case 'success':
                return { bg: '#111', border: '1px solid #4caf50', indicator: '#4caf50' }
              case 'warning':
                return { bg: '#111', border: '1px solid #ff9800', indicator: '#ff9800' }
              case 'error':
                return { bg: '#111', border: '1px solid #f44336', indicator: '#f44336' }
              default:
                return { bg: '#111', border: '1px solid var(--gray-6)', indicator: 'var(--gray-6)' }
            }
          }
          
          const colors = getColor()
          
          return (
            <Box
              key={toast.id}
              backgroundColor={colors.bg}
              borderRadius="1rem"
              border={colors.border}
              overflow="hidden"
              color="var(--gray-0)"
              transition="all 0.3s ease-out"
              onClick={() => removeToast(toast.id)}
              cursor="pointer"
              position="relative"
            >
              <Box 
                position="absolute" 
                left="0" 
                top="0" 
                bottom="0" 
                width="4px" 
                backgroundColor={colors.indicator} 
              />
              <Box bg="background-image-tex" padding="1rem 2rem" paddingLeft="1.5rem">
                {toast.message}
              </Box>
            </Box>
          )
        })}
      </FlexCol>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}