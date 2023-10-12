<script setup>
import Banner from "../components/Banner.vue";
import { onMounted, ref } from "vue";
import { getPosts } from "../services/posts.js";
import { useRouter } from "vue-router";
import BreadCrumb from "../components/BreadCrumb.vue";
import AOS from 'aos'

const router = useRouter()

const documentToShow = ref([])
const currentOffset = ref(0)
const isAll = ref(false)
const spinning = ref(false)

const routes = [
	{name: 'Home', to: '/'},
	{name: 'Thư viện', to: '/library'},
]

onMounted(() => {
	AOS.init()
	getData(currentOffset.value)
})

const showMore = () => {
	getData(currentOffset.value + 8)
	currentOffset.value += 8
}

const getData = (offset, limit = 8) => {
	spinning.value = true
	getPosts('lib', limit, offset)
		.then((response) => {
			spinning.value = false
			documentToShow.value = [...documentToShow.value, ...response.data]
			if (response.data.length < limit) isAll.value = true
		})
		.catch((err) => {
			spinning.value = false
			console.log(err)
		})
}

const handleSeeDetail = document => {
	router.push(`/library/detail/${document.id}`)
}
</script>

<template>
    <Banner img-src="https://lh3.googleusercontent.com/pw/AIL4fc8umb00bUiyApY-CNIJOr9b77DQzeMuLO9zjlr1ic3v3eFInBuv4rFiEU9FljLSplY8PWFkyMZ51bmJ8er16Q56UrCA1gmXA1d2U3iSDGC2FCCmxIva-fsyf1rphoIyBhVG3FNbXrg6ZESxBxbn2AGG=w1600-h900-s-no?authuser=0"
            label="thư viện"/>

    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 mt-2.5">
        <BreadCrumb :routes="routes"/>
    </div>

    <a-spin :spinning="spinning">
        <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10 space-y-5">
            <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
                <a-card v-for="document in documentToShow" data-aos="fade-right"
                        data-aos-duration="500"
                        data-aos-easing="ease-in-out"
                        hoverable>
                    <template #cover class="overflow-hidden">
                        <a v-if="document.content_type === 'LINK'"
                           :href="document.content"
                           class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all" target="_blank">
                            <img :alt="document.image"
                                 :src="document.image"
                                 class="lg:h-[200px] md:h-[150px] h-[200px] w-full hover:scale-110 transition-all"
                                 loading="lazy">
                        </a>
                        <a v-else
                           class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all" @click.prevent="handleSeeDetail(document)">
                            <img :alt="document.image"
                                 :src="document.image"
                                 class="lg:h-[200px] md:h-[150px] h-[200px] w-full hover:scale-110 transition-all"
                                 loading="lazy">
                        </a>
                    </template>
                    <div class="space-y-2">
                        <a v-if="document.content_type === 'LINK'" :href="document.content" class="font-bold line-clamp-2 text-ellipsis text-base"
                           target="_blank">
                            {{ document.title }}
                        </a>
                        <a v-else
                           class="font-bold line-clamp-2 text-ellipsis text-base"
                           @click.prevent="handleSeeDetail(document)">
                            {{ document.title }}
                        </a>
                        <div>
                            <div>Nguồn: <span>{{ document.source }}</span></div>
                            <div>Ngày phát hành: <span>{{ document.release_date }}</span></div>
                        </div>
                    </div>
                </a-card>
            </div>
            <div v-if="!isAll" class="text-center">
                <a-button class="min-h-[50px] min-w-[150px]" @click.prevent="showMore">Xem thêm</a-button>
            </div>
        </div>
    </a-spin>
</template>
