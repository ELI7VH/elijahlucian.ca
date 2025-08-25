import { useSearchParams as useRRSearchParams } from 'react-router-dom'

// todo: useLocalSearchParams

export const useSearchParams = () => {
  const [searchParams, setSearchParams] = useRRSearchParams()

  const get = (key: string) => {
    const value = searchParams.get(key)
    return value ? value : undefined
  }

  const set = (key: string, value?: string) => {
    setSearchParams((prev) => {
      prev.set(key, value || '')
      return prev
    })
  }

  const rm = (key: string) => {
    setSearchParams((prev) => {
      prev.delete(key)
      return prev
    })
  }

  return { get, set, rm }
}
