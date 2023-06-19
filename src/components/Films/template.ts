import type { QuasarTableCol } from '@/plugins/quasar/types'
import { FilmType } from '@/types'
import { toReadableDate } from '@/utils'

export const tableColumns: QuasarTableCol[] = [
  {
    field: 'title',
    align: 'left',
    label: 'Title',
    name: 'title_key',
  },
  {
    field: 'rating',
    align: 'right',
    label: 'Rating',
    name: 'rating_key',
  },
  {
    field: 'createdAt',
    align: 'right',
    label: 'Added',
    name: 'created_key',
    format: toReadableDate,
  },
]

export const addColumns: QuasarTableCol[] = [
  {
    field: 'type',
    label: 'Type',
    name: 'type_key',
  },
  {
    field: 'title',
    label: 'Title',
    name: 'title_key',
  },
  {
    field: 'watchDates',
    label: 'Watch Dates',
    name: 'watchDates_key',
  },
  {
    field: 'comments',
    label: 'Comments',
    name: 'comments_key',
  },
  {
    field: 'rating',
    label: 'Rating',
    name: 'rating_key',
  },
  {
    field: 'actions',
    label: '',
    name: 'actions_key',
  },
].map(v => ({ align: 'left', ...v }))

export const filmTypeOptions = [
  {
    label: 'Movie',
    value: FilmType.MOVIE,
  },
  {
    label: 'Show',
    value: FilmType.SHOW,
  },
]
