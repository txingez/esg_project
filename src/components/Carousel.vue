<script setup>
import { useRouter } from "vue-router";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import { Arrow, AutoPlay, Fade, Pagination } from "@egjs/flicking-plugins";
import { ref } from "vue";

const router = useRouter()
defineProps({
	slides: Array
})

const plugins = ref([
	new AutoPlay({duration: 3000, direction: "NEXT", stopOnHover: true}),
	new Fade(),
	new Arrow(),
	new Pagination({
		type: 'bullet',
	})
])

const handleClickBtn = target => {
	window.open(target, target.includes('esg-demo.web.app') ? '_self' : '_blank')
}
</script>

<template>
    <div class="w-full h-[calc(100vh_-_165px_-_40px)] max-h-[850px] max-w-[1440px] m-[0_auto] px-10 py-5 relative">
        <Flicking :options="{ align: 'center', circular: true, adaptive: true }" :plugins="plugins"
                  class="rounded-[20px] !h-full max-h-[850px]">
            <div v-for="(banner, index) in slides" class="w-full h-full relative" :key="index">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                flex flex-col lg:gap-5 md:gap-2.5 gap-2 w-full h-full justify-end items-start lg:p-14 md:p-8 p-5">
                    <div :class="banner.placeTitle === 'center' ? 'text-center md:-translate-y-1/3 xl:text-8xl lg:text-7xl md:text-5xl text-4xl' : 'md:text-5xl lg:text-6xl xl:text-7xl text-2xl'"
                         class="p-1.5 break-after-auto font-bold whitespace-pre-wrap
                                    text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 w-full">
                        {{ banner.title }}
                    </div>
                    <div class="whitespace-pre-wrap xl:text-2xl lg:text-lg md:text-base text-xs italic xl:pr-72 lg:pr-32 md:pr-28 pr-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
                        {{ banner.description }}
                    </div>
                    <div :class="banner.labelBtn ? '' : 'invisible'"
                         class="md:px-6 px-3 md:py-2 lg:py-3 md:text-base xl:text-2xl md:min-h-[50px] min-h-[30px] flex justify-center items-center border rounded border-image hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-500 hover:cursor-pointer
                                         text-transparent bg-gradient-to-r bg-clip-text from-blue-400 to-green-500 hover:bg-clip-padding hover:text-white"
                         style="border-image: linear-gradient(45deg, #60a5fa, #22c55e) 1"
                         @click.prevent="handleClickBtn(banner.target)">
                        {{ banner.labelBtn }}
                    </div>
                </div>
                <div class="h-full">
                    <img :src="banner.image[0]?.url"
                         class="h-full w-full"
                         :class="index === 2 ? '' : 'object-cover'"
                         alt="carousel"
                         loading="lazy">
                </div>
            </div>
            <template #viewport>
                <span class="flicking-arrow-prev"/>
                <span class="flicking-arrow-next"/>
                <div class="flicking-pagination"/>
            </template>
        </Flicking>
    </div>
</template>

<style scoped>
:deep(.flicking-pagination-bullet) {
    width: 50px;
    height: 3px;
    border-radius: 0;
}

:deep(.flicking-pagination-bullet-active) {
    background: #0E7AB7;
}

:deep(.flicking-arrow-prev:before), :deep(.flicking-arrow-prev:after), :deep(.flicking-arrow-next:before), :deep(.flicking-arrow-next:after) {
    background: #0E7AB7;
}
</style>
