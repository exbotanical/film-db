<script setup lang="ts">
import UpdateFilm from '@/components/Films/UpdateFilm.vue'
import AddFilms from '@/components/Films/AddFilms.vue'

import { useFilmStore } from '@/state'
import { useTable } from '@/hooks'
import type { Film } from '@/types'

import { tableColumns } from './template'

// TODO: reorganize by logical unit
const filmStore = useFilmStore()

const isLoading = ref(true)
const showUpdateFilm = ref(false)
const showAddFilms = ref(false)

const films = computed(() => filmStore.getFilms)

await filmStore.fetchFilms().then(() => (isLoading.value = false))

const paginationConfig = computed(() => ({
  rowsPerPage: 0,
  rowsNumber: films.value.length,
}))

function onDblClick() {
  showUpdateFilm.value = true
}

function handleAddFilms(e: Event) {
  e.preventDefault()
  showAddFilms.value = true
}

function handleCloseUpdateModal() {
  showUpdateFilm.value = false
}

function handleCloseAddModal() {
  showAddFilms.value = false
}

const tableRef = ref(null)
const tableId = 'films-table'

const { selectedRowRef, handleKeypress, handleClick, handleDblClick } =
  useTable<Film>({
    tableRows: films,
    tableRef,
    tableId,
    initialRowIndex: 0,
    onDblClick,
  })
</script>

<template>
  <q-table
    :id="tableId"
    :data-testid="tableId"
    ref="tableRef"
    :tabindex="-1"
    :columns="tableColumns"
    :rows="films"
    row-key="id"
    class="sticky-table"
    :rows-per-page-options="[0]"
    :pagination="paginationConfig"
    virtual-scroll
    :virtual-scroll-item-size="20"
    :virtual-scroll-sticky-size-start="20"
    flat
    dense
    hide-pagination
    square
    :loading="isLoading"
    :selected="[selectedRowRef]"
    @keydown="handleKeypress"
    @row-click="handleClick"
    @row-dblclick="handleDblClick"
    hide-bottom
  >
    <template #top>
      <q-btn color="primary" label="Add films" @click="handleAddFilms" />
    </template>

    <template #loading>
      <q-inner-loading showing color="blue-6" />
    </template>

    <template #header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
  </q-table>

  <q-dialog
    v-model="showUpdateFilm"
    @hide="handleCloseUpdateModal"
    no-backdrop-dismiss
  >
    <UpdateFilm @close="handleCloseUpdateModal" :film="selectedRowRef" />
  </q-dialog>

  <q-dialog
    v-model="showAddFilms"
    @hide="handleCloseAddModal"
    no-backdrop-dismiss
  >
    <AddFilms @close="handleCloseAddModal" :film="selectedRowRef" />
  </q-dialog>
</template>

<style scoped lang="scss">
.sticky-table {
  overflow-y: auto;
  height: 100%;

  thead tr th {
    position: sticky;
    z-index: 1;
    background: white;
  }

  thead tr:first-child th {
    top: 0;
  }
}
</style>
