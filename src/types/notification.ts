export enum NotificationCaseCode {
	NEW_CATEGORY = 'newcat',
	CLEANED = 'cleaned',
	NEW_LOCATION = 'newlocation',
	NOT_FOUND = 'notfound'
}

export interface NotificationCase {
	id: number
	name: string
	description: string
	code: NotificationCaseCode
}

export interface NotificationItem {
	case: number
	cat: string
	id: number
	unread: boolean
}