import { defineStore } from 'pinia'

import { FilmStoreState } from './types'

export const useFilmStore = defineStore('film', {
  state: (): FilmStoreState => ({
    films: [],
  }),

  actions: {
    async getFilms() {
      this.films = await this.filmService.getAllFilms()
    },
  },
})
