import {
  Box,
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
import { useToast } from '@/lib/hooks/useToast'
import { Toast } from '@/lib/components/elements/Toast'
import { AnchorLink } from '@/lib/components/elements/AnchorLink'
import { useEffect } from 'react'

export const SongInfo = () => {
  const sp = useSearchParams()
  const songId = sp.get('song-id')
  const song = useSong(songId)
  const collapsed = useLocalState('song-info-collapsed', false)
  const toast = useToast()
  // show waveform
  // create markers w/ notes & attachments & links

  useEffect(() => {
    if (song.data?.id) collapsed.set(false)
    else collapsed.set(true)
  }, [song.data?.id])

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
          <AnchorLink id={song.data?.id || ''}>
            <H1
              fontSize="1rem"
              position="relative"
              top="7px"
              onClick={() => {
                if (!song.data?.id) return

                const element = document.getElementById(song.data.id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {song.data?.name}
            </H1>
          </AnchorLink>
          <Link
            style={{
              fontSize: '0.8rem',
              color: 'var(--brand-3)',
              textDecoration: 'underline',
            }}
            to={song.data?.link || ''}
            onClick={(e) => {
              e.preventDefault()
              navigator.clipboard.writeText(song.data?.link || '')
              toast.toast('copied to clipboard')
            }}
          >
            {song.data?.originalFilename || song.data?.name}
          </Link>
          <FlexRow gap="0.5rem">
            <Button
              size="small"
              onClick={() => {
                if (!song.data?.id) return

                sp.set('queue-id', song.data.id)
                // scroll to id
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
            // 'id',
            'name',
            'filename',
            'size',
            'bpm',
            'key',
            'mime',
          ]}
        />
        <Divider />

        <Divider />
        <TextArea
          value={song.data?.notes}
          onBlur={async (notes) => {
            await song.update.mutateAsync({
              id: song.data?.id,
              notes,
            })
            toast.toast('notes updated')
          }}
        />
        {/* <Divider />
        <Box
          // display="none"
          maxWidth="100%"
          overflow="auto"
          fontSize="0.8rem"
          backgroundColor="var(--gray-1)"
        >
          <Json data={song.data} />
        </Box> */}
      </WidgetBody>
      <Toast>{toast.message}</Toast>
    </WidgetContainer>
  )
}
