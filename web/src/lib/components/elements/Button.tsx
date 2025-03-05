import { InlineDivStyle } from '@/lib/types'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'text' | 'contained' | 'reset' | 'ghost' | 'highlighted'
  sx?: InlineDivStyle
  size?: 'small'
  only?: string[] // only certain roles can do the button thing
}

export const Button = ({
  size,
  variant = 'contained',
  sx,
  ...props
}: Props) => {
  const bgcs: Record<string, string> = {
    contained: 'var(--brand-1)',
    highlighted: 'var(--brand-1)',
    reset: 'var(--gray-3)',
    ghost: 'transparent',
    text: 'transparent',
  }

  const fgcs: Record<string, string> = {
    contained: 'white',
    highlighted: 'var(--gray-3)',
    reset: 'var(--gray-2)',
    ghost: 'var(--gray-3)',
    text: 'var(--gray-2)',
  }

  const borders: Record<string, string> = {
    contained: 'none',
    highlighted: '1px solid var(--gray-3)',
    reset: `1px solid ${fgcs[variant]}`,
    ghost: `1px solid ${fgcs[variant]}`,
    text: 'none',
  }

  const backgroundColor = bgcs[variant]
  const foreground = fgcs[variant] || 'white'
  const border = borders[variant]

  return (
    <button
      style={{
        backgroundColor,
        color: foreground,
        border,
        userSelect: 'none',
        padding: size === 'small' ? '0.25rem 0.5rem' : '0.5rem 1rem',
        fontSize: size === 'small' ? '0.5rem' : '1rem',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        pointerEvents: 'all',
        ...sx,
      }}
      {...props}
    />
  )
}
