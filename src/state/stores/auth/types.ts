import type { RemovableRef } from '@vueuse/core'

export interface AuthStoreState {
  sessionToken: RemovableRef<string>
}
