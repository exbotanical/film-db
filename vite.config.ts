import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { resolve } from 'path'

const r = (dir: string) => resolve(__dirname, dir)

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: 'src/types/auto-imports.d.ts',
      imports: ['vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': r('./src'),
    },
  },
})
