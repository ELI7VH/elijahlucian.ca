import { InlineDivStyle } from '@/lib/types'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'text' | 'contained'
  sx?: InlineDivStyle
  size?: 'small'
}

export const Button = ({
  size,
  variant = 'contained',
  sx,
  ...props
}: Props) => {
  return (
    <button
      style={{
        backgroundColor:
          variant === 'contained' ? 'var(--brand-1)' : 'transparent',
        color: variant === 'contained' ? 'white' : 'var(--brand-1)',
        border: variant === 'contained' ? 'none' : '1px solid var(--brand-1)',
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
