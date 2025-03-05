import { Button, Flex, Grid, H3, Section, useToast } from '@/lib'
import { PlaylistWidget } from '@/widgets/PlaylistWidget'
import { SongInfo } from '@/widgets/SongInfo'
import { ThoughtAggregatorModule } from '@/widgets/ThoughtAggregatorModule'
import { UserChip } from '@/widgets/UserChip'

export const Home = () => {
  const { toast, toasts } = useToast()

  return (
    <Section width="100%">
      <Grid
        maxWidth="100%"
        gridTemplateColumns="repeat(auto-fill, minmax(20rem, 1fr))"
        gap="1rem"
      >
        <Flex gap="1rem" flexDirection="column">
          <Button
            onClick={() => {
              toast('Toast message 1!')
              setTimeout(() => {
                toast('Toast message 2!', 'success')
              }, 500)
              setTimeout(() => {
                toast('Toast message 3!', 'warning')
              }, 1000)
              setTimeout(() => {
                toast('Toast message 4!', 'error')
              }, 1500)
            }}
          >
            Test Multiple Toasts
          </Button>

          <H3>Active Toast Count: {toasts?.length}</H3>
          <UserChip />
          <PlaylistWidget />
          <SongInfo />
        </Flex>

        <Grid gap="1rem">
          <ThoughtAggregatorModule />
        </Grid>
      </Grid>
    </Section>
  )
}
