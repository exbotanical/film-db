export interface ErroneousResponse {
  data: null
  ok: false
}

export interface SuccessfulResponse<T> {
  data: T
  ok: true
}

export type Normalized<T> = Promise<
  {
    status: number
  } & (ErroneousResponse | SuccessfulResponse<T>)
>

export interface RequestOptions extends RequestInit {}

export interface RequestArgs extends Omit<RequestOptions, 'body'> {
  body?: BodyInit
}
