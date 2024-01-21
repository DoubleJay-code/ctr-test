import { createRouter, createWebHistory } from 'vue-router'
import NotificationsPage from '@/pages/notifications/index.vue'
import NotificationsDetailPage from '@/pages/notifications/[id]/index.vue'

const routes = [
	{ path: '/notifications', component: NotificationsPage },
	{ path: '/notifications/:id', component: NotificationsDetailPage }
]

const router = createRouter({
	routes,
	history: createWebHistory()
})

router.beforeEach((to) => {
	if (to.path === '/') {
		return 'notifications'
	}
})

export default router