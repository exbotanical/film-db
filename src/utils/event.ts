interface Options {
  stopPropagation?: boolean
}

export function preventDefaultBehavior(
  e: Event,
  { stopPropagation = true }: Options = {},
) {
  if (stopPropagation) {
    disabledEventPropagation(e)
  }
  e.preventDefault()

  return false
}

export function disabledEventPropagation(e: Event) {
  e.stopPropagation()

  if (window.event) {
    window.event.cancelBubble = true
  }
}
