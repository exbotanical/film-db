import { UpsertFilmDto } from '@/types'

export const defaultFilmModel = (): UpsertFilmDto => ({
  title: '',
  comments: '',
  watchDates: [],
})
