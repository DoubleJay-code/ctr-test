<script lang="ts" setup>
import { useNotificationStore } from '@/store/notification.ts'
import { storeToRefs } from 'pinia'
import { NotificationCase, NotificationItem as NotificationItemType } from '@/types/notification.ts'

const notificationStore = useNotificationStore()
const {
	filterCases,
	activeSort,
	notifications,
	filteredNotifications
} = storeToRefs(notificationStore)

await notificationStore.getNotificationFilterCases()
await notificationStore.getNotifications()

const updateActiveSort = (item: NotificationCase): void => {
	activeSort.value = item
}

const updateNotificationItem = (item: NotificationItemType): void => {
	notifications.value = notifications.value.map((notification: NotificationItemType) => {
		return item.id === notification.id ? item : notification
	})
}
</script>

<template>
	<div class="notification-main">
		<div class="notification-main__counter text-12-reg">
			Показано 7 изменений
		</div>
		
		<div class="notification-main__actions">
			<div class="notification-main__actions-sort">
				<ui-select
					:modal-value="activeSort"
					:items="filterCases"
					placeholder="Тип уведомления"
					@update:model-value="updateActiveSort"
				/>
				
				<div
					v-if="activeSort"
					class="notification-main__actions-sort-cancel"
					@click="activeSort = null"
				>
					Сбросить
				</div>
			</div>
			
			<div class="notification-main__actions-reload">
				<ui-svg
					name="update"
					size="large"
					class="notification-main__actions-reload-icon"
					@click="notificationStore.getNotifications"
				/>
			</div>
		</div>
		
		<div class="notification-main__list">
			<notification-item
				v-for="(item, index) in filteredNotifications"
				:key="`notification-item_${item.id}_${index}`"
				:item="item"
				:cases="filterCases"
				@update:item="updateNotificationItem"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>

.notification-main {
	display: flex;
	flex-direction: column;
	gap: 20px;
	max-height: calc(100% - 40px);
	
	&__counter {
		color: $gray400;
	}
	
	&__actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		margin-top: 16px;
		
		&-sort {
			display: flex;
			align-items: center;
			gap: 8px;
			
			&-cancel {
				cursor: pointer;
				padding: 16px;
			}
		}
		
		&-reload {
			cursor: pointer;
			padding: 12px;
			max-height: 48px;
			
			&-icon {
				color: $gray300;
			}
		}
	}
	
	&__list {
		display: flex;
		flex-direction: column;
		overflow: auto;
		border: 1px solid $gray200;
		border-radius: 15px;
		
		&::-webkit-scrollbar {
			display: none;
		}
	}
}
</style>