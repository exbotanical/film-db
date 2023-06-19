export function maybeApply<T>(fn: (v: T) => any, v: T | undefined) {
  return v ? fn(v) : v
}
