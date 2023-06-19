<script setup lang="ts">
import Button from '@/components/common/Button.vue'
import Loader from '@/components/common/Loader.vue'
import { showNotification } from '@/plugins'
import { useFilmStore } from '@/state'
import type { UpsertFilmDto } from '@/types'
import { date, list, preventDefaultBehavior, required } from '@/utils'

import { addColumns, filmTypeOptions } from './template'
import { defaultFilmModel } from './util'

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
    showNotification('error', 'Failed to add films')
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
        :columns="addColumns"
        :rows="films"
        class="sticky-table"
        flat
        dense
        square
        hide-pagination
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
            <q-td key="type_key" :props="slotProps">
              <q-select
                v-model="slotProps.row.type"
                :rules="[required('Type is required')]"
                lazy-rules
                class="extra-dense"
                dense
                filled
                hide-hint
                hide-bottom-space
                emit-value
                map-options
                :options="filmTypeOptions"
              />
            </q-td>

            <q-td key="title_key" :props="slotProps">
              <q-input
                v-model="slotProps.row.title"
                :rules="[required('Title is required')]"
                lazy-rules
                class="extra-dense"
                dense
                filled
                hide-hint
                hide-bottom-space
              />
            </q-td>

            <q-td key="watchDates_key" :props="slotProps">
              <!-- empty label is CSS workaround, TODO: fix -->
              <q-select
                v-model="slotProps.row.watchDates"
                :rules="[list(date('Each must be a valid date'))]"
                class="extra-dense"
                style="width: 250px"
                label=""
                use-input
                use-chips
                new-value-mode="add-unique"
                multiple
                dense
                filled
                hide-dropdown-icon
                hide-bottom-space
                hide-hint
              />
            </q-td>
            <q-td key="comments_key" :props="slotProps">
              <q-input
                v-model="slotProps.row.comments"
                class="extra-dense"
                hide-hint
                hide-bottom-space
                dense
                filled
              />
            </q-td>
            <q-td key="rating_key" :props="slotProps">
              <q-input
                v-model="slotProps.row.rating"
                class="extra-dense"
                hide-hint
                hide-bottom-space
                dense
                type="number"
                max="10"
                min="0"
                filled
              />
            </q-td>

            <q-td key="actions_key">
              <q-btn
                v-show="films.length > 1"
                icon="mdi-close"
                color="negative"
                flat
                dense
                round
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
        :disable-config="allRowsValid ? null : 'All rows must be valid'"
        @click="handleSubmit"
      />
      <Button type="cancel" label="Add row" @click="handleAddRow" />
    </q-card-actions>

    <Loader :is-loading="isLoading" />
  </q-card>
</template>
