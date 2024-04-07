<script setup>

import Banner from "../components/Banner.vue";
import { onMounted, ref, watch } from "vue";
import { getPosts } from "../services/posts.js";
import BreadCrumb from "../components/BreadCrumb.vue";
import AOS from 'aos'
import { useRouter } from "vue-router";
import { handleGoogleImageLink } from "../utils/handleGoogleImageLink.js";
import { useI18n } from "vue-i18n";

const router = useRouter()
const {t, locale} = useI18n()

const eventsToShow = ref([])
const newsToShow = ref([])
const currentOffsetEvents = ref(0)
const currentOffsetNews = ref(0)
const isAllEvent = ref(false)
const isAllNews = ref(false)
const loadingEvent = ref(false)
const loadingNews = ref(false)

const routes = ref([
  {name: 'Home', to: '/'},
  {name: t("event_page.route_name"), to: '/event'},
])

watch(locale, () => {
  routes.value = [
    {name: 'Home', to: '/'},
    {name: t("event_page.route_name"), to: '/event'},
  ]
})

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

const handleSeeDetail = document => {
  router.push(`/news/detail/${document.id}`)
}
</script>

<template>
  <Banner
      img-src="https://lh3.googleusercontent.com/pw/AIL4fc_hYi5ZP_Q3Uq-sw5CBb0c123bFv0FIn-bK8GLtWKiMtbmBWA3BxFS6HSgGNATY4wk6se2X_UfuwlpclwceK46GQFc431_bh2DRT1yNPVOIcP6kt1PECKl8L2cIXNYjr51qjncyRLpJF32ohX4oG0yY=w1280-h800-s-no?authuser=0"
      :label="$t('event_page.banner_label')"/>

  <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
    <div class="mt-2.5">
      <BreadCrumb :routes="routes"/>
    </div>
    <div class="flex flex-col gap-10">
      <div class="font-bold md:text-4xl xl:text-5xl text-3xl text-gray-600">
        {{ $t("event_page.news_part_title") }}
      </div>
      <a-spin :spinning="loadingNews">
        <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
          <a-card v-for="news in newsToShow" data-aos="fade-right"
                  data-aos-duration="500"
                  data-aos-easing="ease-in-out"
                  hoverable>
            <template #cover>
              <a v-if="news.content_type === 'LINK'"
                 :href="news.content"
                 class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all"
                 target="_blank">
                <img :alt="news.image"
                     :src="handleGoogleImageLink(news.image)"
                     class="h-[200px] w-full hover:scale-110 transition-all"
                     loading="lazy">
              </a>
              <a v-else
                 class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all"
                 @click.prevent="handleSeeDetail(news)">
                <img :alt="news.image"
                     :src="handleGoogleImageLink(news.image)"
                     class="h-[200px] w-full hover:scale-110 transition-all"
                     loading="lazy">
              </a>
            </template>
            <div class="space-y-2">
              <a v-if="news.content_type === 'LINK'" :href="news.content"
                 class="font-bold line-clamp-2 text-ellipsis text-base"
                 target="_blank">
                {{ locale === 'en' && !!news.titleEn && news.titleEn !== '' ? news.titleEn : news.title }}
              </a>
              <a v-else
                 class="font-bold line-clamp-2 text-ellipsis text-base"
                 @click.prevent="handleSeeDetail(news)">
                {{ locale === 'en' && !!news.titleEn && news.titleEn !== '' ? news.titleEn : news.title }}
              </a>
              <div>
                <div>{{ $t("event_page.resource_label") }} <span>{{ news.source }}</span></div>
                <div>{{ $t("event_page.public_label") }} <span>{{ news.release_date }}</span></div>
              </div>
            </div>
          </a-card>
        </div>
      </a-spin>
      <div v-if="!isAllNews" class="text-center">
        <a-button class="min-h-[50px] min-w-[150px]" @click.prevent="showMore(false)">{{ $t("see_more_btn") }}</a-button>
      </div>
    </div>
  </div>

  <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
    <div class="flex flex-col gap-10">
      <div class="font-bold md:text-4xl xl:text-5xl text-3xl text-gray-600">
        {{ $t("event_page.event_part_title") }}
      </div>
      <a-spin :spinning="loadingEvent">
        <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
          <a-card v-for="event in eventsToShow" data-aos="fade-left"
                  data-aos-duration="500"
                  data-aos-easing="ease-in-out"
                  hoverable>
            <template #cover>
              <a :href="event.content"
                 class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all"
                 target="_blank">
                <img :alt="event.image"
                     :src="handleGoogleImageLink(event.image)"
                     class="h-[200px] w-full hover:scale-110 transition-all"
                     loading="lazy">
              </a>
            </template>
            <div class="space-y-2">
              <a v-if="event.content_type === 'LINK'" :href="event.content"
                 class="font-bold line-clamp-2 text-ellipsis text-base"
                 target="_blank">
                {{ locale === 'en' && !!event.titleEn && event.titleEn !== '' ? event.titleEn : event.title }}
              </a>
              <a v-else
                 class="font-bold line-clamp-2 text-ellipsis text-base"
                 @click.prevent="handleSeeDetail(event)">
                {{ locale === 'en' && !!event.titleEn && event.titleEn !== '' ? event.titleEn : event.title }}
              </a>
              <div>
                <div>{{ $t("event_page.resource_label") }} <span>{{ event.source }}</span></div>
                <div>{{ $t("event_page.public_label") }} <span>{{ event.release_date }}</span></div>
              </div>
            </div>
          </a-card>
        </div>
      </a-spin>
      <div v-if="!isAllEvent" class="text-center">
        <a-button class="min-h-[50px] min-w-[150px]" @click.prevent="showMore(true)">{{ $t("see_more_btn") }}</a-button>
      </div>
    </div>
  </div>

</template>

<style scoped>
:deep(.ant-card-body) {
  padding: 20px;
}
</style>
