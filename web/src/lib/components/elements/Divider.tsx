import { BoxProps } from '../layout/Box'

type Props = {} & BoxProps

export const Divider = (props: Props) => {
  return (
    <div
      style={{
        height: '2px',
        maxHeight: '2px',
        width: '100%',
        margin: '0',
        backgroundColor: 'var(--brand-1-dark)',
        ...props,
      }}
    />
  )
}
