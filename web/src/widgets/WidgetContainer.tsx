import { Grid } from '@/lib'
import { PropsWithChildren } from 'react'

export const WidgetContainer = ({ children }: PropsWithChildren) => {
  // user can place shit in the container
  // load user widgets from local storage

  return (
    <Grid
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      borderColor="var(--brand-1)"
      borderRadius="1rem"
      borderWidth="2px"
      borderStyle="dashed"
    >
      {children}
    </Grid>
  )
}
