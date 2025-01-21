import { Button } from './Button'

type EditButtonProps = {
  onClick: () => void
  editing: boolean
}

export const EditButton = ({ onClick, editing }: EditButtonProps) => {
  return <Button onClick={onClick}>{editing ? 'Cancel' : 'Edit'}</Button>
}
