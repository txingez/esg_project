<script setup>

import BreadCrumb from "../components/BreadCrumb.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { SUCCESS_STORIES } from "../constants/successStories.js";
import { getPosts } from "../services/posts.js";
import { useJwt } from "@vueuse/integrations/useJwt";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import { Arrow, Fade, Pagination } from "@egjs/flicking-plugins";
import Galleria from 'primevue/galleria';
import { handleOpenLink } from "../utils/handleOpenLink.js";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue"
import { useI18n } from "vue-i18n";
import { SUPPORTS } from "../constants/supports.js";
import { TESTIMONIALS } from "../constants/testimonials.js";
import { GALLERY } from "../constants/gallery.js";
import { FAQ } from "../constants/faq.js";

const {t, locale} = useI18n()

const screenWidth = ref(0)
const isAllStories = ref(false)
const storiesToShow = ref([])
const isVisible = ref(false)
const visible = ref(false)
const collapseKey = ref([]);
const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 5
  },
  {
    breakpoint: '768px',
    numVisible: 3
  },
  {
    breakpoint: '560px',
    numVisible: 2
  }
]);

const showFullscreen = ref(false)
const activeIndex = ref(0)

const pageData = reactive({
  banner: '',
  titleIntroduction: '',
  titleIntroductionEn: '',
  contentIntroduction: '',
  contentIntroductionEn: '',
  titleBenefit: '',
  titleBenefitEn: '',
  contentsBenefit: [],
  titleCondition: '',
  titleConditionEn: '',
  contentCondition: '',
  contentConditionEn: '',
  titleTimeline: '',
  titleTimelineEn: '',
  timelines: []
})

const plugins = ref([
  new Fade(),
  new Arrow(),
  new Pagination({
    type: 'bullet',
  })
])

const routes = ref([
  {name: 'Home', to: '/'},
  {name: t("esg_page.route_name"), to: '/esg-vietnam'},
])

const timelineColors = ['#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1']

const gallery = ref(GALLERY)

watch(locale, () => {
  routes.value = [
    {name: 'Home', to: '/'},
    {name: t("esg_page.route_name"), to: '/esg-vietnam'},
  ]
})
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
  getPosts('IDEA', 10, 0).then(response => {
    const getPostDatDecoded = useJwt(response.data[0].content).payload.value
    // pageData.banner = getPostDatDecoded.data.banner[0]?.url
    pageData.banner = 'https://lh3.googleusercontent.com/pw/ABLVV84zelMNQpIziyRnTV5bb0Xd9KvAagiM7OMEiZIh9GgRixdJsZO1lsYHBNlhHTQuCZO6dnhYeAv96QLhC9fsAM6qQyCezpD6esOy9ow_2q12tB35l_SHu9wn1JQukuFo9N3bZ84ivpfV5p72OI_Ao-3A=w1600-h900-s-no-gm?authuser=0'
    pageData.titleIntroduction = getPostDatDecoded.data.introduction.title
    pageData.titleIntroductionEn = getPostDatDecoded.data.introduction.titleEn
    pageData.contentIntroduction = getPostDatDecoded.data.introduction.content
    pageData.contentIntroductionEn = getPostDatDecoded.data.introduction.contentEn
    pageData.titleBenefit = getPostDatDecoded.data.benifit.headTitle
    pageData.titleBenefitEn = getPostDatDecoded.data.benifit.headTitleEn
    pageData.contentsBenefit = getPostDatDecoded.data.benifit.contents
    pageData.titleCondition = getPostDatDecoded.data.condition.title
    pageData.titleConditionEn = getPostDatDecoded.data.condition.titleEn
    pageData.contentCondition = getPostDatDecoded.data.condition.content
    pageData.contentConditionEn = getPostDatDecoded.data.condition.contentEn
    pageData.titleTimeline = getPostDatDecoded.data.timeline.headTitle
    pageData.titleTimelineEn = getPostDatDecoded.data.timeline.headTitleEn
    pageData.timelines = getPostDatDecoded.data.timeline.contents
        .filter(t => t.datetime !== '' && t.title !== '' && t.description !== '')
        .map((t, index) => ({...t, ...{bgColor: timelineColors[index]}}))
  })
  storiesToShow.value = SUCCESS_STORIES.slice(0, 3)
})

const showMore = () => {
  const newStoriesToShow = SUCCESS_STORIES.slice(0, storiesToShow.value.length + 3)
  storiesToShow.value = newStoriesToShow
  isAllStories.value = newStoriesToShow.length === SUCCESS_STORIES.length
}

const imageClick = (index) => {
  activeIndex.value = index;
  showFullscreen.value = true;
};


function scrollToSmooth(scrollContainer, x) {
  scrollContainer.scrollTo({
    left: x,
    behavior: 'smooth'
  });
}

const scrollToLeft = () => {
  const scrollContainer = document.querySelector("#timelines");
  const timeline = document.querySelector("#timelineElement")
  const currentScrollLeft = scrollContainer.scrollLeft;
  const targetScrollLeft = currentScrollLeft - timeline.clientWidth - 42; // Điều chỉnh giá trị cuộn trái
  scrollToSmooth(scrollContainer, targetScrollLeft);
}

const scrollToRight = () => {
  const scrollContainer = document.querySelector("#timelines");
  const timeline = document.querySelector("#timelineElement")
  const currentScrollLeft = scrollContainer.scrollLeft;
  const targetScrollLeft = currentScrollLeft + timeline.clientWidth + 42; // Điều chỉnh giá trị cuộn phải
  scrollToSmooth(scrollContainer, targetScrollLeft);
}
</script>

<template>
  <div class="relative">
    <div class="absolute flex flex-col justify-center items-center w-full h-full lg:p-14 md:p-8 p-5">
      <div class="flex flex-col gap-5">
        <div class="text-center h-fit xl:text-[7vh]/[8vh] lg:text-5xl/[4vh] lg:py-1 md:text-4xl/[4vh] text-base break-after-auto font-bold whitespace-pre-wrap
                  text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 w-full">
          {{ $t("esg_page.banner_title") }}
        </div>
      </div>
      <div class="md:mt-5 flex flex-col justify-center items-center gap-2">
        <div class="md:px-6 px-2 md:py-2 lg:py-3 md:text-base xl:text-2xl md:min-h-[50px] min-h-[30px] flex justify-center items-center border rounded border-image hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-500 hover:cursor-pointer
                    text-transparent bg-gradient-to-r bg-clip-text from-blue-400 to-green-500 hover:bg-clip-padding hover:text-white w-fit whitespace-pre-wrap"
             style="border-image: linear-gradient(45deg, #60a5fa, #22c55e) 1"
             @click.prevent="handleOpenLink('https://bit.ly/dangki-esg-2024')">
          {{ $t("esg_page.join_now_btn") }}
        </div>
        <div class="text-gray-600 md:text-base text-[10px] italic">
          {{ $t("esg_page.deadline") }}
        </div>
      </div>
    </div>
    <img :src="pageData.banner"
         class="h-full w-full"
         alt="banner_esg">
  </div>

  <div class="flex justify-center">
    <div class="max-w-[1440px] md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
      <BreadCrumb :routes="routes"/>
      <div>
        <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mt-5 mb-10">
          {{ locale === 'en' && !!pageData.titleIntroductionEn && pageData.titleIntroductionEn !== '' ? pageData.titleIntroductionEn : pageData.titleIntroduction}}
        </div>
        <div class="ql-editor text-gray-600"
             v-html="locale === 'en' && !!pageData.contentIntroductionEn && pageData.contentIntroductionEn ? pageData.contentIntroductionEn : pageData.contentIntroduction"/>
        <div class="flex flex-col items-center justify-center gap-1.5 mt-2.5">
          <div class="md:px-6 px-3 md:py-2 lg:py-3 md:text-base xl:text-xl md:min-h-[50px] min-h-[30px] flex justify-center items-center border border-image hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-500 hover:cursor-pointer
                                         text-transparent bg-gradient-to-r bg-clip-text from-blue-400 to-green-500 hover:bg-clip-padding hover:text-white w-fit"
               style="border-image: linear-gradient(45deg, #60a5fa, #22c55e) 1"
               @click.prevent="handleOpenLink('https://bit.ly/dangki-esg-2024')">
            {{ $t("esg_page.join_now_btn") }}
          </div>
          <div class="text-gray-600 md:text-sm text-[10px] italic">
            {{ $t("esg_page.deadline") }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
      class="flex justify-center bg-[url(https://lh3.googleusercontent.com/pw/ABLVV87lgnRMUdkVrj0NutH9xwbeil2GSIXbBu-JaiMS4B7TV3zvrejYwnnBx5QXIxI2AX2escv88fM6eApZtGZG-O643MNRJGthQTvn36aObvOyk6bA6DS3FZ3z7Y6uPqNJWhq3Fj92SKG3EXh9tW_I2fRp=w1920-h722-s-no-gm?authuser=0)]">
    <div class="text-white md:px-10 lg:px-[100px] xl:px-[150px] px-5 pb-20 max-w-[1440px]">
      <div class="font-semibold xl:text-4xl md:text-3xl text-xl leading-none text-center py-10 font-bold">
        <span>{{ locale === 'en' && !!pageData.titleBenefitEn && pageData.titleBenefitEn !== '' ? pageData.titleBenefitEn : pageData.titleBenefit }}</span>
      </div>
      <div class="text-justify space-y-8">
        <div class="space-y-1" v-for="benefit in pageData.contentsBenefit">
          <div class="font-semibold xl:text-2xl md:text-xl text-lg">
            {{ locale === 'en' && !!benefit.titleEn && benefit.titleEn !== '' ? benefit.titleEn : benefit.title }}
          </div>
          <div>
            {{ locale === 'en' && !!benefit.descriptionEn && benefit.descriptionEn !== '' ? benefit.descriptionEn : benefit.description }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="max-w-[1440px] md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
      <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-10 tracking-wide">
        {{ locale === 'en' && !!pageData.titleConditionEn && pageData.titleConditionEn !== '' ? pageData.titleConditionEn : pageData.titleCondition }}
      </div>
      <div class="flex gap-5 justify-between flex-col md:flex-row">
        <div
            class="text-black lg:text-[20px] text-base lg:leading-[30px] leading-[25px] basis-1/2 tracking-wide lg:px-14">
          {{ $t("esg_page.condition.introduction") }}
        </div>
        <div class="basis-1/2 space-y-10">
          <div class="flex gap-5">
            <div class="flex gap-2">
              <div
                  class="text-[#004990] border border-[#004990] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center">
                1
              </div>
              <div class="w-[5px] bg-[#004990] rounded-[10px]"/>
            </div>
            <div class="text-[#263238] tracking-wide">
              {{ $t("esg_page.condition.condition_1") }}
            </div>
          </div>
          <div class="flex gap-5">
            <div class="flex gap-2">
              <div
                  class="text-[#004990] border border-[#004990] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center">
                2
              </div>
              <div class="w-[5px] bg-[#004990] rounded-[10px]"/>
            </div>
            <div class="text-[#263238] tracking-wide">
              {{ $t("esg_page.condition.condition_2") }}
            </div>
          </div>
          <div class="flex gap-5">
            <div class="flex gap-2">
              <div
                  class="text-[#004990] border border-[#004990] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center">
                3
              </div>
              <div class="w-[5px] bg-[#004990] rounded-[10px]"/>
            </div>
            <div class="text-[#263238] tracking-wide">
              {{ $t("esg_page.condition.condition_3") }}
            </div>
          </div>
          <div class="flex gap-5">
            <div class="flex gap-2">
              <div
                  class="text-[#004990] border border-[#004990] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center">
                4
              </div>
              <div class="w-[5px] bg-[#004990] rounded-[10px]"/>
            </div>
            <div class="text-[#263238] tracking-wide">
              {{ $t("esg_page.condition.condition_4") }}
            </div>
          </div>
          <div class="text-[#263238] tracking-wide">
            {{ $t("esg_page.condition.learn_more_text") }} <a href="https://esg.business.gov.vn/library/detail/22" class="font-bold">
            {{ $t("esg_page.condition.here_text") }}</a>.
          </div>
        </div>
      </div>
      <!--      <div class="ql-editor text-gray-600" v-html="pageData.contentCondition"/>-->
    </div>
  </div>

  <section id=timeline class="py-16 bg-[#f7f7f7] flex flex-col items-center justify-center">
    <div class="max-w-[1440px] w-full">
      <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-10 tracking-wide">
        {{ locale === 'en' && !!pageData.titleTimelineEn && pageData.titleTimelineEn !== '' ? pageData.titleTimelineEn : pageData.titleTimeline }}
      </div>
      <div class="lg:px-14 px-1 flex gap-2 items-center">
        <div class="text-black hover:cursor-pointer"
             @click.prevent="scrollToLeft">
          <LeftOutlined class="md:text-[40px] text-[30px] text-[#93ca5c]"/>
        </div>
        <div class="lg:px-0 md:px-3 px-5 flex gap-10 overflow-hidden" id="timelines">
          <div v-for="(tlc, index) in pageData.timelines"
               id="timelineElement"
               class="snap-always snap-center border border-[#004990] bg-white rounded-[25px] lg:h-[400px] h-[470px] w-full lg:max-w-[380px] max-w-[300px] lg:p-[30px] p-5 shrink-0">
            <div class="text-[#93ca5c] lg:text-[20px] text-[16px] tracking-wide">
              {{ locale === 'en' && !!tlc.datetimeEn && tlc.datetimeEn !== '' ? tlc.datetimeEn.toUpperCase() : tlc.datetime.toUpperCase() }}
            </div>
            <div class="text-[#004990] lg:text-[25px] text-[20px] mt-[25px] leading-[30px] tracking-wide">
              {{ locale === 'en' && !!tlc.titleEn && tlc.titleEn !== '' ? tlc.titleEn : tlc.title }}
            </div>
            <div class="text-[#333333] mt-[20px] whitespace-pre-wrap tracking-wide">
              {{ locale === 'en' && !!tlc.descriptionEn && tlc.descriptionEn !== '' ? tlc.descriptionEn : tlc.description }}
            </div>
          </div>
        </div>
        <div class="text-black hover:cursor-pointer"
             @click.prevent="scrollToRight">
          <RightOutlined class="md:text-[40px] text-[30px] text-[#93ca5c]"/>
        </div>
      </div>
    </div>
  </section>

  <div class="flex justify-center">
    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10 max-w-[1440px]">
      <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-10">
        {{ $t("esg_page.support_title") }}
      </div>
      <div class="mt-24 flex md:gap-x-10 md:gap-y-16 gap-16 justify-center flex-wrap">
        <div v-for="support in SUPPORTS"
             class="bg-gray-200 px-5 pt-10 pb-5 relative border rounded-[10px] w-[300px] h-[150px] transition-all ease-in-out duration-500 group hover:-translate-y-3 hover:bg-[#004990]">
          <div class="border border-[#004990] rounded-full w-[70px] h-[70px] flex justify-center items-center bg-[#004990] group-hover:bg-white
                    absolute -top-1/4 left-1/2 -translate-x-10 shadow shadow-[#004990]/50	">
            <span class="text-white font-bold text-4xl group-hover:text-[#004990]">{{ support.number }}</span>
          </div>
          <div class="tracking-wider text-center space-y-2.5">
            <div class="text-gray-600 group-hover:text-white">
              {{ locale === 'en' ? support.descriptionEn : support.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-[url(https://lh3.googleusercontent.com/pw/ABLVV87lgnRMUdkVrj0NutH9xwbeil2GSIXbBu-JaiMS4B7TV3zvrejYwnnBx5QXIxI2AX2escv88fM6eApZtGZG-O643MNRJGthQTvn36aObvOyk6bA6DS3FZ3z7Y6uPqNJWhq3Fj92SKG3EXh9tW_I2fRp=w1920-h722-s-no-gm?authuser=0)]
              flex justify-center group">
    <div class="max-w-[1440px] md:h-[430px] flex flex-col items-center">
      <Flicking :options="{ align: 'center', circular: false, adaptive: true }"
                :plugins="plugins"
                class="rounded-[15px] !h-full">
        <div v-for="(testimonial, index) in TESTIMONIALS"
             :key="index"
             class="w-full h-full flex justify-center items-center px-10">
          <div class="max-w-[800px] flex md:flex-row flex-col gap-10">
            <div>
              <a-avatar :size="120" class="flex justify-center items-center">
                <template #icon>
                  <img :src="testimonial.avatar" alt="">
                </template>
              </a-avatar>
            </div>
            <div class="text-white text-lg space-y-5">
              <div class="tracking-wider">
                "{{ locale === 'en' ? testimonial.quoteEn : testimonial.quote }}"
              </div>
              <div>
                <div>{{ testimonial.name }}</div>
                <div class="text-base italic text-gray-400">{{
                    locale === 'en' ? testimonial.titleEn : testimonial.title
                  }}</div>
              </div>
            </div>
          </div>
        </div>
        <template #viewport>
          <span
              class="evaluate-slide-arrow flicking-arrow-prev is-thin invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all ease-in duration-200 before:!w-[15px] after:!w-[15px] before:!bg-[#d1d5db] after:!bg-[#d1d5db] hover:before:!bg-white hover:after:!bg-white"/>
          <span
              class="evaluate-slide-arrow flicking-arrow-next is-thin invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all ease-in duration-200 before:!w-[15px] after:!w-[15px] before:!bg-[#d1d5db] after:!bg-[#d1d5db] hover:before:!bg-white hover:after:!bg-white"/>
          <div class="evaluate-slide-pagination flicking-pagination"/>
        </template>
      </Flicking>
    </div>
  </div>

  <div class="flex flex-col items-center justify-center py-5">
    <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-5">
      {{ $t("esg_page.gallery_title") }}
    </div>
    <div class="max-w-[1440px] md:px-10 lg:px-[100px] xl:px-[150px] px-5">
      <Galleria :value="gallery"
                :responsiveOptions="responsiveOptions"
                :numVisible="5">
        <template #item="slotProps">
          <div class="w-full relative">
            <div
                class="absolute bottom-0 text-white bg-black bg-opacity-50 w-full flex justify-center items-center min-h-[50px] whitespace-pre-wrap">
              {{ locale === 'vi' ? slotProps.item.alt : slotProps.item.altEn }}
            </div>
            <img class="w-full xl:h-[650px] lg:h-[450px] md:h-[400px] object-cover" :src="slotProps.item.itemImageSrc"
                 :alt="slotProps.item.alt"
                 @click.prevent="imageClick(slotProps.item.index)"/>
          </div>
        </template>
        <template #thumbnail="slotProps">
          <img class="lg:w-[200px] md:w-[180px] w-[100px] lg:h-[120px] md:h-[100px] h-[50px] object-cover"
               :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt"/>
        </template>
      </Galleria>
    </div>
  </div>

  <Galleria v-model:activeIndex="activeIndex" v-model:visible="showFullscreen" :value="gallery"
            :responsiveOptions="responsiveOptions" :numVisible="5"
            containerStyle="max-width: 1440px" :circular="true" :fullScreen="true" :showItemNavigators="true"
            :showThumbnails="false">
    <template #item="slotProps">
      <div class="w-full relative">
        <div
            class="absolute bottom-0 text-white bg-black bg-opacity-50 w-full flex justify-center items-center min-h-[50px]">
          {{ locale === 'vi' ? slotProps.item.alt : slotProps.item.altEn }}
        </div>
        <img class="w-full" :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
             @click.prevent="imageClick(slotProps.item.index)"/>
      </div>
    </template>
  </Galleria>

  <div class="flex flex-col items-center justify-center bg-[#f7f7f7] py-5">
    <div class="max-w-[1440px] md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
      <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-10">
        {{ $t("esg_page.story_title") }}
      </div>
      <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-24 mt-[45px]">
        <div class="relative hover:cursor-pointer" v-for="story in storiesToShow"
             @click.prevent="handleOpenLink(story.content)">
          <div class="h-[250px] w-full border border-[#c1da73] rounded-[10px] overflow-hidden">
            <img class="rounded-[10px] h-full w-full hover:scale-110 transition-all duration-500 ease-in-out"
                 :src="story.thumbnail"
                 :alt="story.name">
          </div>
          <div
              class="bg-white rounded-[10px] p-2.5 flex justify-between 2xl:w-[88%] xl:w-[85%] lg:w-[80%] w-[83%] border-b-4 border-[#659D51] absolute -bottom-[15%] left-[29px] hover:cursor-pointer"
              @click.prevent="handleOpenLink(story.content)">
            <div class="flex justify-between gap-2 h-[70px]">
              <div
                  class="font-medium xl:text-lg/[22px] lg:text-[13px]/[20px] text-base/[22px] tracking-[0.05em] text-[#263238] flex items-end">
                <div class="line-clamp-3 text-ellipsis">
                  {{ locale === 'vi' ? story.description : story.descriptionEn }}
                </div>
              </div>
              <div class="w-[50px] self-end flex items-end min-h-[70px]">
                <img class="w-[20px] h-[20px]" src="../assets/arrow_right.png"
                     alt="arrow_right">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-[120px] text-center" v-if="!isAllStories">
        <a-button
            class="rounded-[88px] border-[#BABABA] h-[50px] lg:w-[300px] w-[220px] font-medium lg:text-2xl/[40px] text-xl/[40px] text-[#717171] tracking-[.2em]"
            @click.prevent="showMore">
          {{ $t("see_more_btn") }}
        </a-button>
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="max-w-[1440px] w-full md:px-10 lg:px-[100px] xl:px-[150px] px-5 pt-5">
      <div
          class="min-h-[150px] flex md:flex-row flex-col md:gap-0 gap-5 justify-between md:items-center items-start rounded-[5px] bg-gradient-to-r from-green-300 to-emerald-200 xl:p-10 p-5 shadow-md">
        <div>
          <div class="xl:text-4xl lg:text-2xl md:text-xl text-base break-after-auto font-bold whitespace-pre-wrap
                  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 w-full">
            {{ $t("esg_page.banner_title") }}
          </div>
        </div>
        <div class="flex flex-col justify-center gap-1">
          <a-button shape="round"
                    class="md:min-h-[60px] min-h-[50px] text-white xl:text-xl md:text-lg text-base bg-orange-400 shadow-md focus:!bg-orange-500 hover:!bg-orange-500"
                    type="primary"
                    @click.prevent="handleOpenLink('https://bit.ly/dangki-esg-2024')">
            {{ $t("esg_page.register_btn") }}
          </a-button>
          <div class="text-black md:text-sm text-[10px] italic text-center">
            {{ $t("esg_page.deadline") }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center py-10">
    <div class="max-w-[1440px] w-full flex flex-col justify-center items-center">
      <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-10">
        {{ $t("esg_page.faq_title") }}
      </div>
      <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5">
        <a-collapse v-model:activeKey="collapseKey"
                    ghost
                    :bordered="false"
                    class="w-full space-y-2.5"
                    expand-icon-position="end">
          <a-collapse-panel v-for='faq in FAQ' :key="faq.key" class="bg-white !rounded-[4px]">
            <template #header>
              <div class="min-h-[50px] flex items-center tracking-wide text-[#004990]"
                   :class="collapseKey.includes(faq.key.toString()) ? 'font-semibold' : ''">{{ faq.key }}.
                {{ locale === 'vi' ? faq.question : faq.questionEn }}
              </div>
            </template>
            <div class="whitespace-pre-wrap tracking-wide text-black">
              {{ locale === 'vi' ? faq.answer : faq.answerEn }}
            </div>
          </a-collapse-panel>
        </a-collapse>
        <div class="mt-5 text-center">
          <a-button
              class="rounded-[88px] border-[#BABABA] h-[50px] lg:w-[300px] w-[220px] font-medium lg:text-2xl/[40px] text-xl/[40px] text-[#717171] tracking-[.2em]"
              @click.prevent="handleOpenLink('https://esg.business.gov.vn/library/detail/83')">
            {{ $t("see_more_btn") }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>


.flicking-pagination-bullet-active {
  background-color: #fff;
}

.ant-collapse > .ant-collapse-item > .ant-collapse-header {
  align-items: center;
}

.ant-collapse-content-box {
  padding-top: 0 !important;
  padding-bottom: 10px !important;
}

.ant-steps-item-container {
  margin-right: 10px;

}

.ant-steps-item-title {
  white-space: nowrap;
  font-size: 12px !important;
}

.ant-steps-item-description {
  font-size: 13px !important;
}
</style>
