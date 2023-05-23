import type { App, Plugin } from 'vue'

function debug(this: App) {
  window.onerror = (message, source, line, column) => {
    console.error(
      `Uncaught Exception: ${JSON.stringify(
        message,
      )}\nInfo: ${source} - Ln${line} Col${column}`,
    )
  }

  window.onunhandledrejection = e => {
    console.error(`Unhandled Promise Rejection: ${e.reason}`)

    e.preventDefault()
  }

  this.config.errorHandler = (err, _vm, info) => {
    console.error(`Exception: ${err}\nInfo: ${info}`)
  }

  this.config.warnHandler = (msg, _vm, trace) => {
    console.warn(`Warning: ${msg}\nTrace: ${trace}`)
  }
}

export const debugPlugin: Plugin = {
  install(app) {
    debug.apply(app)
  },
}
