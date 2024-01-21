import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { NotificationCase, NotificationItem } from '@/types/notification.ts'

export const useNotificationStore = defineStore('notifications:store', () => {
	const activeSort = ref<NotificationCase | null>(null)
	const filterCases = ref<NotificationCase[]>([])

	const notifications = ref<NotificationItem[]>([])

	filterCases.value = JSON.parse(sessionStorage.getItem('filterCases')) ?? []
	activeSort.value = JSON.parse(sessionStorage.getItem('activeSort'))
	notifications.value = JSON.parse(sessionStorage.getItem('notifications')) ?? []

	const needFetch = computed<boolean>(() => {
		return !notifications.value.length && !filterCases.value.length
	})

	const filteredNotifications = computed<NotificationItem[]>(() => {
		if (activeSort.value) {
			return notifications.value.filter((notification: NotificationItem) => activeSort.value.id === notification.case)
		} else {
			return notifications.value
		}
	})

	const updateActiveSort = (item: NotificationCase | null): void => {
		activeSort.value = item

		sessionStorage.setItem('activeSort', JSON.stringify(activeSort.value))
	}

	const updateNotificationItem = (item: NotificationItem): void => {
		notifications.value = notifications.value.map((notification: NotificationItem) => {
			return item.id === notification.id ? { ...item, unread: !item.unread } : notification
		})

		sessionStorage.setItem('notifications', JSON.stringify(notifications.value))
	}

	const getNotifications = async (): void => {
		try {
			const response = await fetch('https://e-tag.pro/testjob/list.json')

			const notificationsArray = await response.json()
			const data = notificationsArray.map((item: NotificationItem) => ({ ...item, unread: true }))
			notifications.value = data

			sessionStorage.setItem('notifications', JSON.stringify(data))
		} catch (e) {
			console.error(e)
		}
	}

	const getNotificationFilterCases = async (): void => {
		try {
			const response = await fetch('https://e-tag.pro/testjob/cases.json')

			const data = await response.json()
			filterCases.value = data

			sessionStorage.setItem('filterCases', JSON.stringify(data))
		} catch (e) {
			console.error(e)
		}
	}

	return {
		activeSort,
		filterCases,
		notifications,
		filteredNotifications,
		needFetch,
		updateNotificationItem,
		getNotificationFilterCases,
		getNotifications,
		updateActiveSort
	}
})