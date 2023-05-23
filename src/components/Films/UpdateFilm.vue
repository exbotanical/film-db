<script setup lang="ts">
import Button from '@/components/common/Button.vue'

import { useFilmStore } from '@/state'
import { showNotification } from '@/plugins'
import { required, copy } from '@/utils'
import type { Film, UpsertFilmDto } from '@/types'
import type { PropType } from 'vue'

const filmStore = useFilmStore()

const props = defineProps({
  film: { type: Object as PropType<Film> },
})

const $emit = defineEmits<{
  (e: 'close'): void
}>()

const isLoading = ref(false)

function defaultFormModel() {
  return {
    title: '',
    comments: '',
    watchDates: [],
  }
}

const formModel = ref<UpsertFilmDto>(copy(props.film) || defaultFormModel())

const isFormModelValid = computed(
  () => !!(formModel.value.title && formModel.value.watchDates.length),
)

async function handleSubmit(e: Event) {
  e.preventDefault()

  isLoading.value = true
  try {
    // if (isAddMode.value) {
    const { title, comments, watchDates } = formModel.value
    await filmStore.addFilm({ title, comments, watchDates })
    // } else {
    //   if (!props.film?.id) {
    //     showNotification('error', 'Something went wrong')
    //     $emit('close')
    //     return
    //   }

    //   await filmStore.updateFilm(props.film.id, formModel.value)
    // }

    $emit('close')
  } catch (ex) {
    console.error(ex)
    showNotification('error', 'Failed to save the film update')
  } finally {
    showNotification('success', 'Film successfully updated')
    isLoading.value = false
  }
}

function handleReset() {
  Object.assign(formModel.value, defaultFormModel)
}

function validateDate(values: string[]) {
  return !values.some(value => isNaN(Date.parse(value)))
}
</script>

<template>
  <q-card>
    <q-card-section>
      <q-form autofocus @submit="handleSubmit" @reset="handleReset">
        <q-input
          v-model="formModel.title"
          label="Title"
          filled
          lazy-rules
          :rules="[required('Title is required')]"
        />

        <q-select
          class="q-pt-md"
          label="Watch Dates"
          filled
          v-model="formModel.watchDates"
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          input-debounce="0"
          new-value-mode="add-unique"
          style="width: 250px"
          :rules="[validateDate]"
        />

        <q-input
          v-model="formModel.comments"
          label="Comments"
          type="textarea"
          filled
        />
      </q-form>
    </q-card-section>

    <q-separator />
    <q-card-actions>
      <Button
        @click="handleSubmit"
        type="action"
        label="Save"
        :disable-config="isFormModelValid ? null : 'Missing required fields'"
      />
    </q-card-actions>

    <q-inner-loading :showing="isLoading">
      <q-spinner class="q-mb-sm" size="50px" color="blue-6" />
      <div class="text-blue-6 text-bold">Working on it...</div>
    </q-inner-loading>
  </q-card>
</template>
