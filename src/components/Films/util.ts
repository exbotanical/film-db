import { FilmType, type UpsertFilmDto } from '@/types'

export const defaultFilmModel = (): UpsertFilmDto => ({
  title: '',
  comments: '',
  watchDates: [],
  type: FilmType.MOVIE,
})
