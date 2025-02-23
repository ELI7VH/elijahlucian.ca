import { InlineDivStyle } from '@/lib/types'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'text' | 'contained' | 'reset'
  sx?: InlineDivStyle
  size?: 'small'
}

export const Button = ({
  size,
  variant = 'contained',
  sx,
  ...props
}: Props) => {
  const backgroundColor =
    variant === 'contained'
      ? 'var(--brand-1)'
      : variant === 'reset'
      ? 'var(--gray-3)'
      : 'transparent'

  const foreground =
    variant === 'contained'
      ? 'white'
      : variant === 'reset'
      ? 'var(--gray-1)'
      : 'var(--brand-1)'

  return (
    <button
      style={{
        backgroundColor,
        color: foreground,
        border:
          variant === 'contained'
            ? 'none'
            : variant === 'reset'
            ? `1px solid ${foreground}`
            : `1px solid ${foreground}`,
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
