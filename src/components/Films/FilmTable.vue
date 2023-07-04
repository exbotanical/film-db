<script setup lang="ts">
import AddFilms from '@/components/Films/AddFilms.vue'
import UpdateFilm from '@/components/Films/UpdateFilm.vue'
import AboutDialog from '@/components/About.vue'

import { useTable } from '@/hooks'
import { useAuthStore, useFilmStore } from '@/state'
import type { Film } from '@/types'

import { tableColumns } from './template'

const authStore = useAuthStore()

const filmStore = useFilmStore()
const films = computed(() => filmStore.getFilms)

const titleSearchText = ref('')
const searchFilms = computed(() =>
  films.value.filter(({ title }) => {
    if (!titleSearchText.value) {
      return true
    }

    return title.toLowerCase().includes(titleSearchText.value.toLowerCase())
  }),
)

const isLoading = ref(true)
const paginationConfig = computed(() => ({
  rowsPerPage: 0,
  rowsNumber: searchFilms.value.length,
}))

const showUpdateFilm = ref(false)
function handleCloseUpdateModal() {
  showUpdateFilm.value = false
}

function onDblClick() {
  showUpdateFilm.value = true
}

const showAddFilms = ref(false)
function handleAddFilms(e: Event) {
  e.preventDefault()
  showAddFilms.value = true
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

onBeforeMount(
  async () =>
    await filmStore.fetchFilms().finally(() => (isLoading.value = false)),
)

const showAboutDialog = ref(false)
</script>

<template>
  <q-table
    :id="tableId"
    ref="tableRef"
    :data-testid="tableId"
    row-key="id"
    :tabindex="-1"
    :loading="isLoading"
    :selected="[selectedRowRef]"
    :columns="tableColumns"
    :rows="searchFilms"
    :rows-per-page-options="[0]"
    :pagination="paginationConfig"
    virtual-scroll
    :virtual-scroll-item-size="20"
    :virtual-scroll-sticky-size-start="20"
    class="sticky-table bg-secondary"
    flat
    dense
    hide-pagination
    square
    @keydown="handleKeypress"
    @row-click="handleClick"
    @row-dblclick="handleDblClick"
  >
    <template #top>
      <div class="full-width row items-center justify-between">
        <q-btn
          v-if="authStore.isLoggedIn"
          color="primary"
          label="Add films"
          @click="handleAddFilms"
        />

        <q-input
          v-model="titleSearchText"
          class="extra-dense"
          filled
          dense
          clearable
        >
          <template #append>
            <q-icon name="mdi-magnify" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
    </template>

    <template #loading>
      <q-inner-loading showing color="blue-6" />
    </template>

    <template #header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="bg-secondary"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template #bottom>
      <q-space />
      <q-btn
        color="grey-6"
        icon="mdi-help"
        round
        flat
        @click="showAboutDialog = true"
      />
    </template>
  </q-table>

  <q-dialog v-model="showUpdateFilm" @hide="handleCloseUpdateModal">
    <UpdateFilm :film="selectedRowRef" @close="handleCloseUpdateModal" />
  </q-dialog>

  <q-dialog v-model="showAddFilms" full-width @hide="handleCloseAddModal">
    <AddFilms @close="handleCloseAddModal" />
  </q-dialog>

  <q-dialog v-model="showAboutDialog">
    <AboutDialog />
  </q-dialog>
</template>

<style scoped lang="scss">
.sticky-table {
  height: 100vh;
  overflow-y: auto;

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }
}
</style>
