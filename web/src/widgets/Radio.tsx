import {
  Box,
  Button,
  Flex,
  FlexCol,
  FlexRow,
  Grid,
  H1,
  Json,
  P,
  Pre,
} from '@/lib'
import { Tooltip } from '@/lib/components/widgets/Tooltip'
import { useSongs } from '@/lib/hooks/api/useSongs'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { Rando } from '@dank-inc/numbaz'
import { SongPlayer } from './SongPlayer'

export const Radio = () => {
  const songs = useSongs()
  const collapsed = useLocalState('radio-collapsed', false)

  const index = useLocalState('radio-index', 0)

  if (songs.isLoading) return <div>Loading...</div>
  if (songs.error) return <div>Error: {songs.error.message}</div>

  if (!songs.data) return <div>no data?</div>

  // todo: generate playlist - save seed to local storage
  // todo:

  const selected = songs.data[index.state]

  return (
    <Box position="relative">
      <Box
        position="absolute"
        top="0"
        left="0"
        height="2rem"
        width="2rem"
        pointerEvents="all"
        borderRadius="100%"
        backgroundColor="var(--brand-1)"
        cursor="pointer"
        userSelect="none"
        boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.5)"
        _hover={{
          backgroundColor: '#fff',
          color: '#000',
          opacity: 1,
        }}
        onClick={() => collapsed.toggle()}
        zIndex={1000}
      >
        <H1 position="absolute" left="7px" top="7px" fontSize="1.8rem">
          E
        </H1>
      </Box>

      <FlexRow padding="1rem">
        <FlexCol
          pointerEvents="all"
          gap="0.5rem"
          backgroundColor="var(--brand-1)"
          opacity={0.5}
          _hover={{
            opacity: 1,
          }}
          transition="all 0.2s ease-in-out"
          overflow={collapsed.state ? 'hidden' : 'visible'}
          width={collapsed.state ? '1px' : 'auto'}
          height={collapsed.state ? '1px' : 'auto'}
          borderRadius="1rem"
          padding={collapsed.state ? '0' : '1rem'}
        >
          <FlexRow justifyContent="space-between">
            <Tooltip
              text={
                <Grid gap="0.2rem">
                  {songs.data
                    .slice(index.state - 3, index.state + 4)
                    .map((s, i) =>
                      index.state - 3 + i === index.state ? (
                        <P
                          textAlign="center"
                          key={s.originalFilename}
                          backgroundColor={'var(--brand-2)'}
                          padding="0.2rem"
                          borderRadius="0.2rem"
                        >
                          {index.state - 5 + i}: {s.originalFilename}
                        </P>
                      ) : (
                        <Button
                          key={s.originalFilename}
                          onClick={() => index.set(index.state - 5 + i)}
                        >
                          {index.state - 5 + i}: {s.originalFilename}
                        </Button>
                      ),
                    )}
                </Grid>
              }
            >
              <Pre>
                [{index.state}/{songs.data.length}]
              </Pre>
            </Tooltip>
            <Tooltip text={<Json data={selected} />}>
              <Flex gap="1rem" justifyContent="space-between">
                <Pre>{selected?.originalFilename || selected?.name}</Pre>
              </Flex>
            </Tooltip>
          </FlexRow>
          <SongPlayer
            src={selected.link}
            onEnded={() => index.set(index.state + 1)}
          />
          <FlexRow gap="1rem" justifyContent="space-between">
            <Button
              onClick={() =>
                index.set(Math.floor(Rando.range(0, songs.data.length - 1)))
              }
            >
              <Pre>random</Pre>
            </Button>
            <FlexRow>
              <Button
                onClick={() =>
                  index.set(
                    index.state === 0 ? songs.data.length - 1 : index.state - 1,
                  )
                }
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
              <Button
                onClick={() =>
                  index.set(
                    index.state === songs.data.length - 1 ? 0 : index.state + 1,
                  )
                }
              >
                ➢
              </Button>
            </FlexRow>
          </FlexRow>
        </FlexCol>
      </FlexRow>
    </Box>
  )
}
