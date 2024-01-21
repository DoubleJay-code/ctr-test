import './assets/scss/main.scss'
import { createApp } from 'vue'
import router from '@/router/router.ts'
import App from './App.vue'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'virtual:svg-icons-register'
import components from '@/components'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

components.forEach(item => {
	app.component(item.name, item.component)
})

app
	.use(pinia)
	.use(VueTippy, {  directive: 'tippy', component: 'tippy', componentSingleton: 'tippy-singleton' })
	.use(router)
	.mount('#app')
