import { Button } from './Button'
import { useHotkey } from '@/lib/hooks/api/useHotkey'
import { useState } from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'text' | 'contained' | 'reset' | 'ghost' | 'highlighted'
  sx?: any
  size?: 'small'
  only?: string[]
  hotkey: (e: KeyboardEvent) => boolean
  onClick?: () => void
  hotkeyLabel?: string
  animateOnHotkey?: boolean
}

export const HotkeyButton = ({
  hotkey,
  hotkeyLabel,
  animateOnHotkey = true,
  onClick,
  ...buttonProps
}: Props) => {
  const [isHotkeyPressed, setIsHotkeyPressed] = useState(false)

  // Handle hotkey press
  useHotkey({
    keycheck: hotkey,
    callback: () => {
      if (animateOnHotkey) {
        setIsHotkeyPressed(true)
        setTimeout(() => setIsHotkeyPressed(false), 150)
      }
      onClick?.()
    },
    deps: [onClick, animateOnHotkey],
  })

  // Handle click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
  }

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
      title={buttonProps.title || hotkeyLabel}
      sx={{
        ...buttonProps.sx,
        transform: isHotkeyPressed ? 'scale(0.95)' : 'scale(1)',
        backgroundColor: isHotkeyPressed ? 'white' : 'transparent',
        transition: 'all 0.15s ease-out',
      }}
    />
  )
}
