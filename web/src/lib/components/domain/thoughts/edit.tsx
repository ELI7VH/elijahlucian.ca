import { useSearchParams } from '@/lib/hooks'
import { useThought } from '@/lib/hooks/api/useThoughts'
import { Grid } from '../../layout/Grid'
import { Input } from '../../form/Input'
import { TextArea } from '../../form/TextArea'
import { Button } from '../../elements/Button'
import { Flex, FlexRow } from '../../layout/Flex'
import { P } from '../../typography/P'

export const ThoughtEdit = () => {
  const sp = useSearchParams()
  const thoughtId = sp.get('thoughtId')
  const thought = useThought(thoughtId)

  if (thought.isLoading) return <P>loading...</P>
  if (!thoughtId) return null

  const handleUpdate = thought.form.handleSubmit(async (values) => {
    thought.update(values)
  })

  return (
    <Grid gap="1rem">
      <form onSubmit={handleUpdate}>
        <Grid gap="0.5rem">
          <Flex
            background="var(--trans-black-2)"
            alignItems="center"
            padding="0.25rem 0.5rem"
            justifyContent="space-between"
          >
            <P color="var(--text-light-muted)" fontSize="0.5rem">
              editing: {thoughtId}
            </P>
            <Button
              variant="text"
              size="small"
              onClick={() => sp.set('thoughtId')}
            >
              𝔁
            </Button>
          </Flex>
          <Input {...thought.form.register('title')} />
          <TextArea {...thought.form.register('text')} />
          <FlexRow justifyContent="space-between">
            <Button
              variant="text"
              size="small"
              onClick={async () => {
                const confirmed = await confirm(
                  'Are you sure you want to delete this thought?',
                )
                if (!confirmed) return

                await thought.destroy()
                sp.set('thoughtId')
              }}
            >
              ✌︎
            </Button>
            <Button variant="text" size="small" type="submit">
              Save
            </Button>
          </FlexRow>
        </Grid>
      </form>
    </Grid>
  )
}
