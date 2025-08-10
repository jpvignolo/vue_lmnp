import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(  ({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  const theme = env.VITE_THEME ?? 'decla'

  const abstractsPath = path.resolve(__dirname, "src/styles/abstracts/index.scss");
  const themePath     = path.resolve(__dirname, `src/styles/themes/${theme}.scss`);

  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // alias « @theme » qui pointe vers src/themes/decla ou msm ou autre
        '@theme': path.resolve(__dirname, `src/themes/${theme}`),
        '@abstracts': path.resolve(__dirname, 'src/styles/abstracts/index.scss'),
        '@theme-scss': path.resolve(__dirname, `src/styles/themes/${theme}.scss`),
      },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData:
                  `@use "${abstractsPath}" as *;` +
                  `@use "${themePath}" as *;` +
                  `\n`
            },
        },
    },
  }
})
