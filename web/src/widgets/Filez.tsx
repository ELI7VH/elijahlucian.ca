import { Box, Divider, P } from '@/lib'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetContainer } from './components/WidgetContainer'
import { WidgetBody } from './components/WidgetBody'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { useUploads } from '@/lib/hooks/api/useUploads'
import { FileGrabbr } from './components/FileGrabbr'

export const Uploadr = () => {
  const collapsed = useLocalState('uploadr-collapsed', true)
  const uploads = useUploads()

  const handleSubmit = async (files: File[]) => {
    console.log('files', files)
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
        <FileGrabbr onSubmit={handleSubmit} />
        <Divider />
        {uploads.data?.slice(0, 10).map((upload, i) => (
          <Box key={upload.id}>
            <P>
              {i + 1}. {upload.name}
            </P>
          </Box>
        ))}
      </WidgetBody>
    </WidgetContainer>
  )
}
