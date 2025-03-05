import { useEffect } from 'react'

import { useState } from 'react'

type Props = {
  children?: React.ReactNode
  text: string
}

export const Bub = ({ text }: Props) => {
  // renders. floats up screen and fades out

  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, 1000)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {/* {children} */}
      <div
        style={{
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {text}
      </div>
    </div>
  )
}
