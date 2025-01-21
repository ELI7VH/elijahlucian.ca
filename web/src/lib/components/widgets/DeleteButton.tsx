import { ReactNode } from 'react'
import { Button } from '../elements/Button'

type Props = {
  onConfirm: () => void
  children: ReactNode
}

export const ConfirmButton = ({ onConfirm, children }: Props) => {
  const handleClick = () => {
    const confirm = window.confirm('Are you sure you want to delete this item?')
    if (!confirm) return

    onConfirm()
  }

  return <Button onClick={handleClick}>{children}</Button>
}
