import { Button, Grid, H3 } from '@/lib'

type ConfirmBoxProps = {
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmBox = ({ onConfirm, onCancel }: ConfirmBoxProps) => {
  return (
    <Grid padding="1rem">
      <H3>!</H3>
      <H3>?</H3>
      <Button variant="text" size="small" onClick={onCancel}>
        𝒙
      </Button>
      <Button variant="text" size="small" onClick={onConfirm}>
        ✓
      </Button>
    </Grid>
  )
}
