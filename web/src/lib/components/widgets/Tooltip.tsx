import { PropsWithChildren, ReactNode, useState } from 'react'

export const Tooltip = ({
  children,
  text,
}: PropsWithChildren & { text: ReactNode }) => {
  const [hovering, setHovering] = useState(false)

  return (
    <div>
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          pointerEvents: 'all',
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {children}
        <div
          style={{
            padding: '1rem',
            maxWidth: '300px',
            overflowX: 'auto',
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            borderRadius: '4px',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            visibility: hovering ? 'visible' : 'hidden',
            opacity: hovering ? '1' : '0',
            transition: 'opacity 0.2s',
            zIndex: 1000,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  )
}
