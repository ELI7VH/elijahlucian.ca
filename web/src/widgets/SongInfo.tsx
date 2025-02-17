import {
  Button,
  Divider,
  FlexRow,
  H1,
  Json,
  Link,
  TextArea,
  useSearchParams,
} from '@/lib'
import { useSong } from '@/lib/hooks/api/useSongs'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBody } from './components/WidgetBody'
import { WidgetContainer } from './components/WidgetContainer'
import { WidgetBadge } from './components/WidgetBadge'
import { BasicRecord } from '@/lib/components/layout/BasicRecord'
import { useEffect } from 'react'
export const SongInfo = () => {
  const sp = useSearchParams()
  const songId = sp.get('song-id')

  const song = useSong(songId)

  const collapsed = useLocalState('song-info-collapsed', false)

  // useEffect(() => {
  //   console.log('songId effect', songId)
  //   if (songId) {
  //     collapsed.set(false)
  //   }
  // }, [songId])

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
          <H1 fontSize="1rem" position="relative" top="7px">
            {song.data?.name}
          </H1>
          <Button
            size="small"
            onClick={() => {
              sp.set('song-id')
              collapsed.set(true)
            }}
          >
            x
          </Button>
        </FlexRow>
        <Divider />
        <BasicRecord
          data={song.data}
          fields={[
            'id',
            'name',
            'originalFilename',
            'size',
            'folder',
            'bucket',
            'mime',
          ]}
        />
        <Divider />
        <Link to={song.data?.link || ''}>download</Link>
        <Divider />
        <TextArea
          value={song.data?.notes}
          onBlur={async (notes) => {
            await song.update.mutateAsync({
              id: song.data?.id,
              notes,
            })
          }}
        />
      </WidgetBody>
    </WidgetContainer>
  )
}
