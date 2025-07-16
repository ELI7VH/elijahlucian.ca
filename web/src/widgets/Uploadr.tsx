import { Box, P } from '@/lib'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetContainer } from './components/WidgetContainer'
import { WidgetBody } from './components/WidgetBody'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { useUploads } from '@/lib/hooks/api/useUploads'

export const Uploadr = () => {
  const collapsed = useLocalState('uploadr-collapsed', true)
  const uploads = useUploads()

  return (
    <WidgetContainer maxWidth="500px">
      <WidgetBadge
        name={collapsed.state ? 'f' : 'filez'}
        onClick={() => collapsed.toggle()}
      />
      <WidgetBody collapsed={collapsed.state} background="background-image-2">
        <Box>
          <P>Filez ({uploads.data?.length})</P>
          {uploads.data?.map((upload) => (
            <Box key={upload.id}>{upload.name}</Box>
          ))}
        </Box>
        <Box></Box>
      </WidgetBody>
    </WidgetContainer>
  )
}
