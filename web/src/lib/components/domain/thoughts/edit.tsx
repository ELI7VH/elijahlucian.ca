import { useSearchParams } from '@/lib/hooks'
import { useThought } from '@/lib/hooks/api/useThoughts'
import { Grid } from '../../layout/Grid'
import { Button } from '../../elements/Button'
import { Flex, FlexRow } from '../../layout/Flex'
import { P } from '../../typography/P'
import { useForm } from 'react-hook-form'

export const ThoughtEdit = () => {
  const sp = useSearchParams()
  const thoughtId = sp.get('thoughtId')
  const thought = useThought(thoughtId)

  const form = useForm({
    values: thought.data,
  })

  if (thought.isLoading) return <P>loading...</P>
  if (!thoughtId) return null

  const handleUpdate = async (values: any) => {
    thought.update(values)
  }

  return (
    <Grid gap="1rem">
      <form onSubmit={form.handleSubmit(handleUpdate)}>
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
          <input {...form.register('title')} />
          <textarea
            rows={6}
            style={{
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              padding: '0.5rem 0.75rem',
            }}
            {...form.register('text')}
          />
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
