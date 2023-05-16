export interface DataRepository<T> {
  get(): Promise<T[]>
  update(payload: T[]): Promise<boolean>
}
