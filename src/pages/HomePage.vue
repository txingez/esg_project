<script setup>
import DividerWithName from "../components/DividerWithName.vue";
import Carousel from "../components/Carousel.vue";
import {onMounted, reactive, ref} from "vue";
import AOS from 'aos'
import {getHotNews, getPosts} from "../services/posts.js";
import {useJwt} from "@vueuse/integrations/useJwt";
import axios from "axios";

const pageData = reactive({
    carouselData: [],
    introduction: '',
    titleMission: '',
    imageMission: [],
    missions: [],
    descriptionEvaluate: '',
    evaluateSlides: [],
    hotNews: []
})
const screenWidth = ref(0)
const loading = ref(false)

const routes = [
    {name: 'Home', to: '/'}
]

const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
}
const onScreenResize = () => {
    window.addEventListener("resize", () => {
        updateScreenWidth();
    });
}

onMounted(() => {
    updateScreenWidth()
    onScreenResize()
    AOS.init()
    loading.value = true
    axios.all([getPosts('HOME', 10, 0), getHotNews(4)])
        .then(
            axios.spread((getPostResponse, getHotNewsResponse) => {
                const getPostDataDecoded = useJwt(getPostResponse.data[0].content).payload.value
                pageData.introduction = getPostDataDecoded.data.introduction
                pageData.titleMission = getPostDataDecoded.data.titleMission
                pageData.imageMission = getPostDataDecoded.data.imageMission
                pageData.missions = getPostDataDecoded.data.missions
                pageData.descriptionEvaluate = getPostDataDecoded.data.descriptionEvaluate
                pageData.evaluateSlides = getPostDataDecoded.data.evaluateSlides
                pageData.carouselData = getPostDataDecoded.data.bannerSlides

                pageData.hotNews = getHotNewsResponse.data.data.map(hotNews => ({
                    title: hotNews.title,
                    href: hotNews.content,
                    description: hotNews.description,
                    thumbnail: hotNews.image
                }))
            })
        )
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            loading.value = false
        })
})
</script>

<template>
    <Carousel v-if="pageData.carouselData.length !== 0" :slides="pageData.carouselData"/>

    <div>
        <DividerWithName label="GIỚI THIỆU"/>
        <div class="md:px-10 lg:px-[100px] px-5 mb-10">
            <div class="!p-0 ql-editor" v-html="pageData.introduction"/>
        </div>
    </div>

    <div class="bg-[#46c585]">
        <div class="flex min-h-[800px] xl:flex-row flex-col xl:gap-5 gap-5">
            <div class="flex gap-5 flex-col basis-1/2">
                <DividerWithName label="mục tiêu"/>
                <div class="md:pl-10 lg:pl-[100px] pl-5 md:pr-10 lg:pr-[100px] xl:pr-0 pr-5 space-y-14">
                    <div class="md:text-3xl xl:text-2xl text-2xl font-bold">
                        <div class="!p-0 ql-editor" v-html="pageData.titleMission"/>
                    </div>
                    <div class="flex gap-5 flex-wrap">
                        <div v-for="mission in pageData.missions"
                             class="md:basis-[48%] flex gap-2 flex-col"
                             data-aos="flip-left"
                             data-aos-easing="ease-in-out"
                             data-aos-duration="500">
                            <div>
                                <img :src="mission.icon"
                                     class="md:w-[100px] w-[70px] md:h-[100px] h-[70px] relative left-[-7px]"
                                     alt="icon">
                            </div>
                            <div class="md:text-xl text-base text-stone-800">
                                <div class="ql-editor !p-0" v-html="mission.content"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="basis-1/2">
                <img :src="pageData.imageMission[0]?.url"
                     class="h-full w-full"
                     alt="mission_block_image">
            </div>
        </div>
    </div>

    <div>
        <DividerWithName label="BỘ CÔNG CỤ ĐÁNH GIÁ KINH DOANH BỀN VỮNG"/>
        <div class="md:px-10 lg:px-[100px] px-5 space-y-10 mb-10">
            <div class="grid md:grid-cols-2 grid-cols-1 xl:gap-20 gap-5">
                <div class="text-justify"
                     data-aos="fade-down"
                     data-aos-easing="ease-in-out"
                     data-aos-duration="500">
                    <div class="ql-editor !p-0" v-html="pageData.descriptionEvaluate"/>
                </div>
                <div class="rounded-[10px]"
                     data-aos="fade-up"
                     data-aos-easing="ease-in-out"
                     data-aos-duration="500">
                    <a-carousel class="carousel-container rounded-[10px]" id="overview" arrows>
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
                        <div v-for="slide in pageData.evaluateSlides"
                             class="relative overview-block h-full w-full text-black rounded-[10px]">
                            <div class="w-full rounded-[10px]">
                                <img :src="slide.image[0]?.url"
                                     class="object-cover h-full w-full rounded-[10px]"
                                     loading="lazy"
                                     :alt="slide.image[0]?.url">
                            </div>

                            <div class="rounded-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-[rgba(0,0,0,0.4)] flex flex-col gap-5 justify-center items-center">
                                <div class="text-white slide-name xl:text-2xl lg:text-xl text-lg text-center">
                                    <div class="ql-editor !p-0" v-html="slide.title"/>
                                </div>
                                <a-button class="text-white h-fit min-h-[50px] md:text-base xl:text-lg">
                                    <a :href="slide.target" target="_blank">
                                        Đánh giá ngay
                                    </a>
                                </a-button>
                            </div>
                        </div>
                    </a-carousel>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-[#46c585]">
        <DividerWithName label="tin tức và sự kiện"/>
        <div class="md:px-10 lg:px-[100px] px-5 space-y-5 mb-10">
            <div class="flex lg:gap-10 xl:gap-5 gap-5 md:flex-row flex-col flex-wrap justify-between">
                <a-card v-for="news in pageData.hotNews"
                        class="md:basis-[48%] lg:basis-[45%] xl:basis-[23%] basis-full"
                        data-aos="fade-down"
                        data-aos-easing="ease-in-out"
                        data-aos-duration="500">
                    <template #cover>
                        <a class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all"
                           :href="news.href" target="_blank">
                            <img class="lg:h-[200px] md:h-[150px] h-[200px] w-full hover:scale-110 transition-all"
                                 :src="news.thumbnail"
                                 loading="lazy"
                                 :alt="news.thumbnail">
                        </a>
                    </template>
                    <div class="space-y-2">
                        <a :href="news.href" target="_blank"
                           class="font-bold line-clamp-2 text-ellipsis text-base">
                            {{ news.title }}
                        </a>
                        <div class="text-[14px] line-clamp-4 text-ellipsis text-justify">{{ news.description }}</div>
                    </div>
                </a-card>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.carousel-container .slick-slide) {
  height: 250px;
  width: 100%;
  border-radius: 10px;
}

:deep(.carousel-container .slick-slide div) {
  height: 100%;
  border-radius: 10px;
}

:deep(.carousel-container .slick-slide .overview-block) {
  display: flex !important;
}

:deep(.ant-carousel .slick-dots li button) {
  background: #94a3b8;
}

:deep(.carousel-container .slick-arrow.custom-slick-arrow) {
  width: 15px;
  height: 15px;
  font-size: 15px;
  color: #e5e7eb;
  transition: ease all 0.3s;
  opacity: 0.7;
  z-index: 1;
}

:deep(.carousel-container .slick-arrow.custom-slick-arrow:before) {
  display: none;
}

:deep(.carousel-container .slick-arrow.custom-slick-arrow:hover) {
  color: #e5e7eb;
  opacity: 0.5;
}

.slide-name {
  height: fit-content !important;
}
</style>
