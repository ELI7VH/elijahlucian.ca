import { Box } from '@/lib'
import { MediaHTMLAttributes, RefObject, useEffect, useRef } from 'react'

type Props = MediaHTMLAttributes<HTMLAudioElement> & {
  onEnded?: () => void
  ref?: RefObject<HTMLAudioElement>
}

export const SongPlayer = ({ src, onEnded, ref, ...props }: Props) => {
  const handleSongEnd = () => {
    console.log('song ended')
    onEnded?.()
  }

  return (
    <Box>
      <audio
        ref={ref}
        src={src}
        controls
        autoPlay
        onEnded={handleSongEnd}
        style={{
          width: '100%',
          height: '2rem',
          pointerEvents: 'all',
          // borderRadius: '0.1rem',
          // backgroundColor: 'black',
        }}
        {...props}
      />
    </Box>
  )
}
