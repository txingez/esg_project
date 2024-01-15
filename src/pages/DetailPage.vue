<script setup>

import Banner from "../components/Banner.vue";
import BreadCrumb from "../components/BreadCrumb.vue";
import { computed, onMounted, ref, watch } from "vue";
import { getPost, getPosts } from "../services/posts.js";
import axios from "axios";
import { useRouter } from "vue-router";
import { handleGoogleImageLink } from "../utils/handleGoogleImageLink.js";

const router = useRouter()

const popularArticles = ref([])
const relatedNews = ref([])
const detailContent = ref(null)


const routes = computed(() => {
  const routeName = router.currentRoute.value.name
  const detail = (() => {
    switch (routeName) {
      case 'LibraryDetail':
        return {name: 'Thư viện', to: '/library'}
      case 'NewsDetail':
        return {name: 'Tin tức', to: '/events'}
    }
  })()
  return [
    {name: 'Home', to: '/'},
    detail,
    {
      name: detailContent ? detailContent.value.title : 'Bài viết'
    }]
})

onMounted(() => {
  const id = router.currentRoute.value.params.id
  getData(id)
})

const getData = (id) => {
  getPost(id).then((response) => {
    const pageId = response.data.page_id
    let containerDiv = document.createElement('div')
    containerDiv.innerHTML = response.data.content
    let imgTags = containerDiv.getElementsByTagName('img');
    for (const img of imgTags) {
      img.src = handleGoogleImageLink(img.src)
    }
    detailContent.value = {...response.data, ...{content: containerDiv.innerHTML.toString()}}

    const getPopularArticles = getPosts(pageId, 5, 0)
    const getRelatedNews = getPosts(pageId, 5, 5)
    axios.all([getPopularArticles, getRelatedNews]).then((responses) => {
      popularArticles.value = responses[0].data
      relatedNews.value = responses[1].data
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    console.log(err)
  })
}

watch(router.currentRoute, (newRoute) => {
  const id = newRoute.params.id
  getData(id)
})

const handleSeeDetail = document => {
  let type = (() => {
    switch (document.category) {
      case 'EVENT':
      case 'NEWS':
        return 'news'
      default:
        return 'library'
    }
  })()
  router.push(`/${type}/detail/${document.id}`)
}
</script>

<template>
  <div class="flex xl:gap-16 lg:gap-10 md:gap-5 md:flex-row flex-col md:px-10 lg:px-[50px] xl:px-[50px] px-5 py-10">
    <div class="basis-2/3 max-w-[1150px]">
      <div v-if="detailContent" class="space-y-5">
        <Banner :img-src="detailContent.image" label=""/>
        <BreadCrumb :routes="routes"/>
        <div class="font-bold xl:text-4xl md:text-3xl text-2xl text-[#15B9A0]">
          {{ detailContent.title.toUpperCase() }}
        </div>
        <div class="flex md:gap-5 gap-2 mb-2 italic md:flex-row flex-col text-[#9ca3af]">
          <div>Nguồn: <span>{{ detailContent.source }}</span></div>
          <div>Ngày phát hành: <span>{{ detailContent.release_date }}</span></div>
        </div>
        <div class="text-gray-600" v-html="detailContent.content"/>
      </div>

      <div>
        <a-divider/>
        <div class="xl:text-4xl md:text-3xl text-xl mb-10 font-bold text-gray-600">Bài viết phổ biến</div>
        <div class="space-y-5">
          <div v-for="popularArticle in popularArticles"
               class="flex gap-5 md:flex-row flex-col">
            <div class="xl:basis-1/3 md:basis-1/2">
              <a v-if="popularArticle.content_type === 'LINK'" :href="popularArticle.content"
                 target="_blank">
                <img :src="handleGoogleImageLink(popularArticle.image)" alt=""
                     class="lg:h-[200px] md:h-[150px] h-[200px] w-full">
              </a>
              <a v-else @click.prevent="handleSeeDetail(popularArticle)">
                <img :src="handleGoogleImageLink(popularArticle.image)" alt=""
                     class="lg:h-[200px] md:h-[150px] h-[200px] w-full">
              </a>
            </div>
            <div class="xl:basis-2/3 md:basis-1/2">
              <a v-if="popularArticle.content_type === 'LINK'"
                 :href="popularArticle.content"
                 class="xl:text-2xl md:text-base hover:text-[#2563eb] text-[#60a5fa]"
                 target="_blank">
                {{ popularArticle.title }}
              </a>
              <a v-else
                 class="xl:text-2xl md:text-base hover:text-[#2563eb] text-[#60a5fa]"
                 @click.prevent="handleSeeDetail(popularArticle)">
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
              <img :src="handleGoogleImageLink(news.image)" alt="" class="xl:h-[100px] md:h-[150px] h-[200px] w-full">
            </a>
            <a v-else @click.prevent="handleSeeDetail(news)">
              <img :src="handleGoogleImageLink(news.image)" alt="" class="xl:h-[100px] md:h-[150px] h-[200px] w-full">
            </a>
          </div>
          <div class="xl:basis-2/3 md:basis-1/2">
            <a v-if="news.content_type === 'LINK'"
               :href="news.content"
               class="text-base hover:text-[#2563eb] text-[#60a5fa]"
               target="_blank">
              {{ news.title }}
            </a>
            <a v-else
               class="text-base hover:text-[#2563eb] text-[#60a5fa]"
               @click.prevent="handleSeeDetail(news)">
              {{ news.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
