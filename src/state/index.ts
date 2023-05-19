import type { DataRepository, Film } from '@/types'

export * from './stores/film'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    repository: DataRepository<Film>
  }
}
