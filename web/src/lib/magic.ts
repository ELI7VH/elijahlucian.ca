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

export const toAudioDuration = (seconds: number) => {
  const mm = Math.floor(seconds / 60)
  const ss = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')

  return `${mm}:${ss}`
}

export const now = () => new Date()

export const toFormat = (date: Date | string) =>
  format(new Date(date), 'yyyy-MM-dd HH:mm:ss')
export const toHuman = (date?: Date | string) =>
  date ? format(new Date(date), 'MMM d, yyyy h:mm:ss a') : '-'
export const to12h = (date: Date | string) =>
  format(new Date(date), 'h:mm:ss a')
export const to24h = (date: Date | string) => format(new Date(date), 'HH:mm:ss')

export const toRelative = (date: Date | string) => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  })
}
export const toUnix = (date: Date | string) =>
  Math.floor(new Date(date).getTime() / 1000)

export const fromISO = (iso: string) => new Date(iso)
export const fromUnix = (unix: number) => new Date(unix * 1000)

export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

// file size shit

export const toKb = (bytes: number) => Math.round((bytes / 1024) * 100) / 100
export const toMb = (bytes: number) =>
  Math.round((bytes / 1024 / 1024) * 100) / 100

export const toGb = (bytes: number) =>
  // Math.round(bytes / 1024 / 1024 / 1024)
  Math.round((bytes / 1024 / 1024 / 1024) * 100) / 100

export const toMaxDenom = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${toKb(bytes)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${toMb(bytes)} MB`
  return `${toGb(bytes)} GB`
}
