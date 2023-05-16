<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'

import FilmTable from './components/FilmTable.vue'
import { useErrorHandler } from '@/hooks'

onErrorCaptured(err => {
  useErrorHandler(err, { notify: true })

  return false
})
</script>

<template>
  <Suspense>
    <template #fallback> Loading... </template>
    <template #default>
      <FilmTable />
    </template>
  </Suspense>

  <ModalsContainer />
</template>
