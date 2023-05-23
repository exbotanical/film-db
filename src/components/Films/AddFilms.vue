<script setup lang="ts">
import { UpsertFilmDto } from '@/types'
import { addColumns } from './template'
import { defaultFilmModel } from './util'
import Button from '../common/Button.vue'
import { date, list, preventDefaultBehavior, required } from '@/utils'
import { useFilmStore } from '@/state'
import { showNotification } from '@/plugins'
import Loader from '../common/Loader.vue'

type AddFilmDto = UpsertFilmDto & { rowId: number }

const $emit = defineEmits<{
  (e: 'close'): void
}>()

const isLoading = ref(false)
const filmStore = useFilmStore()

const films: AddFilmDto[] = reactive([{ rowId: 0, ...defaultFilmModel() }])

const allRowsValid = computed(() =>
  films.every(film => !!film.title && film.watchDates.length),
)

function handleAddRow() {
  films.push({ rowId: films.length, ...defaultFilmModel() })
}

async function handleSubmit(e: Event) {
  e.preventDefault()

  isLoading.value = true

  try {
    await filmStore.addFilms(films)

    showNotification('success', 'Films successfully added')
    $emit('close')
  } catch (ex) {
    showNotification('error', 'Failed to update films')
  } finally {
    isLoading.value = false
  }
}

function handleDeleteRow(e: Event, row: AddFilmDto) {
  preventDefaultBehavior(e as PointerEvent)

  const idx = films.findIndex(({ rowId }) => row.rowId === rowId)
  if (idx == -1) {
    console.error('[AddFilms] failed to find row index; this is a bug')
    return
  }

  films.splice(idx, 1)
}
</script>

<template>
  <q-card>
    <q-card-section>
      <q-table
        flat
        dense
        hide-pagination
        square
        class="sticky-table"
        :columns="addColumns"
        :rows="films"
      >
        <template #header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template #body="slotProps">
          <q-tr :props="slotProps">
            <q-td key="title_key" :props="slotProps">
              <q-input
                class="extra-dense"
                v-model="slotProps.row.title"
                dense
                filled
                hide-hint
                hide-bottom-space
                lazy-rules
                :rules="[required('Title is required')]"
              />
            </q-td>

            <q-td key="watchDates_key" :props="slotProps">
              <!-- empty label is CSS workaround, TODO: fix -->
              <q-select
                class="extra-dense"
                hide-bottom-space
                hide-hint
                dense
                label=""
                filled
                v-model="slotProps.row.watchDates"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                new-value-mode="add-unique"
                style="width: 250px"
                :rules="[list(date('Each must be a valid date'))]"
              />
            </q-td>
            <q-td key="comments_key" :props="slotProps">
              <q-input
                class="extra-dense"
                v-model="slotProps.row.comments"
                dense
                filled
                hide-hint
                hide-bottom-space
              />
            </q-td>

            <q-td key="actions_key">
              <q-btn
                v-show="films.length > 1"
                flat
                dense
                round
                icon="mdi-close"
                color="negative"
                @click="e => handleDeleteRow(e, slotProps.row)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>

    <q-card-actions class="justify-between">
      <Button
        label="Submit"
        @click="handleSubmit"
        :disable-config="allRowsValid ? null : 'All rows must be valid'"
      />
      <Button type="cancel" label="Add row" @click="handleAddRow" />
    </q-card-actions>

    <Loader :is-loading="isLoading" />
  </q-card>
</template>
