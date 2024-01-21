import { NotificationCase, NotificationCaseCode, NotificationItem } from '@/types/notification.ts'
import { iconColors, iconNames } from '@/helpers/icon.ts'

export const notificationInfo = (item: NotificationItem, cases: NotificationCase[]) => {
	const currentCase = cases.find((caseItem: NotificationCase) => caseItem.id === item.case )

	return {
		iconName: iconNames[currentCase?.code ?? NotificationCaseCode.NEW_CATEGORY],
		iconColor: iconColors[currentCase?.code ?? NotificationCaseCode.NEW_CATEGORY],
		label: currentCase?.description ?? ''
	}
}