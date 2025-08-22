import { Box, Divider, Grid, HotkeyButton } from '@/lib'

import { FlexCol, FlexRow, P } from '@/lib'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { toRelative } from '@/lib/magic'
import { Filter } from 'bad-words'
import { useEffect, useState } from 'react'

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
  onStart?: () => void
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
  onStart,
}: Props) => {
  const filter = new Filter({ placeHolder: 'x' })
  const size = useLocalState('bub3-size', 1)
  const [started, setStarted] = useState(false)

  // todo: scale to new size.
  // todo: replace swears with the cool dos shit
  // todo: grow upwards to full size.
  // todo: generative ambience background.
  // like noise or smth. but maybe time / music based. (component)
  // as in the component is the generative ambience background component.

  useEffect(() => {
    onStart?.()
    setStarted(true)
  }, [])

  return (
    <FlexRow
      // key={id}
      opacity={started ? 1 : 0}
      transition="all 0.5s ease-in"
      gap="0.5rem"
      padding="1rem"
      alignItems="center"
      maxWidth="100%"
      minWidth="600px"
      fontSize={`${size.state}rem`}
      textWrap="pretty"
      justifyContent="space-between"
      background={highlight ? 'rgba(255,255,255,0.1)' : 'var(--brand-1)'}
      boxShadow="0.5rem 0.5rem 0 0 rgba(0, 0, 0, 0.9)"
      // transform={`scale(${size.state})`}
    >
      <FlexCol gap="1rem" width="100%">
        <FlexRow gap="1rem" justifyContent="space-between">
          <P
            key={`bub3-title-${id}`}
            color="var(--text-muted)"
            textTransform="uppercase"
            fontWeight="light"
            background="#000"
            padding="0.25rem 0.5rem"
          >
            {title || '🂧'}
          </P>
          <HotkeyButton
            variant={pinned ? 'highlighted' : 'text'}
            size="small"
            onClick={onPin}
            hotkey={(e) => e.key === '|' && e.shiftKey}
            hotkeyLabel="Pin (shift + |)"
          >
            {pinned ? '⩘' : '⩗'}
          </HotkeyButton>
        </FlexRow>
        <Divider />
        <FlexRow gap="1rem" textShadow="1px 1px 1px var(--text-dark-muted)">
          <Box>
            <pre
              key={`bub3-text-${id}`}
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
          <FlexRow gap="0.25rem" justifyContent="flex-start">
            {/* Size controls */}
            <HotkeyButton
              size="small"
              onClick={() => {
                if (size.state <= 0.3) return
                size.set(size.state - 0.2)
              }}
              disabled={size.state <= 0.3}
              hotkey={(e) => e.key === '_' && e.shiftKey}
              hotkeyLabel="Decrease size (shift + _)"
            >
              -
            </HotkeyButton>
            <HotkeyButton
              size="small"
              onClick={() => size.set(1)}
              hotkey={(e) => e.key === '='}
              hotkeyLabel="Reset size (=)"
            >
              =
            </HotkeyButton>
            <HotkeyButton
              size="small"
              onClick={() => {
                if (size.state >= 3) return
                size.set(size.state + 0.2)
              }}
              disabled={size.state >= 3}
              hotkey={(e) => e.key === '+' && e.shiftKey}
              hotkeyLabel="Increase size (shift + +)"
            >
              +
            </HotkeyButton>
          </FlexRow>
          <FlexRow gap="0.25rem" justifyContent="center">
            {/* Navigation controls */}
            <HotkeyButton
              size="small"
              id="bub3-prev"
              key="bub3-prev"
              onClick={onPrev}
              disabled={!onPrev}
              hotkey={(e) => e.key === 'ArrowLeft' && e.shiftKey}
              hotkeyLabel="Previous (shift + left arrow)"
            >
              <span
                style={{
                  transform: 'scaleX(-1)',
                  display: 'inline-block',
                }}
              >
                ➢
              </span>
            </HotkeyButton>
            <HotkeyButton
              size="small"
              id="bub3-next"
              key="bub3-next"
              onClick={onNext}
              disabled={!onNext}
              hotkey={(e) => e.key === 'ArrowRight' && e.shiftKey}
              hotkeyLabel="Next (shift + right arrow)"
            >
              <span
                style={{
                  display: 'inline-block',
                }}
              >
                ➢
              </span>
            </HotkeyButton>
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
