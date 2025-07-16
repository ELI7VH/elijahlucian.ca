import { Box, Grid } from '@/lib'
import { useForm } from 'react-hook-form'

export const Scan = () => {
  const form = useForm()

  // todo. let people scan their galaxies

  return (
    <Grid height="100vh">
      <Box margin="auto">Scan</Box>
    </Grid>
  )
}
