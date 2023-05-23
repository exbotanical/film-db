import type { UUID, UnixTimeStamp, DateString } from '.'

export interface Film {
  id: UUID
  title: string
  createdAt: UnixTimeStamp
  updatedAt: UnixTimeStamp
  watchDates: DateString[]
  comments?: string
}

export type UpsertFilmDto = Omit<Film, 'createdAt' | 'id' | 'updatedAt'>
