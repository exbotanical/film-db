import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

import type { UpsertFilmDto, Film, UUID } from '@/types'
import { diffFromNowInSecs } from '@/utils'

import type { FilmStoreState } from './types'

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

    async addFilm(addFilm: UpsertFilmDto) {
      const newFilm = buildFilm(addFilm)
      const newFilms = this.films.concat(newFilm)

      await this.repository.update(newFilms)

      this.films = newFilms
      this.lastRefreshed = Date.now()
    },

    async updateFilm(id: UUID, updateFilm: UpsertFilmDto) {
      const filmIdx = this.films.findIndex(film => film.id === id)
      if (filmIdx === -1) {
        // TODO: const err msg
        throw new Error(
          'failed to update film because props.id does not match any known film; this is a bug',
        )
      }

      const film = this.films[filmIdx]

      this.films.splice(filmIdx, 1, {
        ...film,
        ...updateFilm,
        updatedAt: Date.now(),
      })

      await this.repository.update(this.films)

      this.lastRefreshed = Date.now()
    },
  },
})

function buildFilm(newFilm: UpsertFilmDto) {
  const now = Date.now()
  const film: Film = {
    ...newFilm,
    id: uuid(),
    updatedAt: now,
    createdAt: now,
  }
  return film
}
