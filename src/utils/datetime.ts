import { UnixTimeStamp } from '@/types'

export function toReadableDate(ts: UnixTimeStamp) {
  if (!ts) {
    return null
  }

  return new Date(ts).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function diffFromNowInSecs(ts: UnixTimeStamp) {
  return Math.floor((Date.now() - ts) / 1000)
}
