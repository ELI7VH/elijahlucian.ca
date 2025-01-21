import { InputHTMLAttributes } from 'react'

type OptionProps = InputHTMLAttributes<HTMLOptionElement>

export const Option = ({ children, ...props }: OptionProps) => {
  return <option {...props}>{children}</option>
}
