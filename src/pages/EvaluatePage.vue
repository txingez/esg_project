<script setup>

import Banner from "../components/Banner.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { handleAccessForm } from "../utils/handleClickEvaluate.js";
import BreadCrumb from "../components/BreadCrumb.vue";
import AOS from 'aos'
import { DownloadOutlined } from '@ant-design/icons-vue'
import { getPosts } from "../services/posts.js";
import { useJwt } from "@vueuse/integrations/useJwt";
import { downloadDocument } from "../services/evaluatedForm.js";
import FileSaver from 'file-saver'
import { Notification } from "../components/Notification.js";
import { handleGoogleImageLink } from "../utils/handleGoogleImageLink.js";
import { useI18n } from 'vue-i18n'

const {t, locale} = useI18n()

const pageData = reactive({
  introduction: '',
  introductionEn: '',
  esg: {
    title: '', titleEn: '', image: [], document: []
  },
  nec: {
    title: '', titleEn: '', image: [], document: []
  },
  kdbt: {
    title: '', titleEn: '', image: [], document: []
  }
})
const loading = ref(false)
const downloadLoading = ref(false)

const isAuth = computed(() => {
  const token = localStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
  return !!token
})

const routes = ref([
  {name: 'Home', to: '/'},
  {name: t("evaluate_page.route_name"), to: '/evaluate'},
])

watch(locale, () => {
  routes.value = [
    {name: 'Home', to: '/'},
    {name: t("evaluate_page.route_name"), to: '/evaluate'},
  ]
})

onMounted(() => {
  AOS.init()
  getPageData()
})

const getPageData = () => {
  loading.value = true
  getPosts('EVALUATE', 10, 0)
      .then((response) => {
        const dataDecoded = useJwt(response.data[0].content).payload.value
        console.log(dataDecoded)
        pageData.introduction = dataDecoded.data.introduction
        pageData.introductionEn = dataDecoded.data.introductionEn
        pageData.esg = {...dataDecoded.data.esg, ...{image: [{url: handleGoogleImageLink(dataDecoded.data.esg.image[0].url)}]}}
        pageData.nec = {...dataDecoded.data.nec, ...{image: [{url: handleGoogleImageLink(dataDecoded.data.nec.image[0].url)}]}}
        pageData.kdbt = {...dataDecoded.data.kdbt, ...{image: [{url: handleGoogleImageLink(dataDecoded.data.kdbt.image[0].url)}]}}
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loading.value = false
      })
}

const downloadFile = (formId, fileName) => {
  downloadLoading.value = true
  downloadDocument(formId)
      .then(response => {
        FileSaver.saveAs(response.data, fileName)
      })
      .catch(err => {
        console.log(err)
        Notification('error', 'Tải thất bại', 'Hệ thống đang bận, vui lòng thử lại sau')
      })
      .finally(() => {
        downloadLoading.value = false
      })
}
</script>

<template>
  <Banner
      img-src="https://lh3.googleusercontent.com/pw/AIL4fc9ZceHAFiHOWTxrrxinjHqpovV6-fzGgEYNqFKy4ErwJfaUdekISojkjwx7QHwk-v5ylDXToGH7l5FXEuymJBxNgB1_XnE9JEW7-zYjE-XZcMVHPGScDdScSx6g2gbfTQpAEW24He_NGStitA4QCmun=w1600-h900-s-no?authuser=0">
    <div>{{ $t("evaluate_page.banner_title_1") }}</div>
    <div>{{ $t("evaluate_page.banner_title_2") }}</div>
  </Banner>

  <div class="md:px-10 lg:px-[100px] px-5 mt-2.5">
    <BreadCrumb :routes="routes"/>
  </div>

  <a-spin :spinning="loading">
    <div class="md:px-10 lg:px-[100px] px-5 py-10 flex md:gap-10 gap-5 flex-col">
      <div class="ql-editor text-gray-600"
           v-html="locale === 'en' && !!pageData.introduction && pageData.introduction !== '' ? pageData.introductionEn : pageData.introduction"/>

      <div class="grid grid-cols-4 gap-10">
        <div class="lg:col-span-2 col-span-4 border rounded-[10px] max-h-[340px]"
             data-aos="fade-down"
             data-aos-duration="500"
             data-aos-easing="ease-in-out">
          <img :src="pageData.esg.image[0]?.url"
               alt="business7"
               class="rounded-[10px] w-full h-full"
               loading="lazy">
        </div>
        <div class="flex flex-col gap-3 lg:col-span-2 col-span-4 justify-center"
             data-aos="fade-up"
             data-aos-duration="500"
             data-aos-easing="ease-in-out">
          <div class="md:text-xl xl:text-2xl text-xl font-bold text-gray-600">
            {{ locale === 'en' && !!pageData.esg.titleEn && pageData.esg.titleEn !== '' ? pageData.esg.titleEn : pageData.esg.title }}
          </div>
          <div class="flex gap-2.5 xl:flex-row flex-col">
            <a-button class="min-h-[50px] md:text-base xl:text-lg"
                      @click.prevent="handleAccessForm(isAuth, 'ESG')">
              {{ $t("evaluate_page.evaluate_btn") }}
            </a-button>
            <a-button class="min-h-[50px] md:text-base xl:text-lg bg-blue-500"
                      type="primary"
                      @click.prevent="downloadFile('esg', pageData.esg.document[0]?.name)">
              <a class="flex items-center justify-center gap-2 w-full h-full">
                <DownloadOutlined/>
                <span>{{ $t("evaluate_page.document_btn") }}</span>
              </a>
            </a-button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-10">
        <div class="lg:col-span-2 col-span-4 lg:order-last border rounded-[10px] max-h-[340px]"
             data-aos="fade-left"
             data-aos-duration="500"
             data-aos-easing="ease-in-out">
          <img :src="pageData.nec.image[0]?.url"
               alt="manufacture_evaluate"
               class="rounded-[10px] w-full h-full"
               loading="lazy">
        </div>
        <div class="flex flex-col gap-3 lg:col-span-2 col-span-4 justify-center"
             data-aos="fade-right"
             data-aos-duration="500"
             data-aos-easing="ease-in-out">
          <div class="md:text-xl xl:text-2xl text-xl font-bold text-gray-600">
            {{ locale === 'en' && !!pageData.nec.titleEn && pageData.nec.titleEn !== '' ? pageData.nec.titleEn : pageData.nec.title }}
          </div>
          <div class="flex gap-2.5 xl:flex-row flex-col">
            <a-button class="min-h-[50px] md:text-base xl:text-lg"
                      @click.prevent="handleAccessForm(isAuth, 'NEC')">
              {{ $t("evaluate_page.evaluate_btn") }}
            </a-button>
            <a-button class="min-h-[50px] md:text-base xl:text-lg bg-blue-500"
                      type="primary"
                      @click.prevent="downloadFile('nec', pageData.nec.document[0]?.name)">
              <a class="flex items-center justify-center gap-2 w-full h-full">
                <DownloadOutlined/>
                <span>{{ $t("evaluate_page.document_btn") }}</span>
              </a>
            </a-button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-10">
        <div class="lg:col-span-2 col-span-4 border rounded-[10px] max-h-[340px]"
             data-aos="fade-down"
             data-aos-duration="500"
             data-aos-easing="ease-in-out">
          <img :src="pageData.kdbt.image[0]?.url"
               alt="business7"
               class="rounded-[10px] w-full h-full"
               loading="lazy">
        </div>
        <div class="flex flex-col gap-3 lg:col-span-2 col-span-4 justify-center"
             data-aos="fade-up"
             data-aos-duration="500"
             data-aos-easing="ease-in-out">
          <div class="md:text-xl xl:text-2xl text-xl font-bold text-gray-600">
            {{ locale === 'en' && !!pageData.kdbt.titleEn && pageData.kdbt.titleEn !== '' ? pageData.kdbt.titleEn : pageData.kdbt.title }}
          </div>
          <div class="flex gap-2.5 xl:flex-row flex-col">
<!--            <a-button class="min-h-[50px] md:text-base xl:text-lg"-->
<!--                      @click.prevent="handleAccessForm(isAuth, 'ESG')">-->
<!--              Thực hiện đánh giá-->
<!--            </a-button>-->
            <a-button class="min-h-[50px] md:text-base xl:text-lg">
              <a href="/Toolkit-IB%20Readiness%20Assessment.xlsx" download>
                {{ $t("evaluate_page.evaluate_btn") }}
              </a>
            </a-button>
            <a-button class="min-h-[50px] md:text-base xl:text-lg bg-blue-500"
                      type="primary">
<!--                      @click.prevent="downloadFile('esg', pageData.kdbt.document[0]?.name)">-->
              <a href="https://esg.business.gov.vn/news/detail/100" target="_blank" class="flex items-center justify-center gap-2 w-full h-full">
                <DownloadOutlined/>
                <span>{{ $t("evaluate_page.document_btn") }}</span>
              </a>
                <!--              <a class="flex items-center justify-center gap-2 w-full h-full">-->
<!--                <DownloadOutlined/>-->
<!--                <span>Tài liệu giới thiệu và hướng dẫn</span>-->
<!--              </a>-->
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </a-spin>

  <!--    <div class="md:px-10 lg:px-[150px] xl:px-[200px] px-5 py-10 flex flex-col gap-10">-->
  <!--        <div class="md:text-4xl xl:text-6xl text-3xl font-bold text-center">FAQ</div>-->
  <!--        <div class="flex gap-5 flex-col">-->
  <!--            <div class="flex gap-2 flex-col">-->
  <!--                <div class="md:text-2xl xl:text-4xl text-xl font-bold">Passion</div>-->
  <!--                <div>-->
  <!--                    Use a text section to describe your values, show more info, summarize a topic, or tell a story.-->
  <!--                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut-->
  <!--                    laoreet dolore.-->
  <!--                </div>-->
  <!--            </div>-->

  <!--            <div>-->
  <!--                <div class="md:text-2xl xl:text-4xl text-xl font-bold">Independence</div>-->
  <!--                <div class="flex gap-2 flex-col">-->
  <!--                    Use a text section to describe your values, show more info, summarize a topic, or tell a story.-->
  <!--                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut-->
  <!--                    laoreet dolore.-->
  <!--                </div>-->
  <!--            </div>-->

  <!--            <div>-->
  <!--                <div class="md:text-2xl xl:text-4xl text-xl font-bold">Courage</div>-->
  <!--                <div class="flex gap-2 flex-col">-->
  <!--                    Use a text section to describe your values, show more info, summarize a topic, or tell a story.-->
  <!--                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut-->
  <!--                    laoreet dolore.-->
  <!--                </div>-->
  <!--            </div>-->
  <!--        </div>-->
  <!--    </div>-->
</template>
