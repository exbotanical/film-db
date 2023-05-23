import type { QTableProps } from 'quasar'

export type QuasarTableCol = NonNullable<QTableProps['columns']>[number]

export type QuasarRef = {
  $el: HTMLElement | null
}
