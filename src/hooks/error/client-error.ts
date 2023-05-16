interface MessageFields {
  internal: string
  friendly: string
}
export abstract class ClientError extends Error {
  constructor(public messages: MessageFields) {
    super(messages.internal)

    // preserve the prototype chain in tsc generated js
    Object.setPrototypeOf(this, ClientError.prototype)
  }

  abstract serialize(): {
    internal: string
    friendly: string
  }
}
