import { FlexCol, P } from '@/lib'
import { useLocalState } from '@/lib/hooks/useLocalState'

export const PinContainer = () => {
  const pins = useLocalState<string[]>('pins', [])

  // <P>PinContainer</P>
  // show users pins on this layer

  return (
    <FlexCol>
      {pins.state.map((pin) => (
        <P key={pin}>{pin}</P>
      ))}
    </FlexCol>
  )
}
