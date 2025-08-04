import { Box, FlexCol, FlexProps, Grid } from '@/lib'

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
    <Grid padding="1rem" width={width}>
      <FlexCol
        gridArea="1 / 1 / 2 / 2"
        pointerEvents="all"
        gap="0.5rem"
        backgroundColor="var(--brand-1)"
        // bg="background-image-tex"
        _hover={{
          opacity: 1,
        }}
        transition="all 0.2s ease-in-out"
        overflow={collapsed ? 'hidden' : 'visible'}
        width={collapsed ? '1px' : width}
        height={collapsed ? '1px' : 'auto'}
        borderRadius="1rem"
        padding={collapsed ? '0' : '1rem 1rem'}
        boxShadow="var(--box-shadow-1)"
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
  )
}
