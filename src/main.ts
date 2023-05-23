import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { Dialog, Loading, Notify, Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/svg-mdi-v6'

import { debugPlugin, registerNotifyPlugin, quasarStyles } from '@/plugins'

import { GitHubRepository } from '@/repositories/github'
import { HttpClient, defaultNormalizer } from '@/services/http'

import App from './App.vue'

import '@quasar/extras/mdi-v6/mdi-v6.css'
import 'quasar/src/css/index.sass'

createApp(App)
  .use(debugPlugin)
  .use(registerNotifyPlugin)
  .use(
    createPinia().use(() => ({
      repository: new GitHubRepository(
        new HttpClient(import.meta.env.VITE_GITHUB_API_URL, defaultNormalizer),
        {
          databaseId: import.meta.env.VITE_GITHUB_GIST_DATABASE_ID,
          databaseName: import.meta.env.VITE_GITHUB_GIST_DATABASE_NAME,
        },
      ),
    })),
  )
  .use(Quasar, {
    iconSet: quasarIconSet,
    plugins: {
      Dialog,
      Loading,
      Notify,
    },
    config: {
      ...quasarStyles,
    },
  })
  .mount('#app')
