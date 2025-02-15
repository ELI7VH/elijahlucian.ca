import { Flex, FlexCol, Grid } from '@/lib'
import { PropsWithChildren } from 'react'

export const WidgetContainer = ({ children }: PropsWithChildren) => {
  // user can place shit in the container
  // load user widgets from local storage

  return (
    <Grid
      position="absolute"
      pointerEvents="none"
      top="0"
      left="0"
      right="0"
      bottom="0"
      padding="1rem"
      // borderColor="var(--brand-1)"
      // borderRadius="1rem"
      // borderWidth="2px"
      // borderStyle="dashed"
    >
      <FlexCol>{children}</FlexCol>
    </Grid>
  )
}
