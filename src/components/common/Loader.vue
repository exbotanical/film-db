<script setup lang="ts">
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <q-inner-loading :showing="props.isLoading">
    <q-spinner class="q-mb-sm" size="50px" color="blue-6" />
    <div class="text-blue-6 text-bold">Working on it...</div>
  </q-inner-loading>
</template>
