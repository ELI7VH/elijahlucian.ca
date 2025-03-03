import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetContainer } from './components/WidgetContainer'
import { FlexCol } from '@/lib/components/layout/Flex'
import { WidgetBody } from './components/WidgetBody'
import { FlexRow } from '@/lib/components/layout/Flex'
import { P } from '@/lib/components/typography/P'
import { useThoughts } from '@/lib/hooks/api/useThoughts'
import { useToast } from '@/lib/hooks/useToast'
import { Toast } from '@/lib/components/elements/Toast'
import { Button } from '@/lib/components/elements/Button'
import { TextArea } from '@/lib/components/form/TextArea'
import { Divider, Grid, Input, Json } from '@/lib'
import { toRelative } from '@/lib/magic'

export const ThoughtAggregatorModule = () => {
  const collapsed = useLocalState('thought-aggregator-collapsed', true)
  const thoughts = useThoughts()
  const toast = useToast()

  const handleSubmit = thoughts.form.handleSubmit(async (values) => {
    console.log(values)
    await thoughts.create.mutateAsync(values)
    thoughts.form.reset()
    toast.toast('Thought created')
  })

  return (
    <WidgetContainer>
      <WidgetBadge
        name={collapsed.state ? 't' : 't.a.m'}
        onClick={() => collapsed.toggle()}
      />
      <WidgetBody collapsed={collapsed.state} background="background-image-2">
        <FlexCol gap="0.5rem">
          {/* <Json data={thoughts.data} />
          <Json data={thoughts.form.values} /> */}
          <Divider />
          {thoughts.data?.map((thought) => (
            <FlexRow
              key={thought.id}
              gap="0.5rem"
              alignItems="center"
              justifyContent="space-between"
            >
              <FlexCol gap="0.25rem">
                <FlexRow gap="0.25rem">
                  {thought.title && <P>{thought.title}</P>}
                  <P>{thought.text}</P>
                </FlexRow>
                <FlexRow gap="0.25rem" justifyContent="flex-end">
                  <P color="var(--text-dark-muted)">
                    {toRelative(thought.createdAt)}
                  </P>
                </FlexRow>
              </FlexCol>
              <Button
                variant="ghost"
                size="small"
                onClick={() => thoughts.destroy.mutateAsync(thought.id)}
              >
                x
              </Button>
            </FlexRow>
          ))}
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid gap="0.5rem">
              <Input {...thoughts.form.bind('title')} />
              <TextArea
                placeholder="Thought"
                {...thoughts.form.bind('text')}
                onSubmit={handleSubmit}
              />
              <FlexRow justifyContent="flex-end">
                <Button variant="ghost" size="small" type="submit">
                  Submit
                </Button>
              </FlexRow>
            </Grid>
          </form>
          <Toast>{toast.message}</Toast>
        </FlexCol>
      </WidgetBody>
    </WidgetContainer>
  )
}
