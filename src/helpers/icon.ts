import { NotificationCaseCode } from '@/types/notification.ts'

export const iconColors: Record<NotificationCaseCode, string> = {
	[NotificationCaseCode.NEW_CATEGORY]: 'green',
	[NotificationCaseCode.CLEANED]: 'violet',
	[NotificationCaseCode.NEW_LOCATION]: 'blue',
	[NotificationCaseCode.NOT_FOUND]: 'red'
}

export const iconNames: Record<NotificationCaseCode, string> = {
	[NotificationCaseCode.NEW_CATEGORY]: 'change-category',
	[NotificationCaseCode.CLEANED]: 'reset-tag',
	[NotificationCaseCode.NEW_LOCATION]: 'change-location',
	[NotificationCaseCode.NOT_FOUND]: 'not-found'
}