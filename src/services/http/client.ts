interface ErroneousResponse {
  data: null
  ok: false
  message?: string | undefined
}

interface SuccessfulResponse<T> {
  data: T
  ok: true
}

export type Normalized<T> = Promise<ErroneousResponse | SuccessfulResponse<T>>

export interface Normalizer {
  <T>(response: Response): Normalized<T>
}

export class HttpClient {
  constructor(
    private readonly baseUrl = '/',
    private readonly normalize: Normalizer,
  ) {}

  async get<T = null>(url: string): Normalized<T> {
    const response = await this.request(url, {
      method: 'GET',
    })

    return this.normalize<T>(response)
  }

  async post<T = null | undefined, D = null | undefined>(
    url: string,
    payload?: D,
  ): Normalized<T> {
    const response = await this.request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      ...(payload ? { body: JSON.stringify(payload) } : {}),
    })

    return this.normalize(response)
  }

  async request(url: string, opts: RequestInit) {
    return fetch(this.baseUrl + url, {
      ...opts,
    })
  }
}
