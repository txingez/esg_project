<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
defineProps({
    slides: Array
})

const handleClickBtn = target => {
    window.open(target, target.includes('esg-demo.web.app') ? '_self' : '_blank')
}
</script>

<template>
    <a-carousel arrows class="h-full">
        <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px">
                <font-awesome-icon icon="fa-solid fa-chevron-left"/>
            </div>
        </template>
        <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
                <font-awesome-icon icon="fa-solid fa-chevron-right"/>
            </div>
        </template>
        <div v-for="banner in slides" class="relative h-full">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            flex flex-col lg:gap-5 md:gap-2.5 gap-2 w-full h-full justify-end items-start lg:p-14 md:p-8 p-5">
                <div class="p-1.5 break-after-auto font-bold whitespace-pre-wrap
                text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 w-full"
                     :class="banner.placeTitle === 'center' ? 'text-center md:-translate-y-1/3 xl:text-8xl lg:text-7xl md:text-5xl text-4xl' : 'md:text-5xl lg:text-6xl xl:text-7xl text-2xl'">
                    {{ banner.title }}
                </div>
                <div class="whitespace-pre-wrap xl:text-2xl lg:text-lg md:text-base text-xs italic xl:pr-72 lg:pr-32 md:pr-28 pr-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
                    {{ banner.description }}
                </div>
                <div style="border-image: linear-gradient(45deg, #60a5fa, #22c55e) 1"
                     class="md:px-6 px-3 md:py-2 lg:py-3 md:text-base xl:text-2xl md:min-h-[50px] min-h-[30px] flex justify-center items-center border rounded border-image hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-500 hover:cursor-pointer
                     text-transparent bg-gradient-to-r bg-clip-text from-blue-400 to-green-500 hover:bg-clip-padding hover:text-white"
                     :class="banner.labelBtn ? '' : 'invisible'"
                     @click.prevent="handleClickBtn(banner.target)">
                    {{ banner.labelBtn }}
                </div>
            </div>
            <div class="h-full">
                <img class="w-full h-full"
                     loading="lazy"
                     :src="banner.image[0]?.url"
                     alt="carousel">
            </div>
        </div>
    </a-carousel>
</template>

<style scoped>
:deep(.slick-slide) {
    height: calc(100vh - 152px);
}

:deep(.slick-slide>div) {
    height: 100%;
}

@media screen and (max-width: 430px) {
    :deep(.slick-slide) {
        height: 300px;
    }
}

@media screen and (min-width: 431px) and (max-width: 768px) {
    :deep(.slick-slide) {
        height: 400px;
    }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
    :deep(.slick-slide) {
        height: 600px;
    }
}


:deep(.slick-arrow.custom-slick-arrow) {
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: #fff;
    transition: ease all 0.3s;
    z-index: 1;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff;
    opacity: 0.5;
}

:deep(.slick-slide h3) {
    color: #fff;
}
</style>
