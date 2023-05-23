import type { QTableProps } from 'quasar'

export type QuasarTableCol = NonNullable<QTableProps['columns']>[number]

export interface QuasarRef {
  $el: HTMLElement | null
}
