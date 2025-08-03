import { Box, Grid } from '@/lib'
import { WidgetBadge } from './WidgetBadge'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { UserChip } from '../UserChip'
import { useHotkey } from '@/lib/hooks/api/useHotkey'

export const UserContainer = () => {
  const collapsed = useLocalState('user-container-collapsed', true)
  useHotkey(
    (e) => e.key === 'u' && (e.ctrlKey || e.metaKey),
    collapsed.toggle,
    [collapsed.state],
  )

  return (
    <Grid
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      transition="all 0.3s ease-in-out"
      borderColor="var(--brand-3)"
      borderRadius="1rem"
      borderStyle="dashed"
      pointerEvents="none"
      borderWidth={collapsed.state ? '0px' : '2px'}
    >
      <Grid
        background="var(--trans-black-1)"
        width="100%"
        height="100%"
        transition="all 0.3s ease-in-out"
        opacity={collapsed.state ? 0 : 1}
        pointerEvents={collapsed.state ? 'none' : 'auto'}
      >
        <Box margin="auto">
          <UserChip />
        </Box>
      </Grid>
      <Box position="absolute" bottom="6rem" left="0" textAlign="right">
        <WidgetBadge
          name={collapsed.state ? 'u' : 'user'}
          onClick={() => collapsed.toggle()}
          backgroundColor="var(--brand-3)"
          // variant vs abstracted component
          textStyle={{
            color: collapsed.state ? 'var(--brand-3)' : 'white',
          }}
        />
      </Box>
    </Grid>
  )
}
