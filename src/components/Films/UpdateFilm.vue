<script setup lang="ts">
import type { PropType } from 'vue'

import Button from '@/components/common/Button.vue'
import Loader from '@/components/common/Loader.vue'
import { showNotification } from '@/plugins'
import { useFilmStore } from '@/state'
import type { Film, UpsertFilmDto } from '@/types'
import { required, list, date, copy, preventDefaultBehavior } from '@/utils'

import { defaultFilmModel } from './util'

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
  preventDefaultBehavior(e)

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

async function handleDelete(e: Event) {
  preventDefaultBehavior(e)

  isLoading.value = true
  try {
    if (!props.film?.id) {
      showNotification('error', 'Something went wrong')
      $emit('close')
      return
    }

    await filmStore.deleteFilm(props.film.id)

    showNotification('success', 'Film successfully deleted')
    $emit('close')
  } catch (ex) {
    console.error(ex)
    showNotification('error', 'Failed to delete the film')
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
      <q-form @submit="handleSubmit" @reset="handleReset">
        <!-- TODO: reusable component / DRY -->
        <q-input
          v-model="formModel.title"
          :rules="[required('Title is required')]"
          lazy-rules
          label="Title"
          filled
        />

        <q-select
          v-model="formModel.watchDates"
          :rules="[list(date('Each must be a valid date'))]"
          label="Watch Dates"
          input-debounce="0"
          use-input
          use-chips
          new-value-mode="add-unique"
          multiple
          hide-dropdown-icon
          filled
          style="width: 250px"
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
        :disable-config="isFormModelValid ? null : 'Missing required fields'"
        type="action"
        label="Save"
        @click="handleSubmit"
      />
      <Button type="danger" label="Delete" @click="handleDelete" />
    </q-card-actions>

    <Loader :is-loading="isLoading" />
  </q-card>
</template>
