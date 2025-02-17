import { useEffect, useState } from 'react'

type Props = {
  value?: string
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
}

export const TextArea = ({ value, onChange, onBlur }: Props) => {
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  return (
    <textarea
      style={{ fontSize: '0.7rem' }}
      rows={4}
      value={localValue}
      onChange={(e) => {
        setLocalValue(e.target.value)
        onChange?.(e.target.value)
      }}
      onBlur={() => onBlur?.(localValue)}
    />
  )
}
