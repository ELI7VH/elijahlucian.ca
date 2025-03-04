import { FlexCol } from '@/lib/components/layout/Flex'
import { WidgetContainer } from './components/WidgetContainer'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetBody } from './components/WidgetBody'
import { useLocalState } from '@/lib/hooks/useLocalState'

export const DankVision = () => {
  const collapsed = useLocalState('dankvision-collapsed', true)
  const sources = [
    'https://www.youtube.com/embed/6nPyhN91DXs?list=PLMrGa3-RIUa40FoUc4s62DUiN4_HNcRUq',
  ]
  return (
    <WidgetContainer>
      <WidgetBadge
        name={collapsed.state ? 'd' : 'dank.vision'}
        onClick={() => collapsed.toggle()}
      />
      <WidgetBody collapsed={collapsed.state}>
        <FlexCol>
          {sources.map((source) => (
            <iframe
              width="600"
              height="420"
              src={source}
              title="LAWNZ - decentralized social media - Architecture idea - Episode 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}
        </FlexCol>
      </WidgetBody>
    </WidgetContainer>
  )
}
