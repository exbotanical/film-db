<script setup lang="ts">
import { useFilmStore } from '@/state'
import { toReadableDate } from '@/utils'

const filmStore = useFilmStore()

const films = computed(() => filmStore.getFilms)

await filmStore.fetchFilms()
</script>

<template>
  <div style="overflow-x: auto">
    <table v-if="films.length" id="films" style="background: white">
      <tr>
        <th v-for="key in Object.keys(films[0])" :key="key">
          {{ key }}
        </th>
      </tr>
      <tr v-for="(row, idx) in films" :key="idx">
        <template v-for="[k, v] in Object.entries(row)">
          <td v-if="k === 'watchDates'">
            {{ (v as number[]).map(toReadableDate).join(', ') }}
          </td>
          <td v-else-if="k === 'createdAt' || k === 'updatedAt'">
            {{ toReadableDate(v as number) }}
          </td>
          <td v-else>
            {{ v }}
          </td>
        </template>
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
