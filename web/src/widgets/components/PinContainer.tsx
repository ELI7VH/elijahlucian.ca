import { Box, FlexCol, FlexRow, P } from '@/lib'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './WidgetBadge'
import { usePinned } from '@/lib/hooks/api/usePinned'
import { useHotkey } from '@/lib/hooks/api/useHotkey'

export const PinContainer = () => {
  const expanded = useLocalState('pin-container-expanded', false)
  const pinned = usePinned()
  const selectedId = useLocalState('pin-container-selected-id', '')
  const pin = pinned.data?.find((pin) => pin.id === selectedId.state)

  useHotkey(
    (e) => e.key === 'p' && (e.ctrlKey || e.metaKey),
    expanded.toggle,
    [expanded.state],
    () => {
      expanded.set(false)
    },
  )

  return (
    <FlexCol
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      overflow="hidden"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      pointerEvents={expanded.state ? 'auto' : 'none'}
      background={expanded.state ? 'var(--trans-black-1)' : 'transparent'}
      transition="all 0.3s ease-in-out"
      gap="1rem"
    >
      <WidgetBadge
        left="0"
        bottom="2rem"
        top="auto"
        backgroundColor="var(--brand-6)"
        textStyle={{
          color: expanded.state ? 'white' : 'var(--brand-6)',
        }}
        name={expanded.state ? 'Pins' : 'P'}
        onClick={() => {
          expanded.set(!expanded.state)
        }}
      />
      <FlexRow gap="0.5rem" flexWrap="wrap">
        {pinned.data?.map((pin) => (
          <Box
            key={pin.id}
            opacity={expanded.state ? 1 : 0}
            border="1px solid var(--brand-1)"
            background="#000"
            borderRadius="0.5rem"
            padding="0.5rem"
            cursor="pointer"
            userSelect="none"
            onClick={() => {
              selectedId.set(pin.id)
            }}
          >
            <div title={pin.text}>
              <P>{pin.title?.slice(0)}</P>
            </div>
          </Box>
        ))}
      </FlexRow>
      {pin && (
        <Box
          background="#000"
          border="1px solid var(--brand-1)"
          borderRadius="0.5rem"
          padding="0.5rem"
          maxWidth="500px"
          opacity={expanded.state ? 1 : 0}
        >
          <P>{pin.title}</P>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            <P>{pin.text}</P>
          </pre>
        </Box>
      )}
    </FlexCol>
  )
}
