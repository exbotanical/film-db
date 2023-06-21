/// <reference types="vitest" />
import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

const r = (dir: string) => resolve(__dirname, dir)

export default defineConfig({
  base: '/film-db/',

  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vitest'],
      dts: 'src/types/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': r('./src'),
    },
  },
  server: {
    port: 5000,
  },
  test: {
    globals: true,
  },
})
