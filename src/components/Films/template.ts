import type { QuasarTableCol } from '@/plugins/quasar/types'
import { toReadableDate } from '@/utils'

export const tableColumns: (QuasarTableCol & { compute?: boolean })[] = [
  {
    field: 'title',
    align: 'left',
    label: 'Title',
    name: 'title_key',
    compute: true,
  },
  {
    field: 'comments',
    align: 'left',
    label: 'Comments',
    name: 'comments_key',
    compute: true,
  },
  {
    field: 'createdAt',
    align: 'right',
    label: 'Created',
    name: 'created_key',
    format: toReadableDate,
    compute: true,
  },
  {
    field: 'updatedAt',
    align: 'right',
    label: 'Updated',
    name: 'updated_key',
    format: toReadableDate,
    compute: true,
  },
  {
    field: 'watchDates',
    label: 'Watch Dates',
    name: 'watchDates_key',
    format: (v, r) => v.join(', '),
    compute: true,
  },
  {
    field: 'spacer',
    label: '',
    name: 'spacer_key',
    style: 'width: 99%',
  },
]

export const addColumns: QuasarTableCol[] = [
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
    field: 'actions',
    label: '',
    name: 'actions_key',
  },
].map(v => ({ align: 'left', ...v }))
