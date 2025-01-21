import { InputHTMLAttributes } from 'react'

type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  value?: string | number | boolean | null | string[] | undefined | any
}

export const Select = ({ children, ...props }: SelectProps) => {
  const { value } = props

  if (!value) console.log('select has no value', value)

  return (
    <select
      value={value || ''}
      style={{
        width: '100%',
        padding: '0.5rem',
        border: '1px solid var(--brand-1)',
      }}
      {...props}
    >
      {children}
    </select>
  )
}
