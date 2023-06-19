import type { ComputedRef, Ref } from 'vue'

import type { QuasarRef } from '@/plugins/quasar/types'
import { preventDefaultBehavior } from '@/utils'

const noop = () => {}

/**
 * @param tableRef A ref container for the table ref value. Must have the same name as the `ref="X"` value in the table.
 * @param tableRows The table rows.
 * @param tableId The table id.
 * @param initialRowIndex The initial row index, relative to `tableRows`.
 * @param showCondition A flag indicating whether row drilldown should trigger any actions
 * @param onClick Hook for row click events
 * @param onDblClick Hook for row double-click events
 */
export function useTable<RowType extends Record<PropertyKey, any>>({
  tableRef,
  tableRows,
  tableId,
  initialRowIndex = 0,
  showCondition = true,
  onClick = noop,
  onDblClick = noop,
}: {
  tableRef: Ref<HTMLElement | null>
  tableRows: ComputedRef<RowType[]> | RowType[]
  tableId: string
  initialRowIndex?: number
  showCondition?: ComputedRef<boolean> | boolean
  onClick?: () => void
  onDblClick?: () => void
}) {
  // @see https://github.com/vuejs/core/issues/2136
  const selectedRowRef = ref(unref(tableRows)[initialRowIndex]) as Ref<
    RowType | undefined
  >

  const selectedIdxRef = ref(initialRowIndex)

  function useTableKeybindings(e: KeyboardEvent) {
    const currentIdx = selectedIdxRef.value

    const lastIdx = unref(tableRows).length - 1

    let idx = currentIdx < 0 ? 0 : currentIdx

    switch (e.key) {
      case 'ArrowUp':
        preventDefaultBehavior(e)

        if (currentIdx !== 0) {
          idx = currentIdx - 1
        }

        break

      case 'ArrowDown':
        preventDefaultBehavior(e)

        if (currentIdx < lastIdx) {
          // stop at the bottom
          idx = currentIdx + 1
        }

        break

      case 'Enter':
        preventDefaultBehavior(e)

        if (unref(showCondition)) {
          onDblClick()
        }

        break

      default:
        break
    }

    const nextSelectedItem = unref(tableRows)[idx]

    selectedRowRef.value = nextSelectedItem
    selectedIdxRef.value = idx

    focusNthRow(idx)
  }

  function handleClick(e: Event, row: RowType, idx: number) {
    preventDefaultBehavior(e)

    selectedRowRef.value = row
    selectedIdxRef.value = idx

    onClick()
  }

  function handleDblClick(e: Event, row: RowType, idx: number) {
    preventDefaultBehavior(e)

    selectedRowRef.value = row
    selectedIdxRef.value = idx

    if (unref(showCondition)) {
      onDblClick()
    }
  }

  function handleKeypress(e: KeyboardEvent) {
    useTableKeybindings(e)
  }

  function focusNthRow(idx: number) {
    // focus row
    const rows = document.querySelectorAll(`#${tableId} tr`)

    ;(rows[idx] as Element | null)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  function focusTable() {
    const ref = unref(tableRef) as unknown as QuasarRef

    ref.$el?.focus()
  }

  onMounted(() => {
    if (unref(tableRows).length) {
      nextTick(focusTable)
    }
  })

  return {
    selectedRowRef,
    selectedIdxRef,
    useTableKeybindings,
    handleClick,
    handleDblClick,
    handleKeypress,
    focusTable,
  }
}
