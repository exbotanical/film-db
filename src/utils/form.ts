export interface ValidationRule {
  (val: string | null): true | string
}

export function required(message: string) {
  return function validate(val: string | null) {
    return (val != null && val !== '') || message
  }
}

export function date(message: string) {
  return function validate(val: string | null) {
    return (val && !isNaN(Date.parse(val))) || message
  }
}

export function list(rule: ValidationRule) {
  return function validate(vals: string[]) {
    for (const val of vals) {
      const maybeMessage = rule(val)
      if (maybeMessage) return maybeMessage
    }
    return true
  }
}
