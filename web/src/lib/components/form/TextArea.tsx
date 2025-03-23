import { forwardRef, ForwardedRef } from 'react'

type Props = {
  value?: string | number | boolean | null | string[] | undefined
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onSubmit?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onBlur'>

export const TextArea = forwardRef(function TextArea(
  {
    value,
    onChange,
    onBlur,
    onEnter,
    onSubmit,
    placeholder,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <textarea
      ref={ref}
      style={{ fontSize: '0.7rem', padding: '0.5rem' }}
      rows={6}
      placeholder={placeholder}
      value={value?.toString() ?? ''}
      onChange={(e) => {
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
      onBlur={onBlur}
      {...props}
    />
  )
})
