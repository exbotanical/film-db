<script lang="ts" setup>
import type { PropType } from 'vue'

export type ButtonType = 'action' | 'cancel' | 'danger'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  label: {
    type: String,
    required: true,
  },

  type: {
    type: String as PropType<ButtonType>,
  },

  disableConfig: {
    type: String as PropType<string | null>,
    default: null,
  },
})

const $attrs = useAttrs()

const actionClass = 'bg-primary text-white'
const buttonProps = computed(() => {
  switch (props.type) {
    case 'action':
      return {
        class: actionClass,
        flat: true,
      }

    case 'cancel':
      return {
        class: 'text-grey-6',
        outline: true,
      }

    case 'danger':
      return {
        class: 'bg-negative text-grey-1',
        flat: true,
      }

    default:
      return {
        class: actionClass,
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
    >
      {{ props.disableConfig }}
    </q-tooltip>
  </div>
</template>
