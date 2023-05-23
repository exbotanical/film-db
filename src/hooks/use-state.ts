export function useState<T>(initialState: T | undefined) {
  // see: https://github.com/vuejs/core/issues/2136
  const state = ref<T | undefined>(initialState) as Ref<T | undefined>

  function updateState(nextState: T | undefined) {
    state.value = nextState
  }

  const computedState = computed(() => state.value)

  return {
    updateState,
    computedState,
  }
}
