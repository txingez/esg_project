<script setup>

import Banner from "../components/Banner.vue";
import {useContentStore} from "../stores/useContentStore.js";
import BreadCrumb from "../components/BreadCrumb.vue";
import {onMounted, ref} from "vue";
import {getPosts} from "../services/posts.js";
import axios from "axios";
import {useRouter} from "vue-router";

const contentStore = useContentStore()
const router = useRouter()

const popularArticles = ref([])
const relatedNews = ref([])

const routes = [
    {name: 'Home', to: '/'},
    {name: 'Thư viện', to: '/library'}
]

onMounted(() => {
    const getPopularArticles = getPosts(contentStore.state.pageId, 5, 0)
    const getRelatedNews = getPosts(contentStore.state.pageId, 5, 5)
    axios.all([getPopularArticles, getRelatedNews]).then((responses) => {
        popularArticles.value = responses[0].data
        relatedNews.value = responses[1].data
    }).catch((err) => {
        console.log(err)
    })
})

const handleSeeDetail = document => {
    const newState = {
        pageId: contentStore.state.pageId,
        title: document.title,
        content: document.content,
        image: document.image,
        source: document.source,
        releaseDate: document.release_date
    }
    contentStore.update(newState)
    router.push(`/library/detail/${document.id}`)
}
</script>

<template>
    <div class="flex xl:gap-16 lg:gap-10 md:gap-5 md:flex-row flex-col md:px-10 lg:px-[50px] xl:px-[50px] px-5 py-10">
        <div class="basis-2/3">
            <div class="space-y-5" v-if="contentStore.state.content">
                <Banner :img-src="contentStore.state.image" label=""/>
                <BreadCrumb :routes="routes"/>
                <div class="font-bold xl:text-4xl md:text-3xl text-2xl text-[#15B9A0]">
                    {{ contentStore.state.title.toUpperCase() }}
                </div>
                <div class="flex md:gap-5 gap-2 mb-2 italic md:flex-row flex-col text-[#9ca3af]">
                    <div>Nguồn: <span>{{ contentStore.state.source }}</span></div>
                    <div>Ngày phát hành: <span>{{ contentStore.state.releaseDate }}</span></div>
                </div>
                <div v-html="contentStore.state.content"/>
            </div>

            <div>
                <a-divider/>
                <div class="xl:text-4xl md:text-3xl text-xl mb-10 font-bold">Bài viết phổ biến</div>
                <div class="space-y-5">
                    <div v-for="popularArticle in popularArticles"
                         class="flex gap-5 md:flex-row flex-col">
                        <div class="xl:basis-1/3 md:basis-1/2">
                            <a v-if="popularArticle.content_type === 'LINK'" :href="popularArticle.content"
                               target="_blank">
                                <img class="lg:h-[200px] md:h-[150px] h-[200px] w-full" :src="popularArticle.image" alt="">
                            </a>
                            <a v-else @click.prevent="handleSeeDetail(popularArticle)">
                                <img class="lg:h-[200px] md:h-[150px] h-[200px] w-full" :src="popularArticle.image" alt="">
                            </a>
                        </div>
                        <div class="xl:basis-2/3 md:basis-1/2">
                            <a v-if="popularArticle.content_type === 'LINK'"
                               :href="popularArticle.content"
                               target="_blank"
                               class="xl:text-2xl md:text-base hover:text-[#2563eb] text-[#60a5fa]">
                                {{ popularArticle.title }}
                            </a>
                            <a v-else
                               @click.prevent="handleSeeDetail(popularArticle)"
                               class="xl:text-2xl md:text-base hover:text-[#2563eb] text-[#60a5fa]">
                                {{ popularArticle.title }}
                            </a>
                            <div class="italic text-[#9ca3af]">
                                <div>Nguồn: <span>{{ popularArticle.source }}</span></div>
                                <div>Ngày phát hành: <span>{{ popularArticle.release_date }}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="basis-1/3 md:m-0 mt-5">
            <div class="text-xl mb-5 bg-[#072608] text-white p-2">Tin tức liên quan</div>
            <div class="space-y-5">
                <div v-for="news in relatedNews"
                     class="flex gap-5 xl:flex-row flex-col">
                    <div class="xl:basis-1/3 md:basis-1/2">
                        <a v-if="news.content_type === 'LINK'" :href="news.content"
                           target="_blank">
                            <img class="xl:h-[100px] md:h-[150px] h-[200px] w-full" :src="news.image" alt="">
                        </a>
                        <a v-else @click.prevent="handleSeeDetail(news)">
                            <img class="xl:h-[100px] md:h-[150px] h-[200px] w-full" :src="news.image" alt="">
                        </a>
                    </div>
                    <div class="xl:basis-2/3 md:basis-1/2">
                        <a v-if="news.content_type === 'LINK'"
                           :href="news.content"
                           target="_blank"
                           class="text-base hover:text-[#2563eb] text-[#60a5fa]">
                            {{ news.title }}
                        </a>
                        <a v-else
                           @click.prevent="handleSeeDetail(news)"
                           class="text-base hover:text-[#2563eb] text-[#60a5fa]">
                            {{ news.title }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
