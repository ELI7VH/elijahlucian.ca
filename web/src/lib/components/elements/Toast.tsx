import { ReactNode } from 'react'
import { Box } from '../layout/Box'

type Props = {
  children: ReactNode
}

// TODO: Toast Context
export const Toast = ({ children }: Props) => {
  return (
    <Box bg="cool-bg" padding="1rem 2rem">
      {children}
    </Box>
  )
}
