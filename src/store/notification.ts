import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { NotificationCase, NotificationItem } from '@/types/notification.ts'

export const useNotificationStore = defineStore('notifications:store', () => {
	const activeSort = ref<NotificationCase | null>(null)
	const filterCases = ref<NotificationCase[]>([])

	const notifications = ref<NotificationItem[]>([])

	const filteredNotifications = computed<NotificationItem[]>(() => {
		if (activeSort.value) {
			return notifications.value.filter((notification: NotificationItem) => activeSort.value.id === notification.case)
		} else {
			return notifications.value
		}
	})

	const getNotifications = async (): void => {
		try {
			const response = await fetch('https://e-tag.pro/testjob/list.json')
			const notificationsArray = await response.json()

			notifications.value = notificationsArray.map((item: NotificationItem) => ({ ...item, unread: true }))
		} catch (e) {
			console.error(e)
		}
	}

	const getNotificationFilterCases = async (): void => {
		try {
			const response = await fetch('https://e-tag.pro/testjob/cases.json')
			filterCases.value = await response.json()
		} catch (e) {
			console.error(e)
		}
	}

	return {
		activeSort,
		filterCases,
		notifications,
		filteredNotifications,
		getNotificationFilterCases,
		getNotifications
	}
})