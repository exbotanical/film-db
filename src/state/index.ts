import { FilmService } from '@/services/film'

export * from './stores/film'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    filmService: FilmService
  }
}
