import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './components/WidgetBadge'
import { WidgetContainer } from './components/WidgetContainer'
import { Flex, FlexCol } from '@/lib/components/layout/Flex'
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
import { useState } from 'react'
import { uniq } from 'lodash'

export const ThoughtAggregatorModule = () => {
  const sp = useSearchParams()
  const collapsed = useLocalState('thought-aggregator-collapsed', true)
  const thoughts = useThoughts()

  const filter = new Filter({ placeHolder: 'x' })
  const thoughtId = sp.get('thoughtId')
  const title = sp.get('thought-title')

  const [i, setI] = useState(0)

  const filteredThoughts = thoughts.data?.filter(
    (thought) => !title || thought.title === title,
  )

  const pageSize = 3
  const pages = Math.ceil((filteredThoughts?.length ?? 0) / pageSize)

  return (
    <WidgetContainer maxWidth="500px">
      <WidgetBadge
        name={collapsed.state ? 't' : 't.a.m'}
        onClick={() => collapsed.toggle()}
      />
      <WidgetBody collapsed={collapsed.state}>
        <FlexCol gap="0.5rem">
          <Divider />
          <Flex justifyContent="space-between">
            <Button
              variant={i === 0 ? 'text' : 'ghost'}
              size="small"
              onClick={() => setI(i - 1)}
              disabled={i === 0}
            >
              Prev
            </Button>
            <P>
              {i + 1} / {pages}
            </P>
            <Button
              variant={i === pages - 1 ? 'text' : 'ghost'}
              size="small"
              onClick={() => setI(i + 1)}
              disabled={i === pages - 1}
            >
              Next
            </Button>
          </Flex>
          <Grid maxHeight="40vh" overflowY="auto" background="rgba(0,0,0,0.1)">
            {filteredThoughts?.slice(i * 3, (i + 1) * 3)?.map((thought, i) => (
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
          {thoughtId ? <ThoughtEdit /> : <ThoughtCreate title={title} />}
          <Divider />
          <Flex gap="0.5rem" flexWrap="wrap" justifyContent="space-between">
            <Flex>
              {uniq(thoughts.data?.map((thought) => thought.title))
                .filter(Boolean)
                .map((title, i) => (
                  <Box
                    background="var(--trans-black-2)"
                    _hover={{
                      background: 'var(--trans-black-1)',
                    }}
                    padding="0.25rem 0.5rem"
                    cursor="pointer"
                    onClick={() => {
                      sp.set('thought-title', title)
                      setI(0)
                    }}
                    key={`${title}-${i}`}
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                      title={title}
                    >
                      {title.slice(0, 1)}
                    </div>
                  </Box>
                ))}
            </Flex>
            <Button
              variant="text"
              size="small"
              onClick={() => {
                sp.rm('thought-title')
                setI(0)
              }}
            >
              clear
            </Button>
          </Flex>
        </FlexCol>
      </WidgetBody>
    </WidgetContainer>
  )
}
