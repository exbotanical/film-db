interface Options {
  stopPropagation?: boolean
}

type PressEvent = KeyboardEvent | MouseEvent

export function preventDefaultBehavior(
  e: PressEvent,
  { stopPropagation = true }: Options = {},
) {
  if (stopPropagation) {
    disabledEventPropagation(e)
  }
  e.preventDefault()

  return false
}

export function disabledEventPropagation(e: PressEvent) {
  e.stopPropagation()

  if (window.event) {
    window.event.cancelBubble = true
  }
}
