import { FlexCol, Grid, H1 } from '@/lib'

type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export const Modal = ({ open, onClose, children, title }: Props) => {
  return (
    <Grid
      position="absolute"
      top="0"
      left="0"
      padding="3rem 6rem"
      width="100%"
      height="100%"
      display={open ? 'block' : 'none'}
      backgroundColor="rgba(0, 0, 0, 0.8)"
      justifyContent="center"
      alignItems="center"
      zIndex="100000"
      pointerEvents="all"
      onClick={onClose}
    >
      <FlexCol
        onClick={(e) => e.stopPropagation()}
        border="2px solid var(--gray-6)"
        backgroundColor="rgba(255, 255, 255, 0.1)"
        pointerEvents="all"
        padding="3rem"
        borderRadius="1rem"
        gap="1rem"
      >
        {title && <H1>{title}</H1>}
        {children}
      </FlexCol>
    </Grid>
  )
}
