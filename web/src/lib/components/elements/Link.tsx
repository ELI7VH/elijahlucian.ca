import { Link as RouterLink, LinkProps } from 'react-router-dom'

export const Link = ({ children, style, ...props }: LinkProps) => {
  return (
    <RouterLink 
      style={{ 
        fontFamily: 'var(--font-mono)', 
        ...style 
      }} 
      {...props}
    >
      {children}
    </RouterLink>
  )
}
