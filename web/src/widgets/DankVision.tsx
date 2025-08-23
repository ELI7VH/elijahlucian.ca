import { Flex, FlexCol, FlexRow } from '@/lib/components/layout/Flex'
import { WidgetContainer } from './components/WidgetContainer'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetBody } from './components/WidgetBody'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { keyBy } from 'lodash'
import { P, Button, Divider, Box, Checkbox } from '@/lib'

const useDankvisionChannels = () => {
  const data = [
    {
      id: 'LAWNZ',
      name: 'LAWNZ',
      type: 'youtube',
      description:
        'LAWNZ - decentralized social media - Architecture idea - Season 1',
      playlist: [
        'https://www.youtube.com/embed/6nPyhN91DXs?list=PLMrGa3-RIUa40FoUc4s62DUiN4_HNcRUq',
      ],
    },
  ]

  const index = keyBy(data, 'id')
  const get = (id: string) => index[id]

  return { index, data, get }
}

export const DankVision = () => {
  const collapsed = useLocalState('dankvision-collapsed', true)
  const channel = useLocalState('dankvision-channel', 'LAWNZ')
  const autoplay = useLocalState('dankvision-autoplay', true)

  const channels = useDankvisionChannels()

  const vision = channels.get(channel.state)

  return (
    <WidgetContainer width="600px">
      <WidgetBadge
        name={collapsed.state ? 'd' : 'dank.vision'}
        onClick={() => collapsed.toggle()}
      />
      <WidgetBody collapsed={collapsed.state}>
        <FlexCol alignItems="center">
          <P>{vision?.description}</P>
        </FlexCol>
        <Divider />
        <FlexRow>
          <FlexCol gap="1rem">
            {vision?.playlist.map((source) => (
              <iframe
                key={source}
                width="600"
                height="420"
                src={`${source}${
                  collapsed.state ? '' : autoplay.state ? '&autoplay=1' : ''
                }`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ))}
          </FlexCol>
        </FlexRow>
        <Divider />
        <FlexRow justifyContent="space-between">
          <Button>
            {' '}
            <span
              style={{
                transform: 'scaleX(-1)',
                display: 'inline-block',
              }}
            >
              ➢
            </span>
          </Button>
          <Flex alignItems="center" gap="0.5rem">
            <Checkbox
              checked={autoplay.state}
              onChange={() => autoplay.toggle()}
            />
            <label>
              <P>Autoplay</P>
            </label>
          </Flex>
          <Button>
            <span
              style={{
                transform: 'scaleX(1)',
                display: 'inline-block',
              }}
            >
              ➢
            </span>
          </Button>
        </FlexRow>
      </WidgetBody>
    </WidgetContainer>
  )
}
