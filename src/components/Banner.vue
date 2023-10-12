<script setup>
defineProps({
	label: String,
	imgSrc: String
})

</script>

<template>
    <div class="relative xl:h-[500px] md:h-[300px] h-[200px]">
        <div class="text-white md:text-5xl xl:text-7xl text-base font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col md:gap-5 gap-2 w-full">
            <div class="text-center whitespace-pre-wrap w-full">
                <span v-if="label">{{ label.toUpperCase() }}</span>
                <slot/>
            </div>
        </div>
        <img :src="imgSrc"
             alt="banner"
             class="object-cover aspect-auto h-full w-full"
             loading="eager">
    </div>
</template>
