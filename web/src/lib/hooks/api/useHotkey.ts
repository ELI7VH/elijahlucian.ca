import { useEffect } from 'react'

export const useHotkey = (
  keycheck: (e: KeyboardEvent) => boolean,
  callback: () => void,
  deps: any[] = [],
) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (keycheck(e)) {
        e.preventDefault()
        e.stopPropagation()
        console.info(
          'ACCESSIBILITY: your browser will ignore this hotkey:',
          keycheck,
        )
        callback()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, deps)
}
