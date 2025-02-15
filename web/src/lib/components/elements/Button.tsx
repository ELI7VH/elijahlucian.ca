type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ ...props }: Props) => {
  return <button {...props} style={{ pointerEvents: 'all' }} />
}
