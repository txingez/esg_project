<script setup>
defineProps({
	label: String
})
</script>

<template>
    <div class="md:px-10 lg:px-[100px] px-5 my-5 font-semibold md:text-lg xl:text-xl text-base">
        {{ label.toUpperCase() }}
    </div>
</template>
