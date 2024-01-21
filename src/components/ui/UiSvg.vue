<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  prefix?: string
  name?: string
  size?: 'small' | 'medium'
}>(), {
  prefix: 'icon',
  name: '',
  size: 'medium',
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" class="ui-svg" :class="[`ui-svg_size_${props.size}`]">
    <use :href="symbolId" />
  </svg>
</template>

<style scoped lang="scss">

.ui-svg {
  display: inline-block;
  flex-shrink: 0;
	color: $gray500;
  transition: color .3s ease, transform .3s ease;
	
	&_size {
		&_small {
			width: 16px;
			height: 16px;
		}
		
		&_medium {
			width: 20px;
			height: 20px;
		}
	}
}
</style>
