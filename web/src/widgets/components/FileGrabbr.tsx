import { Box, Button, FlexRow, Grid, HotInput, P, useToast } from '@/lib'
import { AudioPlayr } from '@/lib/components/widgets/AudioPlayr'
import { useBool } from '@/lib/hooks/useBool'
import { toMaxDenom } from '@/lib/magic'
import { useEffect, useRef, useState } from 'react'

type Props = {
  onClear?: () => void
  onSubmit?: (files: File[]) => Promise<boolean[] | any>
  children?: React.ReactNode
}

type Preview = {
  file: File
  src: string
}

export const FileGrabbr = ({ onClear, onSubmit, children }: Props) => {
  // file drag and drop
  // or
  // ctrl v
  // detects text or image or video or audio or link
  // selects upload component, navigates to it, inserting payload into the component -> handles rest

  const [previews, setPreviews] = useState<Preview[]>([])
  const ref = useRef<HTMLDivElement | null>(null)
  const toast = useToast()
  const hovering = useBool()
  const focused = useBool()

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const files = e.dataTransfer.files
    const filesArray = Array.from(files)

    const previews = filesArray.map((file) => ({
      file,
      src: URL.createObjectURL(file),
    }))

    setPreviews(previews)
  }

  useEffect(() => {
    if (!ref.current) return

    const handleDataTransferItems = (items: DataTransferItemList) => {
      for (const item of items) {
        if (item.kind === 'file') {
          const file = item.getAsFile()
          if (!file) continue

          setPreviews((prev) => {
            return [...prev, { file, src: URL.createObjectURL(file) }]
          })
        }
        if (item.kind === 'string') {
          item.getAsString((s) => console.log('item string', s))
        }
      }
    }

    // listen for ctrl v
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault()

      const items = e.clipboardData?.items
      if (items?.length) handleDataTransferItems(items)
    }

    window.addEventListener('paste', handlePaste)

    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [])

  // todo: animated response to the control v
  // hover to show preview
  // or maybe click -> modal.

  return (
    <div
      tabIndex={42}
      autoFocus
      onClick={focused.tt}
      onFocus={focused.tt}
      onBlur={focused.ff}
      ref={ref}
      style={{
        border: focused.state
          ? '1px solid white'
          : '1px solid var(--trans-black-2)',
        borderRadius: '1rem',
        backgroundColor: hovering.state
          ? 'var(--trans-black-2)'
          : 'var(--trans-black)',
      }}
      onMouseEnter={hovering.tt}
      onMouseLeave={hovering.ff}
      onDrop={handleDrop}
    >
      <Grid gap="1rem" padding="1rem" width="100%">
        {previews.length > 0 ? (
          <FlexRow justifyContent="space-between" width="100%">
            <FlexRow gap="0.5rem" alignItems="center" width="100%">
              <P>
                {previews.length} {previews.length === 1 ? 'file' : 'files'}
              </P>
              <P>-</P>
              <P>
                Total Size:{' '}
                {toMaxDenom(
                  previews.reduce((acc, file) => acc + file.file.size, 0),
                )}
              </P>
              <Button
                size="small"
                onClick={() => {
                  setPreviews([])
                  onClear?.()
                  toast.toast('Files cleared', 'success')
                }}
              >
                X
              </Button>
            </FlexRow>
            <Button
              variant="contained"
              onClick={async () => {
                toast.toast(`${previews.length} files submitting...`)
                const results = await onSubmit?.(previews.map((p) => p.file))
                setPreviews((prev) => prev.filter((f, i) => !results?.[i]))
              }}
            >
              ✓
            </Button>
          </FlexRow>
        ) : focused.state ? (
          <P>Ctrl V that shit</P>
        ) : (
          <P>Click this shit</P>
        )}
        <FlexRow gap="1rem" flexWrap="wrap" alignItems="start">
          {previews.map((preview, i) => (
            <Grid
              key={preview.file.name}
              gap="1rem"
              border="1px solid"
              borderColor="border-color"
              borderRadius="1rem"
              padding="1rem"
            >
              <FlexRow
                gap="0.5rem"
                alignItems="center"
                justifyContent="space-between"
              >
                <HotInput
                  // width={`${preview.file.name.length + 1}ch`}
                  value={preview.file.name}
                  onFinish={(v) => {
                    setPreviews((prev) => {
                      const newFiles = [...prev]
                      newFiles[i] = {
                        file: new File([preview.file], v, {
                          type: preview.file.type,
                        }),
                        src: preview.src,
                      }
                      return newFiles
                    })
                  }}
                />
                <Button
                  onClick={() =>
                    setPreviews((prev) => prev.filter((f, fi) => fi !== i))
                  }
                >
                  <P>X</P>
                </Button>
              </FlexRow>
              <FlexRow gap="0.5rem">
                <P>{toMaxDenom(preview.file.size)}</P>
                <P>{preview.file.type}</P>
              </FlexRow>
              {preview.file.type.includes('image') && (
                <Thumbnail>
                  <img
                    src={preview.src}
                    alt={preview.file.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Thumbnail>
              )}
              {preview.file.type.includes('video') && (
                <Thumbnail>
                  <video
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    src={preview.src}
                    autoPlay
                    muted
                    loop
                    controls
                  />
                </Thumbnail>
              )}
              {preview.file.type.includes('audio') && (
                <Thumbnail>
                  <AudioPlayr key={preview.file.name} src={preview.src} />
                </Thumbnail>
              )}
              {preview.file.type.includes('text') && (
                <Thumbnail>
                  <P>{preview.file.name}</P>
                </Thumbnail>
              )}
              {preview.file.type.includes('application') && (
                <Thumbnail>
                  <P>{preview.file.name}</P>
                </Thumbnail>
              )}
            </Grid>
          ))}
        </FlexRow>
      </Grid>
      {children}
    </div>
  )
}

const Thumbnail = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box maxWidth="200px" maxHeight="200px" width="100%" height="100%">
      {children}
    </Box>
  )
}
