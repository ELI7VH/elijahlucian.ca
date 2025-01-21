import { Link as RouterLink, LinkProps } from 'react-router-dom'

export const Link = ({ children, ...props }: LinkProps) => {
  return <RouterLink {...props}>{children}</RouterLink>
}
