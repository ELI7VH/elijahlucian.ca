import { useState } from 'react'

export const useToast = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const toast = (message: string) => {
    setMessage(message)

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  return { isOpen, toast, message }
}
