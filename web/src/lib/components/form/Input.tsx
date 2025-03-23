import { forwardRef, ForwardedRef } from 'react'
import { Box } from '../layout/Box'
import { H6 } from '../typography/H6'

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> & {
  value?: string | number | boolean | null | string[] | undefined
  gridColumn?: string
  label?: string
  onEnter?: (value: string) => void
}

// 📌

export const Input = forwardRef(function Input(
  { gridColumn, label, onEnter, ...props }: InputProps, 
  ref: ForwardedRef<HTMLInputElement>
) {
  // todo: put placeholder in label if has value

  const title = [label || props.placeholder || props.name, props.value]
    .filter(Boolean)
    .join(': ')

  return (
    <Box bg="background-image-2">
      {label && <H6 padding="0.5rem 0.5rem 0.25rem">{label}</H6>}
      <input
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter?.(e.currentTarget.value)
          }
        }}
        {...props}
        value={props.value?.toString() ?? ''}
        style={{
          border: '1px solid var(--brand-1)',
          // borderRadius: '0.2rem',
          padding: '0.5rem',
          width: '100%',
          ...props.style,
          gridColumn,
        }}
        placeholder={props.placeholder || label || props.name}
        title={title}
      />
    </Box>
  )
})
