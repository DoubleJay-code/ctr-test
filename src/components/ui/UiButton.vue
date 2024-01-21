<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'
import { computed, resolveComponent } from 'vue'

const RouterLink = resolveComponent('RouterLink')

const props = withDefaults(defineProps<{
  prependIcon?: string
  appendIcon?: string
  to?: RouteLocationRaw
  href?: string
  target?: '_blank' | '_self'
}>(), {
  prependIcon: '',
  appendIcon: '',
  to: '',
  href: '',
  target: '_self'
})

const bindAttributes = computed<{ to?: RouteLocationRaw, href?: string, target?: string}>(() => {
	return props.to
		? { to: props.to }
		: props.href
			? { href: props.href, target: props.target }
			: {}
})
</script>

<template>
  <component
	  :is="props.href ? 'a' : props.to ? RouterLink : 'button'"
	  class="ui-button text-14-reg"
	  v-bind="bindAttributes"
  >
    <ui-svg
	    v-if="props.prependIcon"
	    :name="props.prependIcon"
	    class="ui-button__icon"
    />
	  
    <slot />
	  
    <ui-svg
	    v-if="props.appendIcon"
	    :name="props.appendIcon"
	    class="ui-button__icon"
    />
  </component>
</template>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
	text-decoration: none;
	cursor: pointer;
	background-color: transparent;
	color: $gray400;
	flex-shrink: 0;
	border: 1px solid $gray200;
	gap: 10px;
	border-radius: 15px;
	padding: 7px 23px;

  &__icon {
    color: currentColor;
    transition: color .3s ease;
  }
}
</style>
