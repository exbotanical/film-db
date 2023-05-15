import { Normalized } from './client'

export const defaultNormalizer = async <T>(
  response: Response,
): Normalized<T> => {
  try {
    if (!response.ok) {
      return {
        ok: false,
        data: null,
      }
    }

    const data = await response.json()

    return {
      ok: true,
      data,
    }
  } catch (ex) {
    return {
      ok: false,
      data: null,
      message: ex instanceof Error ? ex.message : JSON.stringify(ex),
    }
  }
}
