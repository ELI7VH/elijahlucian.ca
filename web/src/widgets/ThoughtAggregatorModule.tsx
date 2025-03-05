import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetContainer } from './components/WidgetContainer'
import { FlexCol } from '@/lib/components/layout/Flex'
import { WidgetBody } from './components/WidgetBody'
import { FlexRow } from '@/lib/components/layout/Flex'
import { P } from '@/lib/components/typography/P'
import { useThoughts } from '@/lib/hooks/api/useThoughts'
import { useToast } from '@/lib/hooks/useToast'
import { Button } from '@/lib/components/elements/Button'
import { TextArea } from '@/lib/components/form/TextArea'
import { Divider, Grid, Input, Json } from '@/lib'
import { toRelative } from '@/lib/magic'
import { Filter } from 'bad-words'

export const ThoughtAggregatorModule = () => {
  const collapsed = useLocalState('thought-aggregator-collapsed', true)
  const thoughts = useThoughts()
  const { toast } = useToast()
  const filter = new Filter({ placeHolder: 'x' })

  const handleSubmit = thoughts.form.handleSubmit(async (values) => {
    console.log(values)
    await thoughts.create.mutateAsync(values)
    thoughts.form.reset()
    toast('Thought created')
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
          <Grid
            maxHeight="40vh"
            overflowY="auto"
            background="rgba(0,0,0,0.1)"
            // padding="0.5rem"
          >
            {thoughts.data?.map((thought, i) => (
              <FlexRow
                key={thought.id}
                gap="0.5rem"
                padding="0.5rem 1rem"
                alignItems="center"
                justifyContent="space-between"
                background={
                  i === (thoughts.data?.length ?? 0) - 1
                    ? 'rgba(255,255,255,0.1)'
                    : ''
                }
              >
                <FlexCol gap="0.25rem">
                  <FlexRow
                    gap="1rem"
                    textShadow="1px 1px 1px var(--text-dark-muted)"
                  >
                    {thought.title && (
                      <P
                        color="var(--text-muted)"
                        textTransform="uppercase"
                        fontWeight="light"
                        background="#000"
                        padding="0.25rem 0.5rem"
                      >
                        {thought.title}
                      </P>
                    )}
                    <P>{filter.clean(thought.text)}</P>
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
                  onClick={() => {
                    thoughts.destroy.mutateAsync(thought.id)
                      .then(() => toast(`Thought deleted`, 'warning'))
                  }}
                >
                  x
                </Button>
              </FlexRow>
            ))}
          </Grid>
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
        </FlexCol>
      </WidgetBody>
    </WidgetContainer>
  )
}
