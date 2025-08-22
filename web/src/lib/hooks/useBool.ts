import { useCallback, useState } from 'react'

export const useBool = (initialState = false) => {
  const [state, setState] = useState(initialState)

  const tt = useCallback(() => setState(true), [])
  const ff = useCallback(() => setState(false), [])
  const flip = useCallback(() => setState((prev) => !prev), [])

  return { state, tt, ff, flip }
}
