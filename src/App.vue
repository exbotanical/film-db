<script setup lang="ts">
import { useErrorHandler } from '@/hooks'
import FilmTable from '@/components/Films/FilmTable.vue'

import './style.scss'

onErrorCaptured(err => {
  useErrorHandler(err, { notify: true })

  return false
})
</script>

<template>
  <QLayout view="hHh Lpr fFf">
    <Suspense>
      <template #fallback> Loading... </template>
      <template #default>
        <FilmTable />
      </template>
    </Suspense>
  </QLayout>
</template>
