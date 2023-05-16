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
  <input v-model="mutableModelValue" v-bind="$attrs" :id="id" />
</template>
