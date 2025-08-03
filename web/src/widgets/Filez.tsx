import {
  Box,
  Button,
  Divider,
  FlexRow,
  Grid,
  HotInput,
  P,
  Table,
  useToast,
} from '@/lib'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetContainer } from './components/WidgetContainer'
import { WidgetBody } from './components/WidgetBody'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { useUploads } from '@/lib/hooks/api/useUploads'
import { FileGrabbr } from './components/FileGrabbr'
import { toMaxDenom, toRelative } from '@/lib/magic'
import { groupBy } from 'lodash'

export const Filez = () => {
  const collapsed = useLocalState('filez-collapsed', true)
  const uploads = useUploads()
  const toast = useToast()
  const page = useLocalState('filez-page', 1)
  const items = useLocalState('filez-items', 10)

  const handleUpload = async (files: File[]) => {
    if (!files.length) {
      toast.toast('Please select a file')
      return
    }

    const uploaded = await Promise.all(
      files.map(async (file) => {
        const upload = await uploads.create.mutateAsync({
          name: file.name,
          filename: file.name,
          mime: file.type,
          size: file.size,
        })

        if (!upload.metadata) {
          toast.toast(`${upload.name} failed!`, 'error')
          return null
        }

        const url = upload.metadata.signedUrl
        try {
          const staticResponse = await uploads.put(url, file)
          console.log('staticResponse ->', staticResponse)

          // update the upload with the signed response and update status
          await uploads.update.mutateAsync({
            id: upload.id,
            status: '✓',
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

      return uploaded.map((upload) => !!upload)
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
          header={
            <FlexRow justifyContent="space-between" padding="0.25rem">
              <Button
                size="small"
                onClick={() => page.set(page.state - 1)}
                disabled={page.state === 1}
              >
                Prev
              </Button>
              <FlexRow alignItems="center" gap="1rem">
                <P>Page {page.state}</P>
                <P>of</P>
                <P>
                  {Math.ceil((uploads.data?.length || 0) / items.state) || 1}
                </P>
                <HotInput
                  width="5ch"
                  value={items.state.toString()}
                  onFinish={(value) => {
                    items.set(Number(value))
                    page.set(1)
                  }}
                />
                <P>Items per page</P>
              </FlexRow>
              <Button
                size="small"
                onClick={() => page.set(page.state + 1)}
                disabled={
                  !!uploads.data?.length &&
                  page.state === Math.ceil(uploads.data.length / items.state)
                }
              >
                Next
              </Button>
            </FlexRow>
          }
          data={uploads.data?.slice(
            (page.state - 1) * items.state,
            page.state * items.state,
          )}
          columns={[
            {
              key: 'name',
              label: 'Name',
              style: {
                width: '15ch',
              },
              render: (f) => (
                <HotInput
                  // width="15ch"
                  value={f.name}
                  onFinish={async (name) => {
                    if (name === f.name) return

                    await uploads.update.mutateAsync({
                      id: f.id,
                      name,
                    })
                    toast.toast('File name updated', 'success')
                  }}
                />
              ),
            },
            {
              label: 'Type',
              style: {
                textAlign: 'center',
                fontSize: '12px',
                width: '10ch',
              },
              render: (f) => f.metadata?.mime || '-',
            },
            {
              label: 'Size',
              style: {
                textAlign: 'center',
                fontSize: '12px',
                width: '15ch',
              },
              render: (f) =>
                f.metadata?.size ? toMaxDenom(f.metadata.size) : '-',
            },
            {
              key: 'status',
              style: {
                width: '10ch',
                textAlign: 'center',
                // fontSize: '12px',
                padding: 0,
              },
              label: 'Status',
            },
            {
              key: 'link',
              style: {
                width: '15ch',
                maxWidth: '30ch',
                fontSize: '12px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
              label: 'Link',
              render: (upload) => (
                <a
                  href={upload.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={upload.link}
                >
                  {upload.link.split('/').pop()}
                </a>
              ),
            },
            {
              key: 'createdAt',
              label: 'Created',
              style: {
                width: '10ch',
                fontSize: '12px',
              },
              render: (upload) => toRelative(upload.createdAt),
            },
            {
              label: 'Actions',
              style: {
                width: '5ch',
                textAlign: 'center',
                fontSize: '12px',
                padding: '0',
              },
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
                    x
                  </Button>
                </Box>
              ),
            },
          ]}
          footer={
            <FlexRow gap="0.5rem" padding="0.25rem" justifyContent="center">
              {Object.entries(groupBy(uploads.data, 'metadata.mime')).map(
                ([mime, files]) => (
                  <P key={mime}>
                    {mime} ({files.length})
                  </P>
                ),
              )}
            </FlexRow>
          }
        />
      </WidgetBody>
    </WidgetContainer>
  )
}
