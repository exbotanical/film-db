import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

import type { FilmStoreState } from './types'
import type { CreateFilmDto, Film } from '@/types'
import { useLocalStorage } from '@vueuse/core'
import { diffFromNowInSecs } from '@/utils'

const REFRESH_INTERVAL_IN_SECS = 3600

// TODO: batch updates on beforeunload or SW
export const useFilmStore = defineStore('film', {
  state: (): FilmStoreState => ({
    films: useLocalStorage<Film[]>('films', []),
    lastRefreshed: useLocalStorage('lastRefreshed', Date.now()),
  }),

  getters: {
    getFilms(state): Film[] {
      return state.films
    },
  },

  actions: {
    async fetchFilms() {
      if (
        !this.films.length ||
        diffFromNowInSecs(this.lastRefreshed) > REFRESH_INTERVAL_IN_SECS
      ) {
        this.films = await this.repository.get()
        this.lastRefreshed = Date.now()
      }
    },

    async addFilm(addFilm: CreateFilmDto) {
      const newFilm = buildFilm(addFilm)
      await this.repository.update([...this.films, newFilm])

      this.films.push(newFilm)
      this.lastRefreshed = Date.now()
    },
  },
})

function buildFilm(newFilm: CreateFilmDto) {
  const now = Date.now()
  const film: Film = {
    ...newFilm,
    id: uuid(),
    updatedAt: now,
    createdAt: now,
  }
  return film
}
