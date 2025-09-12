import { Box, FlexCol } from '@/lib'
import { Grid } from '@/lib/components/layout/Grid'
import { useLocalState } from '@/lib/hooks/useLocalState'
import { WidgetBadge } from './components/WidgetBadge'
import { useHotkey } from '@/lib/hooks/api/useHotkey'

type Props = {
  name: string
  color: string
  hotkey: string
  children: React.ReactNode
  i: number
}

export const BaseLayer = ({ name, children, color, hotkey, i }: Props) => {
  const collapsed = useLocalState(`base-layer-${name}-collapsed`, true)

  useHotkey({
    keycheck: (e) => e.key === hotkey && (e.ctrlKey || e.metaKey),
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
      borderRadius="1rem"
      borderStyle="dashed"
      pointerEvents="none"
      borderColor={collapsed.state ? 'transparent' : color}
      borderWidth={collapsed.state ? '0px' : '2px'}
      overflow="hidden"
    >
      <FlexCol
        padding={collapsed.state ? '0' : '1rem'}
        position="absolute"
        transition="all 0.3s ease-in-out"
        width={collapsed.state ? '1px' : '100%'}
        height={collapsed.state ? '1px' : '100%'}
        overflow="hidden"
      >
        {collapsed.state ? null : children}
      </FlexCol>
      <Box
        position="absolute"
        bottom={`${i * 2}rem`}
        left="0"
        textAlign="right"
      >
        <WidgetBadge
          name={collapsed.state ? name?.[0] : name}
          onClick={() => collapsed.toggle()}
          textStyle={{
            color: collapsed.state ? color : 'white',
          }}
        />
      </Box>
    </Grid>
  )
}
