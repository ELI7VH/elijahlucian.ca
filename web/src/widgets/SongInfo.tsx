import { Button, FlexRow, H1, Json, TextArea, useSearchParams } from '@/lib'
import { useSong } from '@/lib/hooks/api/useSongs'
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
        <FlexRow justifyContent="space-between">
          <H1>{song?.name}</H1>
          <Button
            sx={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.5rem',
            }}
            onClick={() => {
              sp.set('song-id')
              collapsed.set(true)
            }}
          >
            x
          </Button>
        </FlexRow>
        <Json
          data={{
            id: song?.id || 'no song selected',
            name: song?.name,
            link: song?.link,
            originalFilename: song?.originalFilename,
            size: song?.size,
            folder: song?.folder,
            bucket: song?.bucket,
            mime: song?.mime,
          }}
        />
        <TextArea
          value={song?.notes}
          onBlur={async () => {
            await song?.fns.update.mutate({
              id: song?.id,
              notes: song?.notes,
            })
          }}
        />
      </WidgetBody>
    </WidgetContainer>
  )
}
