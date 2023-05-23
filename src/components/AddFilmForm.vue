<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

import Input from '@/components/Input.vue'
import { useFilmStore } from '@/state'

defineProps<{
  title?: string
}>()

const $emit = defineEmits<{
  (e: 'confirm'): void
}>()

const filmStore = useFilmStore()

const formModel = ref({
  title: '',
  comments: '',
  watchDates: '',
})

const isFormValid = computed(
  () => !!formModel.value.title && !!formModel.value.watchDates,
)

async function handleSubmit() {
  const watchDates = formModel.value.watchDates
    .split(',')
    .map(v => new Date(v).getTime())
  const { title, comments } = formModel.value

  try {
    await filmStore.addFilm({
      title,
      comments,
      watchDates,
    })
    $emit('confirm')
  } catch (ex) {}
}
</script>

<template>
  <VueFinalModal
    class="modal"
    content-class="modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1>{{ title }}</h1>

    <form style="display: flex; flex-direction: column">
      <Input id="title" v-model="formModel.title" label="Title" type="text" />
      <Input
        id="watchDates"
        v-model="formModel.watchDates"
        label="Watch Dates"
        type="text"
      />
      <Input
        id="comments"
        v-model="formModel.comments"
        label="Comments"
        type="text"
      />
    </form>

    <button :disabled="!isFormValid" @click="handleSubmit">Submit</button>
  </VueFinalModal>
</template>

<style>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #000;
  border-radius: 0.5rem;
}
.modal-content > * + * {
  margin: 0.5rem 0;
}
.modal-content h1 {
  font-size: 1.375rem;
}
.modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .modal-content {
  background: #000;
}
</style>
