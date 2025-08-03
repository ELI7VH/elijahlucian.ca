import { Box, Button, Divider, Grid, P, Table, useToast } from '@/lib'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetContainer } from './components/WidgetContainer'
import { WidgetBody } from './components/WidgetBody'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { useUploads } from '@/lib/hooks/api/useUploads'
import { FileGrabbr } from './components/FileGrabbr'

export const Uploadr = () => {
  const collapsed = useLocalState('uploadr-collapsed', true)
  const uploads = useUploads()
  const toast = useToast()

  const handleUpload = async (files: File[]) => {
    console.log('files', files)
    if (!files.length) {
      toast.toast('Please select a file')
      return
    }

    // check for dupes.
    const dupes = files.filter((file) =>
      uploads.data?.some((upload) => upload.name === file.name),
    )
    if (dupes.length) {
      toast.toast('File already exists, check the list', 'warning')
      return
    }

    const uploaded = await Promise.all(
      files.map(async (file) => {
        const upload = await uploads.create.mutateAsync({
          name: file.name,
          filename: file.name,
          mime: file.type,
        })

        const url = upload.metadata.signedUrl
        try {
          const staticResponse = await uploads.put(url, file)
          console.log('staticResponse ->', staticResponse)

          // update the upload with the signed response and update status
          await uploads.update.mutateAsync({
            id: upload.id,
            status: 'uploaded',
          })

          return upload
        } catch (error) {
          await uploads.destroy.mutateAsync(upload.id)
          toast.toast(`${upload.name} failed! ${error}`, 'error')

          return null
        }
      }),
    )

    if (uploaded.filter(Boolean).length) {
      toast.toast(
        `${uploaded.filter(Boolean).length} files uploaded`,
        'success',
      )
    } else {
      toast.toast('No files uploaded 😵', 'error')
    }
  }

  return (
    <WidgetContainer>
      <WidgetBadge
        name={collapsed.state ? 'f' : 'filez'}
        onClick={() => collapsed.toggle()}
      />
      <WidgetBody collapsed={collapsed.state} background="background-image-2">
        <Box>
          <P>Filez ({uploads.data?.length})</P>
        </Box>
        <FileGrabbr onSubmit={handleUpload} />
        <Divider />
        <Table
          data={uploads.data?.slice(0, 10)}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'status', label: 'Status' },
            {
              label: 'Actions',
              render: (upload) => (
                <Box>
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      await upload.destroy()
                      toast.toast('File deleted', 'success')
                    }}
                    size="small"
                  >
                    Delete
                  </Button>
                </Box>
              ),
            },
          ]}
        />
      </WidgetBody>
    </WidgetContainer>
  )
}
