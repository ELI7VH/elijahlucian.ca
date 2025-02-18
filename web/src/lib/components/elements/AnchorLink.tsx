import { ReactNode } from 'react'

type Props = {
  id: string
  children: ReactNode
}

export const AnchorLink = ({ id, children }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <a
      style={{ cursor: 'pointer', color: 'var(--brand-3)' }}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
