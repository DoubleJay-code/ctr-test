<script lang="ts" setup>
import { NotificationCase, NotificationCaseCode, NotificationItem } from '@/types/notification.ts'
import { computed } from 'vue'
import { iconColors, iconNames } from '@/helpers/icon.ts'

const props = withDefaults(defineProps<{
	item?: NotificationItem | null
	cases?: NotificationCase[]
}>(), {
	item: null,
	cases: () => []
})
const emit = defineEmits<{ (e: 'update:item', item: NotificationItem): void }>()

const getInfo = computed(() => {
	const currentCase = props.cases.find((item: NotificationCase) => item.id === props.item.case )
	
	return {
		iconName: iconNames[currentCase?.code ?? NotificationCaseCode.NEW_CATEGORY],
		iconColor: iconColors[currentCase?.code ?? NotificationCaseCode.NEW_CATEGORY],
		label: currentCase?.description ?? ''
	}
})

const updateItem = (): void => {
	emit('update:item', { ...props.item, unread: !props.item.unread })
}
</script>

<template>
	<div class="notification-item" :class="{ 'notification-item--unread': item?.unread }">
		<router-link class="notification-item__info" :to="`/notifications/${props.item.id}`">
			<ui-svg
				:name="getInfo.iconName"
				class="notification-item__info-icon"
				:class="[`notification-item__info-icon_color_${getInfo.iconColor}`]"
			/>
			
			<div>
				<div class="text-14-reg notification-item__info-type" :class="{ 'text-14-bold': item?.unread }">
					{{ getInfo.label }}
				</div>
				
				<div v-if="props.item.cat || props.item.id" class="text-12-reg notification-item__info-description">
					{{ item.cat }} (ID {{ item.id }})
				</div>
			</div>
		</router-link>
		
		<div class="notification-item__action" @click="updateItem">
			<ui-button>
				{{ item.unread ? 'Прочитать' : 'Отметить непрочитанным' }}
			</ui-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>

.notification-item {
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	gap: 5px;
	transition: background-color .3s ease;
	
	&--unread {
		background-color: $blue100;
	}
	
	&__info {
		display: flex;
		flex-grow: 1;
		text-decoration: none;
		color: $gray500;
		gap: 16px;
		padding: 16px 0 20px 28px;
		
		&-icon {
			flex-shrink: 0;
			
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
		
		&-type {
			transition: color .3s ease;
		}
		
		&-description {
			color: $gray400;
			margin-top: 4px;
		}
	}
	
	&__action {
		flex-shrink: 0;
		padding: 21px 32px 19px 0;
	}
}
</style>