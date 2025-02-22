import { useEffect } from 'react'

import { useState } from 'react'

export const useLocalState = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(initialValue)

  useEffect(() => {
    const value = localStorage.getItem(key)
    console.log('useLocalState', key, value)
    if (value) {
      setState(JSON.parse(value))
    }
  }, [key])

  const set = (value: T) => {
    console.log('useLocalState', key, value)

    localStorage.setItem(key, JSON.stringify(value ?? initialValue))
    setState(value)
  }

  const rm = () => {
    console.log('useLocalState', key, 'rm')
    localStorage.removeItem(key)
    setState(initialValue)
  }

  const toggle = () => {
    const v = Boolean(state)

    set(!v as T)
  }

  return { state, set, rm, toggle }
}
