import { useEffect } from 'react'

type Props = {
  keycheck: (e: KeyboardEvent) => boolean
  callback: () => void
  deps: any[]
  onEscape?: () => void
}

/**
 * A single hotkey can be mapped to a single callback.
 */
export const useHotkey = ({ keycheck, callback, deps, onEscape }: Props) => {
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
      } else if (e.key === 'Escape') {
        onEscape?.()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, deps)

  return {}
}
