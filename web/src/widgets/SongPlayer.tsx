import { Box } from '@/lib'
import { MediaHTMLAttributes, useRef } from 'react'

type Props = MediaHTMLAttributes<HTMLAudioElement> & {
  onEnded?: () => void
}

export const SongPlayer = ({ src, onEnded, ...props }: Props) => {
  const el = useRef<HTMLAudioElement>(null)

  const handleSongEnd = () => {
    console.log('song ended')
    onEnded?.()
  }

  return (
    <Box>
      <audio
        ref={el}
        src={src}
        controls
        autoPlay
        onEnded={handleSongEnd}
        style={{
          width: '100%',
          height: '2rem',
          // borderRadius: '0.1rem',
          // backgroundColor: 'black',
        }}
        {...props}
      />
    </Box>
  )
}
