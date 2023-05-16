import type { UUID, UnixTimeStamp } from '.'

export interface Film {
  id: UUID
  title: string
  createdAt: UnixTimeStamp
  updatedAt: UnixTimeStamp
  watchDates: UnixTimeStamp[]
  comments?: string
}

export type CreateFilmDto = Omit<Film, 'id' | 'createdAt' | 'updatedAt'>
