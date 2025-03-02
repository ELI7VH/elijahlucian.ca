import { format, formatDistance } from 'date-fns'
import { InlineDivStyle } from './types'

export const toCssVar = (name?: string) => (name ? `var(--${name})` : undefined)

export const dankStylez = (props: InlineDivStyle) => {
  return {
    background: toCssVar(props.bg),
    color: toCssVar(props.col),
    ...props,
  }
}

export const now = () => new Date()

export const toFormat = (date: Date | string) =>
  format(new Date(date), 'yyyy-MM-dd HH:mm:ss')
export const toHuman = (date: Date | string) =>
  format(new Date(date), 'MMM d, yyyy h:mm:ss a')
export const to12h = (date: Date | string) =>
  format(new Date(date), 'h:mm:ss a')
export const to24h = (date: Date | string) => format(new Date(date), 'HH:mm:ss')

export const toRelative = (date: Date | string) => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  })
}
