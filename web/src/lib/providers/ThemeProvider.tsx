import '../theme/index.css'

type Props = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
  // todo load user
  // customize theme

  return <>{children}</>
}
