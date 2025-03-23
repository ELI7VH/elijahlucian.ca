import {
  Box,
  Button,
  Checkbox,
  Divider,
  FlexRow,
  Grid,
  H1,
  HotInput,
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
import { AnchorLink } from '@/lib/components/elements/AnchorLink'
import { useEffect } from 'react'
import { omit } from 'lodash'

export const SongInfo = () => {
  const sp = useSearchParams()
  const songId = sp.get('song-id')
  const song = useSong(songId)
  const { toast } = useToast()

  const collapsed = useLocalState('song-info-collapsed', false)
  const mode = useLocalState('song-info-mode', 'view')
  // show waveform
  // create markers w/ notes & attachments & links

  // todo: add album artwork

  useEffect(() => {
    if (song.data?.id) collapsed.set(false)
    else collapsed.set(true)
  }, [song.data?.id])

  if (!song.data)
    return (
      <>
        <WidgetContainer>
          <WidgetBadge name="s" onClick={collapsed.toggle} />
          <WidgetBody
            backgroundColor="#111"
            border="1px solid var(--gray-6)"
            collapsed={collapsed.state}
            textWrap="nowrap"
          >
            no song selected!
          </WidgetBody>
        </WidgetContainer>
      </>
    )

  return (
    <>
      <WidgetContainer>
        <WidgetBadge
          name={collapsed.state ? 's' : 'Song'}
          onClick={() => {
            collapsed.toggle()
          }}
        />
        <WidgetBody
          collapsed={collapsed.state}
          backgroundColor="white"
          color="black"
          border="2px solid var(--gray-6)"
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
                toast('copied to clipboard')
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
          <FlexRow gap="0.7rem" justifyContent="end">
            <Divider />
            <Button
              size="small"
              variant={mode.state === 'view' ? 'contained' : 'text'}
              onClick={() => mode.set('view')}
            >
              view
            </Button>
            <Button
              size="small"
              variant={mode.state === 'edit' ? 'contained' : 'text'}
              onClick={() => mode.set('edit')}
            >
              edit
            </Button>
            <Divider width="1rem" />
          </FlexRow>
          <Grid
            height={mode.state === 'edit' ? '200px' : '0'}
            transition="height 0.3s ease-in-out"
            overflow="hidden"
            alignItems="center"
          >
            <HotInput
              label="name"
              value={song.data?.name}
              onFinish={(name) => {
                song.update.mutateAsync({ name })
                toast('name updated')
              }}
            />
            <TextArea
              value={song.data?.notes}
              onBlur={async (e) => {
                await song.update.mutateAsync({
                  id: song.data?.id,
                  notes: e.target.value,
                })
                toast('notes updated')
              }}
            />
          </Grid>
          <Box
            transition="height 0.3s ease-in-out"
            height={mode.state === 'view' ? '200px' : '0'}
            maxWidth="100%"
            overflow="hidden"
          >
            <Box padding="0.5rem" border="1px solid var(--gray-2)">
              <Box overflow="auto" padding="0.5rem">
                <Json
                  data={omit(song.data, ['id', 'signedUrl', 'notes', 'link'])}
                />
              </Box>
            </Box>
          </Box>
          <FlexRow justifyContent="center" gap="0.5rem">
            <Button
              variant="text"
              size="small"
              onClick={async () => {
                const confirm = window.confirm('are you sure?')
                if (!confirm) return

                if (!song.data?.id) return

                await song.destroy.mutateAsync()
                toast('song deleted')
              }}
            >
              delete
            </Button>
            <Divider />
            <Button
              size="small"
              onClick={() => {
                if (!song.data?.id) return

                navigator.clipboard.writeText(JSON.stringify(song.data || '{}'))
                toast('copied to clipboard')
              }}
            >
              copy
            </Button>
          </FlexRow>
          <FlexRow justifyContent="center">
            <FlexRow gap="0.5rem">
              <Checkbox
                checked={song.data?.ready || false}
                onChange={(ready) => {
                  song.update.mutateAsync({ id: song.data?.id, ready })
                    toast(`Song ${ready ? 'marked as ready' : 'unmarked as ready'}`, 'success')
                }}
              />
              <label htmlFor="ready">ready</label>
            </FlexRow>
          </FlexRow>
        </WidgetBody>
      </WidgetContainer>
    </>
  )
}
