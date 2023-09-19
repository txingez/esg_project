<script setup>

import Banner from "../components/Banner.vue";
import {onMounted, ref} from "vue";
import {getPosts} from "../services/posts.js";
import BreadCrumb from "../components/BreadCrumb.vue";
import AOS from 'aos'

const eventsToShow = ref([])
const newsToShow = ref([])
const currentOffsetEvents = ref(0)
const currentOffsetNews = ref(0)
const isAllEvent = ref(false)
const isAllNews = ref(false)
const loadingEvent = ref(false)
const loadingNews = ref(false)

const routes = [
    {name: 'Home', to: '/'},
    {name: 'Tin tức và sự kiện', to: '/event'},
]

onMounted(() => {
    AOS.init()
    getEventData(currentOffsetEvents.value)
    getNewsData(currentOffsetNews.value)
})

const showMore = isEvent => {
    if (isEvent) {
        getEventData(currentOffsetEvents.value + 8)
        currentOffsetEvents.value += 8
    } else {
        getNewsData(currentOffsetNews.value + 8)
        currentOffsetNews.value += 8
    }
}

const getEventData = (offset, limit = 8) => {
    loadingEvent.value = true
    getPosts('ATV', limit, offset, 'EVENT')
        .then((response) => {
            eventsToShow.value = [...eventsToShow.value, ...response.data]
            if (response.data.length < limit) isAllEvent.value = true
            loadingEvent.value = false
        })
        .catch((err) => {
            console.log(err)
            loadingEvent.value = false
        })
}

const getNewsData = (offset, limit = 8) => {
    loadingNews.value = true
    getPosts('ATV', limit, offset, 'NEWS')
        .then((response) => {
            newsToShow.value = [...newsToShow.value, ...response.data]
            if (response.data.length < limit) isAllNews.value = true
            loadingNews.value = false
        })
        .catch((err) => {
            console.log(err)
            loadingNews.value = false
        })
}
</script>

<template>
    <Banner label="tin tức và sự kiện"
            img-src="https://lh3.googleusercontent.com/pw/AIL4fc_hYi5ZP_Q3Uq-sw5CBb0c123bFv0FIn-bK8GLtWKiMtbmBWA3BxFS6HSgGNATY4wk6se2X_UfuwlpclwceK46GQFc431_bh2DRT1yNPVOIcP6kt1PECKl8L2cIXNYjr51qjncyRLpJF32ohX4oG0yY=w1280-h800-s-no?authuser=0"/>

    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 mt-2.5">
        <BreadCrumb :routes="routes"/>
    </div>
    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
        <div class="flex flex-col gap-10">
            <div class="font-bold md:text-4xl xl:text-5xl text-3xl">
                Tin tức
            </div>
            <a-spin :spinning="loadingNews">
                <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
                    <a-card hoverable v-for="news in newsToShow"
                            data-aos="fade-right"
                            data-aos-easing="ease-in-out"
                            data-aos-duration="500">
                        <template #cover>
                            <a class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all"
                               :href="news.content"
                               target="_blank">
                                <img class="h-[200px] w-full hover:scale-110 transition-all"
                                     loading="lazy"
                                     :src="news.image"
                                     :alt="news.image">
                            </a>
                        </template>
                        <div class="space-y-2">
                            <a :href="news.content" target="_blank"
                               class="font-bold line-clamp-2 text-ellipsis text-base">
                                {{ news.title }}
                            </a>
                            <div>
                                <div>Nguồn: <span>{{ news.source }}</span></div>
                                <div>Đăng ngày: <span>{{ news.release_date }}</span></div>
                            </div>
                        </div>
                    </a-card>
                </div>
            </a-spin>
            <div class="text-center" v-if="!isAllNews">
                <a-button @click.prevent="showMore(false)" class="min-h-[50px] min-w-[150px]">Xem thêm</a-button>
            </div>
        </div>
    </div>

    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
        <div class="flex flex-col gap-10">
            <div class="font-bold md:text-4xl xl:text-5xl text-3xl">
                Sự kiện
            </div>
            <a-spin :spinning="loadingEvent">
                <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
                    <a-card hoverable v-for="event in eventsToShow"
                            data-aos="fade-left"
                            data-aos-easing="ease-in-out"
                            data-aos-duration="500">
                        <template #cover>
                            <a class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all"
                               :href="event.content"
                               target="_blank">
                                <img class="h-[200px] w-full hover:scale-110 transition-all"
                                     loading="lazy"
                                     :src="event.image"
                                     :alt="event.image">
                            </a>
                        </template>
                        <div class="space-y-2">
                            <a :href="event.content" target="_blank"
                               class="font-bold line-clamp-2 text-ellipsis text-base">
                                {{ event.title }}
                            </a>
                            <div>
                                <div>Nguồn: <span>{{ event.source }}</span></div>
                                <div>Đăng ngày: <span>{{ event.release_date }}</span></div>
                            </div>
                        </div>
                    </a-card>
                </div>
            </a-spin>
            <div class="text-center" v-if="!isAllEvent">
                <a-button @click.prevent="showMore(true)" class="min-h-[50px] min-w-[150px]">Xem thêm</a-button>
            </div>
        </div>
    </div>

</template>

<style scoped>
:deep(.ant-card-body) {
    padding: 20px;
}
</style>
