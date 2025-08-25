import { Box } from '@/lib'
import { Grid } from '@/lib'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './WidgetBadge'
import { useHotkey } from '@/lib/hooks/api/useHotkey'

export const GameContainer = () => {
  const collapsed = useLocalState('game-container-collapsed', true)
  useHotkey({
    keycheck: (e) => e.key === 'g' && (e.ctrlKey || e.metaKey),
    callback: collapsed.toggle,
    deps: [collapsed.state],
    onEscape: () => {
      collapsed.set(true)
    },
  })

  return (
    <Grid
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      transition="all 0.3s ease-in-out"
      borderColor="white"
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
        <Box margin="auto"></Box>
      </Grid>
      <Box position="absolute" bottom="8rem" left="0" textAlign="right">
        <WidgetBadge
          name={collapsed.state ? 'g' : 'game'}
          onClick={() => collapsed.toggle()}
          backgroundColor="white"
          // variant vs abstracted component
          textStyle={{
            color: collapsed.state ? 'white' : 'white',
          }}
        />
      </Box>
    </Grid>
  )
}
