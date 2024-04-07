<script setup>

import Banner from "../components/Banner.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BreadCrumb from "../components/BreadCrumb.vue";
import { getPosts } from "../services/posts.js";
import { useI18n } from 'vue-i18n'

const router = useRouter()
const {t, locale} = useI18n()
const content = ref('')
const contentEn = ref('')
const loading = ref(false)

const routes = ref([
  {name: 'Home', to: '/'},
  {name: t("overview_page.route_name"), to: '/overview'},
])

onMounted(() => {
  loading.value = true
  getPosts('ESG', 10, 0)
      .then((response) => {
        console.log(response)
        content.value = response.data[0].content.replaceAll('https://drive.google.com/uc?export=view&id=', 'https://lh3.google.com/u/0/d/')
        contentEn.value = response.data[0].contentEn.replaceAll('https://drive.google.com/uc?export=view&id=', 'https://lh3.google.com/u/0/d/')
        loading.value = false
      }).catch((err) => {
    console.log(err)
    loading.value = false
  })
})
</script>

<template>
  <Banner
      img-src="https://lh3.googleusercontent.com/pw/AIL4fc9qLXI6LSp4XjSrqXtMh-Tsjv7_hr9SPyon12xUHVR7VR1zyDtJ1l9oFX5TKzLaqT8m9LeembG5V7th4hMqusvb6lVOCn20cIPd4g2p6-kJGyLRwFUo-aqE9JviuY3Wk7xjHQV1r7i62Wj529OMZsbL=w2762-h1842-s-no?authuser=0">
    <div>{{ $t("overview_page.banner_title_1") }}</div>
    <div>{{ $t("overview_page.banner_title_2") }}</div>
  </Banner>

  <div class="md:px-10 lg:px-[100px] px-5 my-5">
    <BreadCrumb :routes="routes"/>
  </div>
  <a-skeleton :loading="loading"
              :paragraph="{rows: 10}"
              active
              class="md:px-10 lg:px-[100px] px-5"/>
  <div v-if="!loading" class="md:px-10 lg:px-[100px] px-5 text-justify pb-10">
    <div class="ql-editor text-gray-600" v-html="locale === 'en' && !!contentEn && contentEn !== '' ? contentEn : content"/>
  </div>
</template>
