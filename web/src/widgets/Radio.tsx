import { Box, Button, Flex, FlexRow, Grid, Json } from '@/lib'
import { Tooltip } from '@/lib/components/widgets/Tooltip'
import { useSongs } from '@/lib/hooks/api/useSongs'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { Rando } from '@dank-inc/numbaz'
import { SongPlayer } from './SongPlayer'

export const Radio = () => {
  const songs = useSongs()

  const index = useLocalState('radio-index', 0)

  if (songs.isLoading) return <div>Loading...</div>
  if (songs.error) return <div>Error: {songs.error.message}</div>

  if (!songs.data) return <div>no data?</div>

  // todo: generate playlist - save seed to local storage

  const selected = songs.data[index.state]

  return (
    <Box padding="1rem">
      <Grid>
        <FlexRow
          justifyContent="space-between"
          padding="1rem"
          fontSize="0.5rem"
        >
          <Box>{songs.data?.length} songs</Box>
          <Tooltip text={<Json data={selected} />}>
            <Flex gap="1rem">
              <Box>
                [{index.state}/{songs.data.length}]{' '}
              </Box>
              <Box>{selected?.originalFilename || selected?.name}</Box>
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
            Random
          </Button>
          <FlexRow>
            <Button onClick={() => index.set(index.state - 1)}>Prev</Button>
            <Button onClick={() => index.set(index.state + 1)}>Next</Button>
          </FlexRow>
        </FlexRow>
      </Grid>
    </Box>
  )
}
