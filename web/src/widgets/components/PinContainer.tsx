import { Box, FlexRow, H1, P, useUserContext } from '@/lib'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './WidgetBadge'
export const PinContainer = () => {
  const user = useUserContext()
  const expanded = useLocalState('pin-container-expanded', false)

  return (
    <FlexRow
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      overflow="hidden"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      gap="0.5rem"
      pointerEvents={expanded.state ? 'auto' : 'none'}
      background={expanded.state ? 'var(--trans-black-1)' : 'transparent'}
      transition="all 0.3s ease-in-out"
    >
      <WidgetBadge
        left="0"
        bottom="2rem"
        top="auto"
        textStyle={{
          color: expanded.state ? 'white' : 'var(--brand-1)',
        }}
        name={expanded.state ? 'Pins' : 'P'}
        onClick={() => {
          expanded.set(!expanded.state)
        }}
      />

      {user?.user?.pinned.map((id) => (
        <Box
          key={id}
          opacity={expanded.state ? 1 : 0}
          border="1px solid var(--brand-1)"
          background="#000"
          borderRadius="0.5rem"
          padding="0.5rem"
          cursor="pointer"
          userSelect="none"
          // onClick={() => {
          //   user?.user?.unpin(pin)
          // }}
        >
          <P>{id.slice(-5)}</P>
        </Box>
      ))}
    </FlexRow>
  )
}
