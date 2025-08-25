import { Flex, FlexCol, FlexRow } from '@/lib/components/layout/Flex'
import { WidgetContainer } from './components/WidgetContainer'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetBody } from './components/WidgetBody'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { keyBy } from 'lodash'
import { P, Button, Divider, Box, Checkbox, Grid } from '@/lib'

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
    {
      id: 'NFTZ',
      name: 'NFTZ',
      type: 'iframe',
      description: 'NFTZ',
      playlist: [
        // Spaceport
        // https://teia.art/objkt/45302
        'https://cache.teia.rocks/ipfs/QmbEC9pJ5xw9yMJqUYVh2ZrF6ZJ7kBtW3cQrU5ywPhYazd/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=45302',
        // Outrun Sunset
        // https://teia.art/objkt/47712
        'https://cache.teia.rocks/ipfs/QmbXTttAqWPZpkSy9EGZj3h1RQZAVUw8v6eYUmgL3u5o5a/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=47712',
        // construct addtl asteroids
        // https://teia.art/objkt/677001
        'https://cache.teia.rocks/ipfs/QmVYF143wWoUXPqRwNT5usJ9XmdXaF6aRre2GB83JR5RQn/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=677001',
        // Milk It
        // https://teia.art/objkt/53868
        'https://cache.teia.rocks/ipfs/Qmb99V1dS1Z5kvvL83XMwPvexX7t5bqVCZqHVJCzZMuvf7/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=53868',
        // Tezos Till I Bezos
        // https://teia.art/objkt/52405
        'https://cache.teia.rocks/ipfs/QmNwKk6qb1vp7pwpFqpjYk73FmYDfG2EEK43S5wYiHS45m/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=52405',
        // Spring Rain
        // https://teia.art/objkt/60398
        'https://cache.teia.rocks/ipfs/QmcpHbbR43vX2iTCQu76VR7E2LQFsP2E259yhzwT6TMRoT/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=60398',
        // Summon The Unicorns
        // https://teia.art/objkt/45702
        'https://cache.teia.rocks/ipfs/QmUGzoisiAcH6BdsGDgdXyuvPiLu5mTyYDH2JULjNGxw7o/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=45702',
      ],
    },
  ]

  const index = keyBy(data, 'id')
  const get = (id: string) => index[id]

  return { index, data, get }
}

export const DankVision = () => {
  const collapsed = useLocalState('dankvision-collapsed', true)
  const channel = useLocalState('dankvision-channel', 'NFTZ')
  const autoplay = useLocalState('dankvision-autoplay', true)
  const index = useLocalState('dankvision-index', 0)

  const channels = useDankvisionChannels()

  const vision = channels.get(channel.state)

  const show = vision?.playlist[index.state]

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
          <Grid columns={1} width="100%">
            <Grid
              gridArea="1/1/1/1"
              width="100%"
              height="420px"
              backgroundColor="rgba(0, 0, 0, 1)"
              alignItems="center"
              justifyContent="center"
            >
              <P>todo: tv static. random things. </P>
            </Grid>

            {show && (
              <iframe
                key={show}
                style={{
                  backgroundColor: 'var(--trans-black-2)',
                  gridArea: '1/1/1/1',
                }}
                width="600"
                height="420"
                src={`${show}${
                  collapsed.state ? '' : autoplay.state ? '&autoplay=1' : ''
                }`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
          </Grid>
        </FlexRow>
        <Divider />
        <FlexRow justifyContent="space-between">
          <Button
            onClick={() => index.set(index.state - 1)}
            disabled={index.state === 0}
          >
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
          <Button
            onClick={() => index.set(index.state + 1)}
            disabled={index.state === vision?.playlist.length - 1}
          >
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
