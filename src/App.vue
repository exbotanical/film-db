<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal'

import FilmTable from './components/FilmTable.vue'
import AddFilmForm from './components/AddFilmForm.vue'

import { useErrorHandler } from '@/hooks'

const { open, close } = useModal({
  component: AddFilmForm,
  attrs: {
    title: 'Add film',
    onConfirm() {
      close()
    },
  },
  slots: {
    default: '<p>The content of the modal</p>',
  },
})

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

  <button @click="open">Add Film</button>
  <ModalsContainer />
</template>
