<script lang="ts" setup>
import { useTippy } from 'vue-tippy'
import { computed, h, ref, watch } from 'vue'
import UiDropdown from '@/components/ui/UiDropdown.vue'
import { NotificationCase } from '@/types/notification.cases.ts'

const props = withDefaults(defineProps<{
	modalValue?: NotificationCase | null
	items?: NotificationCase[]
	placeholder?: string
}>(), {
	modalValue: null,
	items: () => [],
	placeholder: ''
})
const emit = defineEmits<{ (e: 'update:modelValue', value: NotificationCase): void }>()

const select = ref()
const tippyState = ref<boolean>(false)

const { hide } = useTippy(select, {
	content: h(UiDropdown, {
		items: props.items,
		updateSort: (item: NotificationCase) => {
			tippyState.value = false
			emit('update:modelValue', item)
		}
	}),
	arrow: false,
	trigger: 'click',
	interactive: true,
	offset: [0, 0],
	placement: 'bottom-start',
	onShow () {
		tippyState.value = true
	}
})

const getPlaceholder = computed<string>(() => {
	return props.modalValue ? props.modalValue.name : props.placeholder
})

watch(tippyState, () => {
	hide()
})
</script>

<template>
  <div ref="select" class="ui-select" :class="{ 'ui-select--active': props.modalValue }">
	  <div class="text-14-reg ui-select__placeholder">
		  {{ getPlaceholder }}
	  </div>
	  
	  <ui-svg name="arrow" size="small" class="ui-select__icon" />
  </div>
</template>

<style lang="scss" scoped>

.ui-select {
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	background-color: transparent;
	color: $gray400;
	flex-shrink: 0;
	border: 1px solid $gray200;
	gap: 8px;
	border-radius: 15px;
	padding: 11px 19px;
	transition: color .3s ease, border-color .3s ease;
	
	&--active {
		border-color: $violet;
		color: $violet;
		
		.ui-select__icon {
			color: $violet;
		}
	}
	
	&__icon {
		color: $gray300;
		transition: color .3s ease;
	}
}
</style>
