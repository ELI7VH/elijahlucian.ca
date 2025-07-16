import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetContainer } from './components/WidgetContainer'
import { FlexCol } from '@/lib/components/layout/Flex'
import { WidgetBody } from './components/WidgetBody'
import { FlexRow } from '@/lib/components/layout/Flex'
import { P } from '@/lib/components/typography/P'
import { useThoughts } from '@/lib/hooks/api/useThoughts'
import { Button } from '@/lib/components/elements/Button'
import { Box, Divider, Grid, useSearchParams } from '@/lib'
import { toRelative } from '@/lib/magic'
import { Filter } from 'bad-words'
import { ThoughtEdit } from '@/lib/components/domain/thoughts/edit'
import { ThoughtCreate } from '@/lib/components/domain/thoughts/create'

export const ThoughtAggregatorModule = () => {
  const sp = useSearchParams()
  const collapsed = useLocalState('thought-aggregator-collapsed', true)
  const thoughts = useThoughts()

  const filter = new Filter({ placeHolder: 'x' })
  const thoughtId = sp.get('thoughtId')

  return (
    <WidgetContainer maxWidth="500px">
      <WidgetBadge
        name={collapsed.state ? 't' : 't.a.m'}
        onClick={() => collapsed.toggle()}
      />
      <WidgetBody collapsed={collapsed.state} background="background-image-2">
        <FlexCol gap="0.5rem">
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
                _hover={{
                  background: 'rgba(0,0,0,0.1)',
                }}
              >
                <FlexCol gap="0.25rem" width="100%">
                  <FlexRow
                    gap="1rem"
                    textShadow="1px 1px 1px var(--text-dark-muted)"
                  >
                    {thought.title && (
                      <Box
                        color="var(--text-muted)"
                        textTransform="uppercase"
                        fontWeight="light"
                        background="#000"
                        padding="0.25rem 0.5rem"
                        cursor="pointer"
                        onClick={() => {
                          sp.set('thought-title', thought.title)
                        }}
                      >
                        {thought.title}
                      </Box>
                    )}
                    <P lineBreak="anywhere">{filter.clean(thought.text)}</P>
                  </FlexRow>
                  <FlexRow gap="0.25rem" justifyContent="flex-end">
                    <P color="var(--text-dark-muted)" fontSize="0.75rem">
                      {toRelative(thought.createdAt)}
                    </P>
                  </FlexRow>
                </FlexCol>
                <FlexRow gap="0.25rem">
                  <Button
                    variant="text"
                    size="small"
                    type="submit"
                    onClick={() => {
                      sp.set('thoughtId', thought.id)
                    }}
                  >
                    ✎
                  </Button>
                </FlexRow>
              </FlexRow>
            ))}
          </Grid>
          <Divider />
          {thoughtId ? (
            <ThoughtEdit />
          ) : (
            <ThoughtCreate title={sp.get('thought-title')} />
          )}
        </FlexCol>
      </WidgetBody>
    </WidgetContainer>
  )
}
