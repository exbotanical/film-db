import type { FilmService } from '@/services/film'

declare interface Window {}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    any
  >
  export default component
}

interface ImportMeta {
  env: {
    GITHUB_GIST_DATABASE_ID: string
    GITHUB_GIST_DATABASE_NAME: string
  }
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    filmService: FilmService
  }
}
