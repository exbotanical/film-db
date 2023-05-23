<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  modelValue: String
}>()

const $emit = defineEmits(['update:modelValue'])

const mutableModelValue = computed({
  get: () => props.modelValue,
  set: nextValue => {
    $emit('update:modelValue', nextValue ?? '')
  },
})
</script>

<template>
  <label :for="id">{{ label }}</label>
  <input v-bind="$attrs" :id="id" v-model="mutableModelValue" />
</template>
