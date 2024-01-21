<script lang="ts" setup>
import NotificationMain from '@/components/notification/NotificationMain.vue'
</script>

<template>
	<suspense>
		<template #default>
			<div class="notifications-page">
				<h1>Уведомления</h1>
				
				<notification-main />
			</div>
		</template>
		
		<template #fallback>
			<div class="notifications-page">
				<h1>Уведомления</h1>
				
				<div class="notifications-page__loader text-14-reg">
					Загрузка...
				</div>
			</div>
		</template>
	</suspense>
</template>

<style lang="scss" scoped>

.notifications-page {
	display: flex;
	flex-direction: column;
	height: 100svh;
	gap: 4px;
	padding: 20px 32px;
	
	&__loader {
		display: flex;
		align-items: center;
		justify-content: center;
		color: $gray400;
		font-weight: 600;
		flex-grow: 1;
	}
}
</style>