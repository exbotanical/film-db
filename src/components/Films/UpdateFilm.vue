<script setup lang="ts">
import type { PropType } from 'vue'

import Button from '@/components/common/Button.vue'
import Loader from '@/components/common/Loader.vue'
import { showNotification } from '@/plugins'
import { useAuthStore, useFilmStore } from '@/state'
import type { Film, UpsertFilmDto } from '@/types'
import {
  required,
  list,
  date,
  copy,
  preventDefaultBehavior,
  toReadableDate,
  maybeApply,
} from '@/utils'

import { filmTypeOptions } from './template'
import { defaultFilmModel } from './util'

const authStore = useAuthStore()
const isReadonlyMode = computed(() => !authStore.isLoggedIn)

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
        <!-- TODO: DRY components -->

        <div class="flex q-pb-md">
          <q-input
            label="Created"
            :model-value="maybeApply(toReadableDate, props.film?.createdAt)"
            filled
            readonly
            dense
            class="q-pr-xs"
          />

          <q-input
            label="Updated"
            :model-value="maybeApply(toReadableDate, props.film?.updatedAt)"
            filled
            readonly
            dense
            class="q-pl-xs"
          />
        </div>

        <q-input
          v-model="formModel.title"
          :rules="[required('Title is required')]"
          lazy-rules
          label="Title"
          filled
          dense
          :readonly="isReadonlyMode"
        />

        <div class="flex">
          <q-select
            v-model="formModel.type"
            label="Classification"
            :rules="[required('Type is required')]"
            lazy-rules
            dense
            filled
            emit-value
            map-options
            :hide-dropdown-icon="isReadonlyMode"
            :options="filmTypeOptions"
            :readonly="isReadonlyMode"
            class="q-pr-xs"
            style="width: 50%"
          />

          <q-input
            v-model="formModel.rating"
            label="Rating"
            dense
            type="number"
            max="10"
            min="0"
            filled
            style="width: 50%; padding-bottom: 20px"
            :readonly="isReadonlyMode"
            class="q-pl-xs"
          />
        </div>

        <q-select
          v-model="formModel.watchDates"
          :rules="[list(date('Each must be a valid date'))]"
          label="Watch Dates"
          input-debounce="0"
          use-input
          dense
          use-chips
          new-value-mode="add-unique"
          multiple
          hide-dropdown-icon
          filled
          :readonly="isReadonlyMode"
        />

        <q-input
          v-model="formModel.comments"
          label="Comments"
          type="textarea"
          filled
          dense
          :readonly="isReadonlyMode"
        />
      </q-form>
    </q-card-section>

    <q-separator />
    <q-card-actions v-if="!isReadonlyMode">
      <Button
        :disable-config="isFormModelValid ? null : 'Missing required fields'"
        type="action"
        label="Save"
        class="q-pr-sm"
        @click="handleSubmit"
      />
      <Button type="danger" label="Delete" @click="handleDelete" />
    </q-card-actions>

    <Loader :is-loading="isLoading" />
  </q-card>
</template>
