import { Box, FlexCol, FlexProps, FlexRow, Grid } from '@/lib'

type Props = {
  collapsed: boolean
} & FlexProps

export const WidgetBody = ({
  children,
  collapsed = false,
  width,
  ...props
}: Props) => {
  return (
    <FlexRow padding="1rem">
      <Grid>
        <FlexCol
          gridArea="1 / 1 / 2 / 2"
          pointerEvents="all"
          gap="0.5rem"
          backgroundColor="var(--brand-1)"
          // bg="background-image-tex"
          opacity={0.5}
          _hover={{
            opacity: 1,
          }}
          transition="all 0.2s ease-in-out"
          overflow={collapsed ? 'hidden' : 'visible'}
          width={collapsed ? '1px' : width}
          height={collapsed ? '1px' : 'auto'}
          borderRadius="1rem"
          padding={collapsed ? '0' : '1rem 1rem'}
          {...props}
        >
          {children}
        </FlexCol>
        <Box
          gridArea="1 / 1 / 2 / 2"
          backgroundImage="var(--background-image-tex)"
          opacity={0.5}
        ></Box>
      </Grid>
    </FlexRow>
  )
}
