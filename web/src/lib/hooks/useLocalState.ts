import { useEffect } from 'react'

import { useState } from 'react'

export const useLocalState = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(initialValue)

  useEffect(() => {
    console.log('useLocalState', key)
    const value = localStorage.getItem(key)
    if (value) {
      setState(JSON.parse(value))
    }
  }, [key])

  const set = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
    setState(value)
  }

  const rm = () => {
    localStorage.removeItem(key)
    setState(initialValue)
  }

  const toggle = () => {
    const v = Boolean(state)

    set(!v as T)
  }

  return { state, set, rm, toggle }
}
