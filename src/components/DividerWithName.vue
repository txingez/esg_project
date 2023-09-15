<script setup>
defineProps({
    label: String
})
</script>

<template>
    <div class="relative md:mx-[140px] lg:mx-[200px] mx-[80px] my-5 font-semibold md:text-lg xl:text-xl text-base
    before:content-[''] before:block before:bg-black before:h-[3px] before:absolute
    md:before:w-[70px] before:w-[50px] before:top-[45%]
    md:before:left-[-100px] before:left-[-60px]">
        {{ label.toUpperCase() }}
    </div>
</template>
