export interface DataRepository<T> {
  getData(): Promise<T>
}
