export function required(message: string) {
  return function validate(val: string | null) {
    return (val != null && val !== '') || message
  }
}
