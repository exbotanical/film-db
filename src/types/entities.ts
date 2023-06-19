import { NumericRange } from './util'

import type { UUID, UnixTimeStamp, DateString } from '.'

export enum FilmType {
  'MOVIE' = 0,
  'SHOW' = 1,
}

export interface Film {
  id: UUID
  title: string
  createdAt: UnixTimeStamp
  updatedAt: UnixTimeStamp
  watchDates: DateString[]
  type: FilmType
  rating?: NumericRange<1, 10>
  comments?: string
}

export type UpsertFilmDto = Omit<Film, 'createdAt' | 'id' | 'updatedAt'>
