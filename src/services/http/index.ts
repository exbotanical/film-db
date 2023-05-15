import { HttpClient } from './client'
import { defaultNormalizer } from './normalizer'

export const httpClient = (baseUrl: string) =>
  new HttpClient(baseUrl, defaultNormalizer)
