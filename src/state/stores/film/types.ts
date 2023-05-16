import type { Film } from '@/types'
import { type RemovableRef } from '@vueuse/core'

export interface FilmStoreState {
  films: RemovableRef<Film[]>
  lastRefreshed: RemovableRef<number>
}
