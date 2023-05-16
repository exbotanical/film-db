import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

import type { FilmStoreState } from './types'
import type { CreateFilmDto, Film, UnixTimeStamp } from '@/types'
import { useLocalStorage } from '@vueuse/core'
import { diffFromNowInSecs } from '@/utils'

const REFRESH_INTERVAL_IN_SECS = 3600

export const useFilmStore = defineStore('film', {
  state: (): FilmStoreState => ({
    films: useLocalStorage<Film[]>('films', []),
    lastRefreshed: useLocalStorage('lastRefreshed', Date.now()),
  }),

  getters: {
    getFilms(state): Film[] {
      return state.films
    },

    getFilmByTitle(state) {
      return (matchTitle: string): Film | undefined =>
        state.films.find(({ title }) => matchTitle === title)
    },

    getFilmsWatchedInDateRange(state) {
      return (startDate: UnixTimeStamp, endDate: UnixTimeStamp): Film[] =>
        state.films.filter(
          ({ watchDates }) =>
            !!watchDates.some(
              watchDate => watchDate >= startDate && watchDate <= endDate,
            ),
        )
    },
  },

  actions: {
    async fetchFilms() {
      if (
        !this.films.length ||
        diffFromNowInSecs(this.lastRefreshed) > REFRESH_INTERVAL_IN_SECS
      ) {
        this.films = await this.filmService.getAllFilms()
      }
    },

    async addFilm(newFilm: CreateFilmDto) {
      this.films.push(buildFilm(newFilm))
      return await this.filmService.updateFilms(this.films)
    },

    async addFilms(newFilms: CreateFilmDto[]) {
      const films = newFilms.map(buildFilm)
      this.films.push(...films)
      return await this.filmService.updateFilms(this.films)
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
