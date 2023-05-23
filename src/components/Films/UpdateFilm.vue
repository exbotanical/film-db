<script setup lang="ts">
import Button from '@/components/common/Button.vue'

import { useFilmStore } from '@/state'
import { showNotification } from '@/plugins'
import { required, list, date, copy } from '@/utils'

import { defaultFilmModel } from './util'

import type { Film, UpsertFilmDto } from '@/types'
import type { PropType } from 'vue'
import Loader from '../common/Loader.vue'

const filmStore = useFilmStore()

const props = defineProps({
  film: { type: Object as PropType<Film> },
})

const $emit = defineEmits<{
  (e: 'close'): void
}>()

const isLoading = ref(false)

const formModel = ref<UpsertFilmDto>(copy(props.film) || defaultFilmModel())

const isFormModelValid = computed(
  () => !!(formModel.value.title && formModel.value.watchDates.length),
)

async function handleSubmit(e: Event) {
  e.preventDefault()

  isLoading.value = true
  try {
    if (!props.film?.id) {
      showNotification('error', 'Something went wrong')
      $emit('close')
      return
    }

    await filmStore.updateFilm(props.film.id, formModel.value)
    showNotification('success', 'Film successfully updated')

    $emit('close')
  } catch (ex) {
    console.error(ex)
    showNotification('error', 'Failed to save the film update')
  } finally {
    isLoading.value = false
  }
}

function handleReset() {
  Object.assign(formModel.value, defaultFilmModel())
}
</script>

<template>
  <q-card>
    <q-card-section>
      <q-form autofocus @submit="handleSubmit" @reset="handleReset">
        <!-- TODO: reusable component / DRY -->
        <q-input
          v-model="formModel.title"
          label="Title"
          filled
          lazy-rules
          :rules="[required('Title is required')]"
        />

        <q-select
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
          :rules="[list(date('Each must be a valid date'))]"
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

    <Loader :is-loading="isLoading" />
  </q-card>
</template>
