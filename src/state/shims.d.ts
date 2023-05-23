import type { DataRepository, Film } from '@/types'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    repository: DataRepository<Film>
  }
}
