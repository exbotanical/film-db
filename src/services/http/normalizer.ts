import type { Normalized } from './client'

export const defaultNormalizer = async <T>(
  response: Response,
): Normalized<T> => {
  try {
    if (!response.ok) {
      console.error('failed HTTP request', { response })
      return {
        ok: false,
        data: null,
      }
    }

    const data = (await response.json()) as T

    return {
      ok: true,
      data,
    }
  } catch (ex) {
    console.error('failed HTTP request', {
      ex: ex instanceof Error ? ex.message : JSON.stringify(ex),
    })

    return {
      ok: false,
      data: null,
    }
  }
}
