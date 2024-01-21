import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
	  createSvgIconsPlugin({
		  // Specify the icon folder to be cached
		  iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
		  // Specify symbolId format
		  symbolId: 'icon-[dir]-[name]',

		  /**
		   * custom dom snippets
		   * @default: __svg__icons__dom__
		   */
		  customDomId: '__svg__icons__dom__'
	  })
  ],

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/assets/scss/core/_variables.scss";'
			}
		}
	},

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
