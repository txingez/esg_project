<script setup>
defineProps({
    label: String,
    imgSrc: String
})

</script>

<template>
    <div class="relative md:h-[300px] xl:h-[500px]">
        <div class="text-white md:text-5xl xl:text-7xl text-base font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col md:gap-5 gap-2">
            <div class="text-center">
                {{ label.toUpperCase() }}
            </div>
        </div>
        <img class="h-full w-full" :src="imgSrc" alt="banner">
    </div>
</template>
