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
    VITE_GITHUB_API_URL: string
    VITE_GITHUB_GIST_DATABASE_ID: string
    VITE_GITHUB_GIST_DATABASE_NAME: string
  }
}
