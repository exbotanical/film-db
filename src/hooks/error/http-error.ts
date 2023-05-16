import { ClientError } from '.'

export class HttpError extends ClientError {
  public readonly friendly: string

  constructor(friendly: string) {
    super({ internal: 'Http request failure', friendly })
    this.friendly = friendly

    Object.setPrototypeOf(this, HttpError.prototype)
  }

  serialize() {
    return this.messages
  }
}
