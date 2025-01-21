import { H3 } from '../typography/H3'

type ErrorChipProps = {
  children?: React.ReactNode
}

export const ErrorChip = ({ children }: ErrorChipProps) => {
  return (
    <div>
      <H3>error</H3>
      <div>{children}</div>
    </div>
  )
}
