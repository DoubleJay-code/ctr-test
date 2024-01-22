<script lang="ts" setup>
import { useNotificationStore } from '@/store/notification.ts'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import {  NotificationItem } from '@/types/notification.ts'
import { notificationInfo } from '@/helpers/notification.ts'

const route = useRoute()

const notificationStore = useNotificationStore()
const { notifications, filterCases } = storeToRefs(notificationStore)

const currentNotification = computed<NotificationItem>(() => {
	return notifications.value.find((notification: NotificationItem) => String(notification.id) === route.params.id)
})

const getInfo = computed(() => {
	return notificationInfo(currentNotification.value, filterCases.value)
})
</script>

<template>
	<div class="notifications-detail-page">
		<h1>Уведомление</h1>
		
		<div class="notifications-detail-page__main">
			<div v-if="currentNotification.cat" class="notifications-detail-page__category text-12-reg">
				{{ currentNotification.cat }}
			</div>
			
			<div class="notifications-detail-page__actions">
				<ui-button to="/notifications" text="Назад" />
				
				<ui-button
					@click="notificationStore.updateNotificationItem(currentNotification)"
					:text="currentNotification.unread ? 'Прочитать' : 'Отметить непрочитанным'"
				/>
			</div>
			
			<div class="notifications-detail-page__card">
				<div class="notifications-detail-page__card-info">
					<ui-svg
						:name="getInfo.iconName"
						class="notifications-detail-page__card-info-icon"
						:class="[`notifications-detail-page__card-info-icon_color_${getInfo.iconColor}`]"
					/>
					
					<h2>{{ getInfo.label }}</h2>
					
					<transition name="unread" mode="out-in">
						<div
							v-if="currentNotification.unread"
							class="notifications-detail-page__card-info-new text-12-reg"
						>
							Новое
						</div>
					</transition>
				</div>
				
				<div class="notifications-detail-page__card-description text-12-reg">
					<div class="notifications-detail-page__card-description-key">
						ID
					</div>
					
					<div v-if="currentNotification.id" class="notifications-detail-page__card-description-value">
						{{ currentNotification.id }}
					</div>
				</div>
				
				<div class="notifications-detail-page__card-description text-12-reg">
					<div class="notifications-detail-page__card-description-key">
						Категория
					</div>
					
					<div v-if="currentNotification.cat" class="notifications-detail-page__card-description-value">
						{{ currentNotification.cat }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>

.unread-enter-active,
.unread-leave-active {
	transition: opacity 0.3s ease-in-out;
}
.unread-enter-from,
.unread-leave-to {
	opacity: 0;
}

.notifications-detail-page {
	display: flex;
	flex-direction: column;
	height: 100svh;
	gap: 4px;
	padding: 20px 32px;
	
	&__main {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	
	&__category {
		color: $gray400;
	}
	
	&__actions {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		margin-top: 20px;
	}
	
	&__card {
		display: flex;
		flex-direction: column;
		border: 1px solid $gray200;
		gap: 16px;
		border-radius: 15px;
		padding: 31px 39px;
		
		&-info {
			display: flex;
			align-items: center;
			gap: 8px;
			
			&-icon {
				flex-shrink: 0;
				margin-right: 8px;
				
				&_color {
					&_green {
						color: $green;
					}
					
					&_violet {
						color: $violet;
					}
					
					&_blue {
						color: $blue500;
					}
					
					&_red {
						color: $red;
					}
				}
			}
			
			&-new {
				flex-shrink: 0;
				background-color: $gray400;
				color: $white;
				padding: 2px 6px;
				border-radius: 27px;
			}
		}
		
		&-description {
			display: flex;
			gap: 16px;
			padding-top: 15px;
			
			&:last-child {
				border-top: 1px solid $gray200;
				padding-bottom: 16px;
			}
			
			&:first-child {
				padding-top: 16px;
			}
			
			&-key {
				width: 80px;
				color: $gray400;
			}
		}
	}
}
</style>