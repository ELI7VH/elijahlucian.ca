import { InputHTMLAttributes } from 'react'

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'onChange'
> & {
  checked?: boolean
  onChange: (checked: boolean) => void
}

export const Checkbox = ({ checked = false, onChange, ...props }: Props) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      {...props}
    />
  )
}
