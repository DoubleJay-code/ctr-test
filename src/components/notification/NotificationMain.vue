<script lang="ts" setup>
import { useNotificationStore } from '@/store/notification.ts'
import { storeToRefs } from 'pinia'
import gsap from 'gsap'

const notificationStore = useNotificationStore()
const {
	filterCases,
	activeSort,
	filteredNotifications,
	needFetch
} = storeToRefs(notificationStore)

const onBeforeEnter = (el) => {
	el.style.opacity = 0
	el.style.height = 0
}

const onEnter = (el, done) => {
	gsap.to(el, {
		opacity: 1,
		height: 80,
		delay: el.dataset.index * 0.05,
		onComplete: done
	})
}

const onLeave = (el, done) => {
	gsap.to(el, {
		opacity: 0,
		height: 0,
		delay: el.dataset.index * 0.05,
		onComplete: done
	})
}

const refreshNotifications = async (): void => {
	await notificationStore.getNotificationFilterCases()
	await notificationStore.getNotifications()
	
	notificationStore.updateActiveSort(null)
}

if (needFetch.value) {
	await notificationStore.getNotificationFilterCases()
	await notificationStore.getNotifications()
}
</script>

<template>
	<div class="notification-main">
		<div class="notification-main__counter text-12-reg">
			<span>Показано </span>
			
			<transition name="counter" mode="out-in">
					<span :key="filteredNotifications?.length">
						{{ filteredNotifications?.length }}
					</span>
			</transition>
			
			<span> изменений</span>
		</div>
		
		<div class="notification-main__actions">
			<div class="notification-main__actions-sort">
				<ui-select
					:modal-value="activeSort"
					:items="filterCases"
					placeholder="Тип уведомления"
					@update:model-value="notificationStore.updateActiveSort"
				/>
				
				<transition name="counter" mode="out-in">
					<div
						v-if="activeSort"
						class="notification-main__actions-sort-cancel"
						@click="notificationStore.updateActiveSort(null)"
					>
						Сбросить
					</div>
				</transition>
			</div>
			
			<div class="notification-main__actions-reload">
				<ui-svg
					name="update"
					size="large"
					class="notification-main__actions-reload-icon"
					@click="refreshNotifications"
				/>
			</div>
		</div>
		
		<transition-group
			tag="div"
			class="notification-main__list"
			@before-enter="onBeforeEnter"
			@enter="onEnter"
			@leave="onLeave"
		>
			<notification-item
				v-for="(item, index) in filteredNotifications"
				:key="`notification-item_${item.id}_${index}`"
				:item="item"
				:cases="filterCases"
				:data-index="index"
				@update:item="notificationStore.updateNotificationItem(item)"
			/>
		</transition-group>
	</div>
</template>

<style lang="scss" scoped>

.counter-enter-active,
.counter-leave-active {
	transition: opacity 0.4s ease-in-out;
}
.counter-enter-from,
.counter-leave-to {
	opacity: 0;
}

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