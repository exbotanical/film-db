import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { debugPlugin } from '@/plugins'

import './style.css'
import App from './App.vue'
import { GitHubRepository } from './repositories/github'
import { FilmService } from './services/film'

createApp(App)
  .use(debugPlugin)
  .use(
    createPinia().use(() => ({
      filmService: new FilmService(
        new GitHubRepository({
          databaseId: import.meta.env.GITHUB_GIST_DATABASE_ID,
          databaseName: import.meta.env.GITHUB_GIST_DATABASE_NAME,
        }),
      ),
    })),
  )
  .mount('#app')
