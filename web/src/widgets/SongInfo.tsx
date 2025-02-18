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

export const SongInfo = () => {
  const sp = useSearchParams()
  const songId = sp.get('song-id')

  const song = useSong(songId)

  const collapsed = useLocalState('song-info-collapsed', false)

  if (!song.data)
    return (
      <WidgetContainer>
        <WidgetBadge name="s" onClick={collapsed.toggle} />
        <WidgetBody
          backgroundColor="#111"
          opacity={1}
          border="1px solid var(--gray-6)"
          collapsed={collapsed.state}
          width="600px"
          maxWidth="600px"
          textWrap="nowrap"
        >
          no song selected!
        </WidgetBody>
      </WidgetContainer>
    )

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
        width="600px"
        maxWidth="600px"
      >
        <FlexRow justifyContent="space-between">
          <H1 fontSize="1rem" position="relative" top="7px">
            {song.data?.name}
          </H1>
          <FlexRow gap="0.5rem">
            <Button
              size="small"
              onClick={() => {
                sp.set('queue-id', song.data?.id)
              }}
            >
              ▹
            </Button>
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
        <Link
          style={{
            fontSize: '0.8rem',
            color: 'var(--brand-3)',
            textDecoration: 'underline',
          }}
          to={song.data?.link || ''}
        >
          {song.data?.originalFilename || song.data?.name}
        </Link>
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
