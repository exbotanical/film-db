export function useRedirect(from: string, to = '/') {
  const wasRedirected = ref(false)
  const location = ref(window.location.pathname)
  const shouldRedirect = computed(() => location.value === from)

  if (shouldRedirect.value) {
    window.history.pushState(null, '', to)
    wasRedirected.value = true
  }

  return {
    location,
    wasRedirected,
  }
}
