interface MessageFields {
  internal: string
  friendly: string
}

export abstract class ClientError extends Error {
  constructor(public messages: MessageFields) {
    super(messages.internal)

    Object.setPrototypeOf(this, ClientError.prototype)
  }

  abstract serialize(): {
    internal: string
    friendly: string
  }
}
