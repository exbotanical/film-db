export function copy<T>(v: T): T {
  return JSON.parse(JSON.stringify(v))
}
