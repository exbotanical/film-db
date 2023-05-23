<script setup lang="ts">
import { UpsertFilmDto } from '@/types'
import { tableColumns } from './template'

function defaultFormModel() {
  return {
    title: '',
    comments: '',
    watchDates: [],
  }
}

const films: UpsertFilmDto[] = []
films.push(defaultFormModel())
</script>

<template>
  <q-table
    flat
    dense
    hide-pagination
    hide-bottom
    square
    class="sticky-table"
    :columns="tableColumns"
    :rows="films"
  >
    <template #header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <q-tr>
      <q-input />
    </q-tr>
  </q-table>
</template>
