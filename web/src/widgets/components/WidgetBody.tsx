import { FlexCol, FlexProps, FlexRow } from '@/lib'

type Props = {
  collapsed: boolean
} & FlexProps

export const WidgetBody = ({
  children,
  collapsed = false,
  ...props
}: Props) => {
  return (
    <FlexRow padding="1rem">
      <FlexCol
        pointerEvents="all"
        gap="0.5rem"
        backgroundColor="var(--brand-1)"
        opacity={0.5}
        _hover={{
          opacity: 1,
        }}
        transition="all 0.2s ease-in-out"
        overflow={collapsed ? 'hidden' : 'visible'}
        width={collapsed ? '1px' : 'auto'}
        height={collapsed ? '1px' : 'auto'}
        borderRadius="1rem"
        padding={collapsed ? '0' : '1rem'}
        {...props}
      >
        {children}
      </FlexCol>
    </FlexRow>
  )
}
