<script setup lang="ts">
import { useFilmStore } from '@/state'
import { toReadableDate } from '@/utils'

const filmStore = useFilmStore()

const films = computed(() => filmStore.getFilms)

await filmStore.fetchFilms()

const headers = ['Title', 'Created At', 'Updated At', 'Comments', 'Watch Dates']
</script>

<template>
  <div style="overflow-x: auto">
    <table v-if="films.length" id="films" style="background: white">
      <tr>
        <th v-for="(header, idx) in headers" :idx="idx">
          {{ header }}
        </th>
      </tr>
      <tr v-for="(row, idx) in films" :key="idx">
        <td>
          {{ row.title }}
        </td>
        <td>
          {{ toReadableDate(row.createdAt) }}
        </td>
        <td>
          {{ toReadableDate(row.updatedAt) }}
        </td>
        <td>
          {{ row.comments }}
        </td>
        <td>
          {{ row.watchDates.map(toReadableDate).join(', ') }}
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
#films {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
}

#films td,
#films th {
  border: 1px solid var(--border);
  padding: 8px;
}

#films tr:nth-child(even) {
  background-color: var(--cell-bg);
}

#films tr:hover {
  background-color: var(--border);
}

#films th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: var(--header-bg);
  color: var(--header-fg);
}

#films td {
  color: var(--cell-fg);
}
</style>
