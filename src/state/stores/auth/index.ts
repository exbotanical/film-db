import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import type { AuthStoreState } from './types'

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    sessionToken: useLocalStorage<string>('SESSION_TOKEN', null),
  }),

  getters: {
    isLoggedIn(): boolean {
      return !!this.sessionToken
    },
  },

  actions: {
    setSession(token: string) {
      this.sessionToken = token
    },
  },
})
