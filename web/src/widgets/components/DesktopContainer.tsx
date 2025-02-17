import { Box, FlexCol, Grid } from '@/lib'
import { PropsWithChildren } from 'react'
import { WidgetBadge } from './WidgetBadge'
import { useLocalState } from '@/lib/hooks/useLocalState'

export const DesktopContainer = ({ children }: PropsWithChildren) => {
  // user can place shit in the container
  // load user widgets from local storage
  const collapsed = useLocalState('desktop-collapsed', false)

  return (
    <Grid
      position="absolute"
      pointerEvents="none"
      top="0"
      left="0"
      right="0"
      bottom="0"
      padding="1rem"
      borderColor="var(--brand-1)"
      borderRadius="1rem"
      borderWidth="2px"
      borderStyle="dashed"
    >
      <FlexCol
        position="absolute"
        overflow="hidden"
        transition="all 0.3s ease-in-out"
        width={collapsed.state ? '1px' : '100vw'}
        height={collapsed.state ? '1px' : '100vh'}
        // opacity={collapsed.state ? 0 : 1}
        // opacity={collapsed.state ? 0 : 1}
      >
        {children}
      </FlexCol>
      <Box position="absolute" bottom="2rem" left="0" textAlign="right">
        <WidgetBadge
          name={collapsed.state ? 'd' : 'Desktop'}
          onClick={() => {
            collapsed.toggle()
          }}
          color={collapsed.state ? 'var(--brand-1)' : 'white'}
          textStyle={{
            color: collapsed.state ? 'var(--brand-1)' : 'white',
          }}
        ></WidgetBadge>
      </Box>
    </Grid>
  )
}
