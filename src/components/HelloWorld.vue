<script setup lang="ts">
defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <table v-if="persistedRows.length" style="background: white" id="movies">
    <tr>
      <th v-for="key in Object.keys(persistedRows[0])" :key="key">
        {{ key }}
      </th>
    </tr>
    <tr v-for="(row, idx) in persistedRows" :key="idx">
      <template v-for="[k, v] in Object.entries(row)">
        <td v-if="k === 'watchDates'">
          {{ v.map(toReadableDate).join(', ') }}
        </td>
        <td v-else-if="k === 'createdAt' || k === 'updatedAt'">
          {{ toReadableDate(v) }}
        </td>
        <td v-else>
          {{ v }}
        </td>
      </template>
    </tr>
  </table>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
