import { Box, Button, Divider, Grid } from '@/lib'

import { FlexCol, FlexRow, P } from '@/lib'
import { useHotkeyMap } from '@/lib/hooks/api/useHotkeyMap'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { toRelative } from '@/lib/magic'
import { Filter } from 'bad-words'

type Props = {
  id: string
  title: string
  text: string
  createdAt: string
  onPin?: () => void
  onPrev?: () => void
  onNext?: () => void
  pinned?: boolean
  highlight?: boolean
}

export const Bub3 = ({
  id,
  title,
  text,
  createdAt,
  onPin,
  onPrev,
  onNext,
  pinned,
  highlight,
}: Props) => {
  const filter = new Filter({ placeHolder: 'x' })
  const size = useLocalState('bub3-size', 1)

  // todo: scale to new size.
  // todo: replace swears with the cool dos shit
  // todo: grow upwards to full size.
  // todo: generative ambience background.
  // like noise or smth. but maybe time / music based. (component)
  // as in the component is the generative ambience background component.

  useHotkeyMap({
    mappings: [
      [
        (e) => e.key === '+' && e.shiftKey,
        () => {
          if (size.state >= 3) return
          size.set(size.state + 0.1)
        },
      ],
      [
        (e) => e.key === '_' && e.shiftKey,
        () => {
          if (size.state <= 0.5) return
          size.set(size.state - 0.1)
        },
      ],
      [
        (e) => e.key === '=',
        () => {
          size.set(1)
        },
      ],
    ],
    deps: [size.state],
  })

  return (
    <FlexRow
      key={id}
      gap="0.5rem"
      padding="1rem 1rem"
      alignItems="center"
      maxWidth="50vw"
      minWidth="50vw"
      fontSize={`${size.state}rem`}
      textWrap="pretty"
      justifyContent="space-between"
      background={highlight ? 'rgba(255,255,255,0.1)' : 'var(--brand-1)'}
      boxShadow="0.5rem 0.5rem 0 0 rgba(0, 0, 0, 0.9)"
      // transform={`scale(${size.state})`}
    >
      <FlexCol gap="1rem" width="100%">
        <FlexRow>
          {title && (
            <P
              color="var(--text-muted)"
              textTransform="uppercase"
              fontWeight="light"
              background="#000"
              padding="0.25rem 0.5rem"
            >
              {title}
            </P>
          )}
        </FlexRow>
        <Divider />
        <FlexRow gap="1rem" textShadow="1px 1px 1px var(--text-dark-muted)">
          <Box>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
              }}
            >
              {filter.clean(text)}
            </pre>
          </Box>
        </FlexRow>
        <Divider />
        <Grid gridTemplateColumns="1fr 1fr 1fr" gap="0.25rem">
          <FlexRow></FlexRow>
          <FlexRow gap="0.25rem" justifyContent="center">
            {/* todo: controls component */}
            <Button
              variant="text"
              size="small"
              onClick={onPrev}
              disabled={!onPrev}
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
              variant={pinned ? 'highlighted' : 'text'}
              size="small"
              onClick={onPin}
            >
              {pinned ? '⩘' : '⩗'}
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={onNext}
              disabled={!onNext}
            >
              <span
                style={{
                  display: 'inline-block',
                }}
              >
                ➢
              </span>
            </Button>
          </FlexRow>
          <FlexRow justifyContent="flex-end">
            <P color="var(--text-dark-muted)" fontSize="0.75rem">
              {toRelative(createdAt)}
            </P>
          </FlexRow>
        </Grid>
      </FlexCol>
    </FlexRow>
  )
}
