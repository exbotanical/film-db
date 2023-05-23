import type { Plugin } from 'vue'

import { Notify } from 'quasar'

type V = Parameters<Notify['registerType']>[1]
type NotificationTypes = 'error' | 'success' | 'warn'

const DEFAULT_TIMEOUT = 4000

const notificationTypes: Record<NotificationTypes, V> = {
  error: {
    icon: 'mdi-alert',
    color: 'negative',
    timeout: DEFAULT_TIMEOUT,
  },
  success: {
    icon: 'mdi-checkbox-marked-circle',
    color: 'positive',
    timeout: DEFAULT_TIMEOUT,
  },
  warn: {
    icon: 'mdi-alert',
    color: 'warn',
    timeout: DEFAULT_TIMEOUT,
  },
}

export function showNotification(type: NotificationTypes, message: string) {
  Notify.create({
    type,
    message,
  })
}

export const registerNotifyPlugin: Plugin = {
  install() {
    Object.entries(notificationTypes).forEach(([key, value]) => {
      Notify.registerType(key, value)
    })
  },
}
