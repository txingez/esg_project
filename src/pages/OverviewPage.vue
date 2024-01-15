<script setup>

import Banner from "../components/Banner.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BreadCrumb from "../components/BreadCrumb.vue";
import { getPosts } from "../services/posts.js";

const router = useRouter()
const content = ref(false)
const loading = ref(false)

const routes = [
  {name: 'Home', to: '/'},
  {name: 'Tổng quan về kinh doanh bền vững', to: '/overview'},
]

onMounted(() => {
  loading.value = true
  getPosts('ESG', 10, 0)
      .then((response) => {
        content.value = response.data[0].content
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
    <div>TỔNG QUAN VỀ</div>
    <div>KINH DOANH BỀN VỮNG</div>
  </Banner>

  <div class="md:px-10 lg:px-[100px] px-5 my-5">
    <BreadCrumb :routes="routes"/>
  </div>
  <a-skeleton :loading="loading"
              :paragraph="{rows: 10}"
              active
              class="md:px-10 lg:px-[100px] px-5"/>
  <div v-if="!loading" class="md:px-10 lg:px-[100px] px-5 text-justify pb-10">
    <div class="ql-editor text-gray-600" v-html="content"/>
  </div>
</template>
