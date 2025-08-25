import { Flex, FlexRow } from '@/lib/components/layout/Flex'
import { WidgetContainer } from './components/WidgetContainer'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetBody } from './components/WidgetBody'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { keyBy } from 'lodash'
import { P, Button, Divider, Checkbox, Grid, Box } from '@/lib'

const useDankvisionChannels = () => {
  const data = [
    {
      name: 'NFTZ',
      type: 'iframe',
      description: 'NFTZ',
      playlist: [
        {
          name: 'Spaceport',
          url: 'https://teia.art/objkt/45302',
          src: 'https://cache.teia.rocks/ipfs/QmbEC9pJ5xw9yMJqUYVh2ZrF6ZJ7kBtW3cQrU5ywPhYazd/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=45302',
        },
        {
          name: 'Outrun Sunset',
          url: 'https://teia.art/objkt/47712',
          src: 'https://cache.teia.rocks/ipfs/QmbXTttAqWPZpkSy9EGZj3h1RQZAVUw8v6eYUmgL3u5o5a/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=47712',
        },
        {
          name: 'construct addtl asteroids',
          url: 'https://teia.art/objkt/677001',
          src: 'https://cache.teia.rocks/ipfs/QmVYF143wWoUXPqRwNT5usJ9XmdXaF6aRre2GB83JR5RQn/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=677001',
        },
        {
          name: 'Milk It',
          url: 'https://teia.art/objkt/53868',
          src: 'https://cache.teia.rocks/ipfs/Qmb99V1dS1Z5kvvL83XMwPvexX7t5bqVCZqHVJCzZMuvf7/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=53868',
        },
        {
          name: 'Tezos Till I Bezos',
          url: 'https://teia.art/objkt/52405',
          src: 'https://cache.teia.rocks/ipfs/QmNwKk6qb1vp7pwpFqpjYk73FmYDfG2EEK43S5wYiHS45m/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=52405',
        },
        {
          name: 'Spring Rain',
          url: 'https://teia.art/objkt/60398',
          src: 'https://cache.teia.rocks/ipfs/QmcpHbbR43vX2iTCQu76VR7E2LQFsP2E259yhzwT6TMRoT/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=60398',
        },
        {
          name: 'Summon The Unicorns',
          url: 'https://teia.art/objkt/45702',
          src: 'https://cache.teia.rocks/ipfs/QmUGzoisiAcH6BdsGDgdXyuvPiLu5mTyYDH2JULjNGxw7o/?creator=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&viewer=tz1SLpSREWeSSdHhMTVgt1ygi9pkgeBZFGRG&objkt=45702',
        },
      ],
    },
    {
      name: 'Youtube',
      type: 'youtube',
      description: 'Youtube Playlists',
      playlist: [
        {
          name: 'LAWNZ - decentralized social media - Season 1',
          url: 'https://www.youtube.com/watch?v=6nPyhN91DXs&list=PLMrGa3-RIUa40FoUc4s62DUiN4_HNcRUq',
          src: 'https://www.youtube.com/embed/6nPyhN91DXs?list=PLMrGa3-RIUa40FoUc4s62DUiN4_HNcRUq',
        },
      ],
    },
  ]

  const index = keyBy(data, 'id')
  const get = (id: string) => index[id]

  return { index, data, get }
}

export const DankVision = () => {
  const collapsed = useLocalState('dankvision-collapsed', true)
  const channel = useLocalState('dankvision-channel', 0)
  const autoplay = useLocalState('dankvision-autoplay', true)
  const index = useLocalState('dankvision-index', 0)

  const channels = useDankvisionChannels()

  const vision = channels.data[channel.state]

  const show = vision?.playlist[index.state]

  if (!show) return <div>error!</div>

  return (
    <WidgetContainer width="600px">
      <WidgetBadge
        name={collapsed.state ? 'd' : 'dank.vision'}
        onClick={() => collapsed.toggle()}
      />
      <WidgetBody collapsed={collapsed.state}>
        <FlexRow
          alignItems="center"
          justifyContent="space-between"
          gap="0.5rem"
        >
          <Button
            size="small"
            disabled={channel.state === 0}
            onClick={() => {
              index.set(0)
              channel.set(channel.state - 1)
            }}
          >
            back
          </Button>
          <P>{vision?.description}</P>
          <Button
            size="small"
            disabled={channel.state === channels.data.length - 1}
            onClick={() => {
              index.set(0)
              channel.set(channel.state + 1)
            }}
          >
            next
          </Button>
        </FlexRow>
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
              loading...
              {/* <P>todo: tv static. random things. </P> */}
            </Grid>
            {!collapsed.state && show && (
              <iframe
                key={show.src}
                style={{
                  backgroundColor: 'var(--trans-black-2)',
                  gridArea: '1/1/1/1',
                }}
                width="600"
                height="420"
                src={`${show.src}${
                  collapsed.state ? '' : autoplay.state ? '&autoplay=1' : ''
                }`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
          </Grid>
        </FlexRow>
        <FlexRow
          alignItems="center"
          gap="0.5rem"
          justifyContent="space-between"
          overflowY="hidden"
          padding="0.5rem"
          position="relative"
        >
          <Button
            size="small"
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

          {show.name && (
            <P key={show.name} animation="slideUp 0.5s ease-out">
              {show.name}
            </P>
          )}
          <Button
            size="small"
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
        {/* <Divider /> */}
        {/* <FlexRow justifyContent="space-between">
          <Flex alignItems="center" gap="0.5rem">
            <Checkbox
              id="autoplay"
              checked={autoplay.state}
              onChange={() => autoplay.toggle()}
            />
            <label htmlFor="autoplay">Autoplay</label>
          </Flex>
        </FlexRow> */}
      </WidgetBody>
    </WidgetContainer>
  )
}
