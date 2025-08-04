import { useEffect } from 'react'

type Props = {
  mappings: [
    keycheck: (e: KeyboardEvent) => boolean,
    callback: (e: KeyboardEvent) => void,
  ][]
  deps: any[]
  // focusElement?: HTMLElement
}

/**
 * Multiple hotkeys can be mapped to the same callback.
 */
export const useHotkeyMap = ({ mappings, deps }: Props) => {
  //
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // if (focusElement && !focusElement.contains(document.activeElement)) return

      const mapping = mappings.find(([keycheck]) => keycheck(e))
      if (!mapping) return

      e.preventDefault()
      e.stopPropagation()
      console.info(
        'ACCESSIBILITY: your browser will ignore this hotkey:',
        mapping[0],
      )
      mapping[1](e)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, deps)

  return {}
}
