<template>
  <div class="app">
	  <router-view v-slot="{ Component}">
		  <transition name="route-transition" appear>
			  <component :is="Component" />
		  </transition>
	  </router-view>
  </div>
</template>

<style lang="scss" scoped>

.route-transition-enter-active {
	animation: route-animation 1s;
}

.route-transition-leave-active {
	animation: route-animation 1s reverse;
}

@keyframes route-animation {
	0% {
		opacity: 0;
	}
	
	100% {
		opacity: 1;
	}
}
</style>