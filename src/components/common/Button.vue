<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
import type { PropType } from 'vue'

export type ButtonType = 'action' | 'cancel' | 'danger'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },

  type: {
    type: String as PropType<ButtonType>,
  },

  // Disable + tooltip config. Should return null or tooltip message if disabled. Cannot be used with tooltip.
  disableConfig: {
    type: String as PropType<string | null>,
    default: null,
  },
})

const $attrs = useAttrs()

const buttonProps = computed(() => {
  switch (props.type) {
    case 'action':
      return {
        class: 'bg-primary text-white',
        flat: true,
      }

    case 'cancel':
      return {
        class: 'text-gray-600',
        outline: true,
      }

    case 'danger':
      return {
        class: 'bg-negative',
        flat: true,
      }

    default:
      return {
        class: 'bg-primary',
        flat: true,
      }
  }
})

const attrsSansClass = computed(() => {
  const { class: _, ...rest } = $attrs

  return rest
})
</script>

<template>
  <div :class="$attrs.class">
    <q-btn
      v-bind="{
        ...attrsSansClass,
        ...buttonProps,
        disabled: !!props.disableConfig,
        label,
      }"
    />

    <q-tooltip
      v-if="props.disableConfig"
      transition-show="scale"
      transition-hide="scale"
      class="min-w-fit"
    >
      {{ props.disableConfig }}
    </q-tooltip>
  </div>
</template>
