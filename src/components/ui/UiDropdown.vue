<script lang="ts" setup>
import { NotificationCase } from '@/types/notification.cases.ts'

const props = withDefaults(defineProps<{
	items?: NotificationCase[]
	updateSort?: (item: NotificationCase) => void
}>(), {
	items: () => [],
	updateSort: () => {}
})
</script>

<template>
  <ul class="ui-dropdown">
	  <li
	    v-for="(item, index) in props.items"
	    :key="`dropdown-item_${item.id}_${index}`"
	    class="ui-dropdown__item text-14-reg"
	    @click="updateSort(item)"
	  >
		 {{ item.name }}
	  </li>
  </ul>
</template>

<style lang="scss" scoped>

.ui-dropdown {
	display: flex;
	flex-direction: column;
	background-color: $white;
	color: $gray500;
	list-style-type: none;
	box-shadow: 0 10px 20px 0 rgba(186, 197, 211, .15);
	border: 1px solid $gray200;
	gap: 8px;
	border-radius: 15px;
	padding: 19px;
	margin: 0;
	min-width: 319px;
	
	&__item {
		cursor: pointer;
		padding: 8px 0 8px 16px;
		border-radius: 12px;
		transition: background-color .3s ease;
		
		&:hover {
			background-color: $gray200;
		}
	}
}
</style>
