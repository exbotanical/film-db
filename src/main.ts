import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'

import { debugPlugin } from '@/plugins'

import './style.css'
import 'vue-final-modal/style.css'

import App from './App.vue'
import { GitHubRepository } from './repositories/github'
import { FilmService } from './services/film'

createApp(App)
  .use(debugPlugin)
  .use(
    createPinia().use(() => ({
      filmService: new FilmService(
        new GitHubRepository({
          databaseId: import.meta.env.VITE_GITHUB_GIST_DATABASE_ID,
          databaseName: import.meta.env.VITE_GITHUB_GIST_DATABASE_NAME,
        }),
      ),
    })),
  )
  .use(createVfm())
  .mount('#app')
