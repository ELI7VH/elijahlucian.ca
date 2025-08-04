import { Box, Button, FlexRow, Grid, HotInput, P, useToast } from '@/lib'
import { toMaxDenom } from '@/lib/magic'
import { useEffect, useRef, useState } from 'react'

type Props = {
  onFiles?: (files: File[]) => void
  onClear?: () => void
  onSubmit?: (files: File[]) => Promise<boolean[] | any>
}

export const FileGrabbr = ({ onFiles, onClear, onSubmit }: Props) => {
  // file drag and drop
  // or
  // ctrl v
  // detects text or image or video or audio or link
  // selects upload component, navigates to it, inserting payload into the component -> handles rest

  const [files, setFiles] = useState<File[]>([])
  const ref = useRef<HTMLDivElement | null>(null)
  const toast = useToast()

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const files = e.dataTransfer.files
    const filesArray = Array.from(files)
    setFiles(filesArray)
    onFiles?.(filesArray)
  }

  useEffect(() => {
    if (!ref.current) return

    const handleDataTransferItems = (items: DataTransferItemList) => {
      for (const item of items) {
        // interesting...
        // console.log('dataTransfer item:', item)

        if (item.kind === 'file') {
          const file = item.getAsFile()
          // console.log('dataTransfer file:', file)

          // why would this be null? .. stupid
          if (!file) continue

          // if (files.find((f) => f.name === file.name)) {
          //   toast.toast('File already exists', 'warning')
          //   return
          // }

          setFiles((prev) => {
            return [...prev, file]
          })
        }
        if (item.kind === 'string') {
          item.getAsString((s) => console.log('item string', s))
        }
      }
    }

    // const handleFiles = (files: FileList) => {
    //   for (const file of files) {
    //     console.log('files file:', file)
    //   }
    // }

    // listen for ctrl v
    const handlePaste = (e: ClipboardEvent) => {
      if (!ref.current?.contains(document.activeElement)) return
      e.preventDefault()

      // console.log('clipboardData:', e.clipboardData)

      // const files = e.clipboardData?.files
      // if (files?.length) handleFiles(files)

      const items = e.clipboardData?.items
      if (items?.length) handleDataTransferItems(items)
    }

    window.addEventListener('paste', handlePaste)

    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [])

  // todo. animated response tothe control v
  // hover to show preview
  // or maybe click -> modal.

  return (
    <div
      autoFocus
      ref={ref}
      style={{
        border: '1px solid var(--border-color)',
        borderRadius: '1rem',
        width: '100%',
      }}
      onDrop={handleDrop}
    >
      <Grid gap="1rem">
        {files.length > 0 ? (
          <FlexRow justifyContent="space-between">
            <FlexRow gap="0.5rem" alignItems="center">
              <P>
                {files.length} {files.length === 1 ? 'file' : 'files'}
              </P>
              <P>-</P>
              <P>
                Total Size:{' '}
                {toMaxDenom(files.reduce((acc, file) => acc + file.size, 0))}
              </P>
              <Button
                size="small"
                onClick={() => {
                  setFiles([])
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
                toast.toast(`${files.length} files submitting...`)
                const results = await onSubmit?.(files)
                setFiles((prev) => prev.filter((f, i) => !results?.[i]))
              }}
            >
              ✓
            </Button>
          </FlexRow>
        ) : (
          <P>Ctrl V that shit</P>
        )}
        <FlexRow gap="1rem" flexWrap="wrap" alignItems="start">
          {files.map((file, i) => (
            <Grid
              key={`file-${i}`}
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
                  width={`${file.name.length + 1}ch`}
                  value={file.name}
                  onFinish={(v) => {
                    setFiles((prev) => {
                      const newFiles = [...prev]
                      newFiles[i] = new File([file], v, { type: file.type })
                      return newFiles
                    })
                  }}
                />
                <Button
                  onClick={() =>
                    setFiles((prev) => prev.filter((f, fi) => fi !== i))
                  }
                >
                  <P>X</P>
                </Button>
              </FlexRow>
              <FlexRow gap="0.5rem">
                <P>{toMaxDenom(file.size)}</P>
                <P>{file.type}</P>
              </FlexRow>
              {file.type.includes('image') && (
                <Thumbnail>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Thumbnail>
              )}
              {file.type.includes('video') && (
                <Thumbnail>
                  <video
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    src={URL.createObjectURL(file)}
                    autoPlay
                    muted
                    loop
                    controls
                  />
                </Thumbnail>
              )}
              {file.type.includes('audio') && (
                <Thumbnail>
                  <audio src={URL.createObjectURL(file)} controls />
                </Thumbnail>
              )}
              {file.type.includes('text') && (
                <Thumbnail>
                  <P>{file.name}</P>
                </Thumbnail>
              )}
              {file.type.includes('application') && (
                <Thumbnail>
                  <P>{file.name}</P>
                </Thumbnail>
              )}
            </Grid>
          ))}
        </FlexRow>
      </Grid>
    </div>
  )
}

const Thumbnail = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box width="200px" height="200px">
      {children}
    </Box>
  )
}
