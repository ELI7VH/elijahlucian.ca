import { HTMLAttributes, PropsWithChildren } from 'react'

export type PreProps = PropsWithChildren & HTMLAttributes<HTMLPreElement>

export const Pre = ({ children, ...props }: PreProps) => {
  return (
    <pre
      style={{
        fontSize: '0.8rem',
        fontFamily: 'var(--font-mono)',
      }}
      {...props}
    >
      {children}
    </pre>
  )
}
