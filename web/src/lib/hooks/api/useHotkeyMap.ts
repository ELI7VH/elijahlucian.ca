import { useEffect } from 'react'

type Props = {
  mappings: {
    keycheck: (e: KeyboardEvent) => boolean
    callback: (e: KeyboardEvent) => void
  }[]
  deps: any[]
}

/**
 * Multiple hotkeys can be mapped to the same callback.
 */
export const useHotkeyMap = ({ mappings, deps }: Props) => {
  //
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const mapping = mappings.find((mapping) => mapping.keycheck(e))
      if (!mapping) return

      e.preventDefault()
      e.stopPropagation()
      console.info(
        'ACCESSIBILITY: your browser will ignore this hotkey:',
        mapping.keycheck,
      )
      mapping.callback(e)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, deps)

  return {}
}
