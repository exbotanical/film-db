import { ClientError } from '.'

interface ErrorHandlerOptions {
  notify: boolean
  fallback?: string
}

const showNotification = alert // TODO:

export const useErrorHandler = (
  ex: any,
  { notify = false, fallback }: ErrorHandlerOptions,
) => {
  console.error({ ex })

  let ret =
    fallback || 'Uh oh, something went wrong. Please try refreshing the page.'

  if (ex instanceof ClientError) {
    const { friendly, internal } = ex.serialize()
    console.warn(internal)

    ret = friendly
  }

  if (notify) {
    showNotification(ret)
  }

  return ret
}
