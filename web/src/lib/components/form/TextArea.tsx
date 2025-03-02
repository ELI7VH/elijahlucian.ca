import { useEffect, useState } from 'react'

type Props = {
  value?: string | number | boolean | null | string[] | undefined | any
  placeholder?: string
  onChange?: (e: any) => void
  onBlur?: (value: string) => void
  onEnter?: (e: any) => void
  onSubmit?: (e: any) => void
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onBlur'>

export const TextArea = ({
  value,
  onChange,
  onBlur,
  onEnter,
  onSubmit,
  placeholder,
  ...props
}: Props) => {
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  return (
    <textarea
      style={{ fontSize: '0.7rem', padding: '0.5rem' }}
      rows={6}
      placeholder={placeholder}
      value={localValue}
      onChange={(e) => {
        setLocalValue(e.target.value)
        onChange?.(e)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (e.ctrlKey || e.metaKey) {
            onSubmit?.(e)
          } else {
            onEnter?.(e)
          }
        }
      }}
      onBlur={() => onBlur?.(localValue)}
      {...props}
    />
  )
}
