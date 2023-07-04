<script setup lang="ts">
import { useQuasar } from 'quasar'

import FilmTable from '@/components/Films/FilmTable.vue'
import { useErrorHandler, useRedirect } from '@/hooks'

import { useAuthStore } from './state'

import './style.scss'

const $q = useQuasar()

onBeforeMount(() => {
  const { wasRedirected } = useRedirect('/film-db/login', '/film-db')

  if (wasRedirected.value) {
    $q.dialog({
      title: 'Login',
      message: 'Token',
      prompt: {
        model: '',
        type: 'text',
      },
      cancel: true,
      persistent: true,
    }).onOk(data => {
      useAuthStore().setSession(data)
    })
  }
})

onErrorCaptured(err => {
  useErrorHandler(err, { notify: true })

  return false
})
</script>

<template>
  <QLayout view="hHh Lpr fFf">
    <FilmTable />
  </QLayout>
</template>
