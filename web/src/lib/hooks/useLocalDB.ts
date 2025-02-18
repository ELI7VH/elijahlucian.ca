import { useEffect, useState } from 'react'

export function useLocalDB<T extends Record<string, unknown>>(
  dbName: string,
  initialValue?: T,
) {
  const [value, setValue] = useState(initialValue || ({} as T))

  useEffect(() => {
    const storedValue = localStorage.getItem(dbName)
    if (storedValue) setValue(JSON.parse(storedValue))
  }, [])

  const set = (key: keyof T, value: T[keyof T]) => {
    const db = JSON.parse(localStorage.getItem(dbName) || '{}')
    const newDb = { ...db, [key]: value }
    localStorage.setItem(dbName, JSON.stringify(newDb))
    setValue(newDb)
  }

  const get = (key: keyof T) => {
    return JSON.parse(localStorage.getItem(dbName) || '{}')[key]
  }

  return {
    value,
    set,
    get,
  }
}
