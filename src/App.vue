<script setup lang="ts">
import { useQuasar } from 'quasar'

import FilmTable from '@/components/Films/FilmTable.vue'
import { useErrorHandler, useRedirect } from '@/hooks'

import './style.scss'

import { useAuthStore } from './state'

const $q = useQuasar()

onBeforeMount(() => {
  const { wasRedirected } = useRedirect('/login', '/')

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
    <Suspense>
      <template #fallback> Loading... </template>
      <template #default>
        <FilmTable />
      </template>
    </Suspense>
  </QLayout>
</template>
