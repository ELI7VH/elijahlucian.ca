import { Box, H1, H3, Json, Pre, useSearchParams } from '@/lib'
import { useSong, useSongs } from '@/lib/hooks/api/useSongs'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBody } from './components/WidgetBody'
import { WidgetContainer } from './components/WidgetContainer'
import { WidgetBadge } from './components/WidgetBadge'
import { useEffect } from 'react'

export const SongInfo = () => {
  const sp = useSearchParams()
  const songId = sp.get('song-id')

  const song = useSong(songId)

  const collapsed = useLocalState('song-info-collapsed', false)

  useEffect(() => {
    if (songId) {
      collapsed.set(false)
    }
  }, [songId])

  return (
    <WidgetContainer>
      <WidgetBadge
        name={collapsed.state ? 's' : 'Song'}
        onClick={() => {
          collapsed.toggle()
        }}
      />
      <WidgetBody
        collapsed={collapsed.state}
        opacity={1}
        backgroundColor="white"
        color="black"
      >
        <Box>
          <H1>{song?.name}</H1>
        </Box>
        <Json
          data={{
            id: song?.id,
            name: song?.name,
            link: song?.link,
            originalFilename: song?.originalFilename,
            size: song?.size,
            folder: song?.folder,
            bucket: song?.bucket,
            mime: song?.mime,
          }}
        />
      </WidgetBody>
    </WidgetContainer>
  )
}
