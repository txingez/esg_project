<template>
    <a-breadcrumb :routes="routes" class="md:text-sm xl:text-base text-xs" separator=">">
        <template #itemRender="{ route, path }">
            <span v-if="routes.indexOf(route) === routes.length - 1">
                {{ route.name }}
            </span>
            <router-link v-else-if="route.name === 'Home'" :to="route.to">
                Trang chủ
            </router-link>
            <router-link v-else :to="route.to">
                {{ route.name }}
            </router-link>
        </template>
    </a-breadcrumb>
</template>

<script setup>

defineProps({
	routes: {
		default: []
	}
})
</script>

<style scoped>
:deep(.ant-breadcrumb-link a) {
    height: 100%;
}
</style>
