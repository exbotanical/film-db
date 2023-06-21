/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Nullish } from '@/types'

import type { Normalized, RequestArgs } from './types'

export class HttpClient {
  constructor(private readonly baseUrl = '/') {}

  async get<T = any>(url: string, args: RequestArgs = {}): Normalized<T> {
    const response = await this.request(url, {
      method: 'GET',
      ...args,
    })

    return this.normalize(response)
  }

  async post<T = Nullish>(url: string, args: RequestArgs = {}): Normalized<T> {
    const response = await this.request(url, {
      method: 'POST',
      ...args,
    })

    return this.normalize(response)
  }

  async put<T = Nullish>(url: string, args: RequestArgs = {}): Normalized<T> {
    const response = await this.request(url, {
      method: 'PUT',
      ...args,
    })

    return this.normalize(response)
  }

  async patch<T = Nullish>(url: string, args: RequestArgs = {}): Normalized<T> {
    const response = await this.request(url, {
      method: 'PATCH',
      ...args,
    })

    return this.normalize(response)
  }

  async delete<T = Nullish>(
    url: string,
    args: RequestArgs = {},
  ): Normalized<T> {
    const response = await this.request(url, {
      method: 'DELETE',
      ...args,
    })

    return this.normalize(response)
  }

  private async request(url: string, opts: RequestInit) {
    return fetch(this.baseUrl + url, opts)
  }

  private async normalize<T>(response: Response): Normalized<T> {
    let data = null
    try {
      if (response.ok) {
        data = await response.json()
      }
    } catch (ex) {
      return {
        ok: false,
        data: null,
        status: -1,
      }
    }

    return {
      ok: response.ok,
      data,
      status: response.status,
    }
  }
}

// ;['get'].forEach(method => {
//   Object.defineProperty(HttpClient.prototype, method, {
//     value: async function <T = Nullish>(
//       url: string,
//       args: RequestArgs = {},
//     ): Normalized<T> {
//       const response = await this.request(url, {
//         method: method.toUpperCase(),
//         ...args,
//       })

//       return this.normalize(response)
//     },
//   })
// })
