<script setup>
import Carousel from "../components/Carousel.vue";
import { onMounted, reactive, ref } from "vue";
import AOS from 'aos'
import { getHotNews, getPosts } from "../services/posts.js";
import { useJwt } from "@vueuse/integrations/useJwt";
import axios from "axios";
import { SUCCESS_STORIES } from "../constants/successStories.js";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import { Arrow, AutoPlay, Fade, Pagination } from "@egjs/flicking-plugins";
import { useRouter } from "vue-router";
import { handleOpenLink } from "../utils/handleOpenLink.js";
import { handleGoogleImageLink } from "../utils/handleGoogleImageLink.js";

const router = useRouter()

const pageData = reactive({
  carouselData: [],
  pageTitle: '',
  pageDescription: '',
  titleMission: '',
  missions: [],
  descriptionEvaluate: '',
  evaluateSlides: [],
  descriptionESGPart: '',
  videoESGPart: '',
  stories: [],
  hotNews: []
})
const screenWidth = ref(0)
const loading = ref(false)
const isAllStories = ref(false)
const storiesToShow = ref([])
const isVisible = ref(false)
const plugins = ref([
  new AutoPlay({duration: 3000, direction: "NEXT", stopOnHover: true}),
  new Fade(),
  new Arrow(),
  new Pagination({
    type: 'bullet',
  })
])

const routes = [
  {name: 'Home', to: '/'}
]

const missionsIcon = [
  'https://lh3.googleusercontent.com/pw/ADCreHdjMApadQJ-1u4HJ5XPkPu8ZLb9yOBCkdbxg6qcdmm4ZFBlMBMNbC6A6O1DgozeJ46gRk2pt4A_qvqZgl96Qpbjl6Euju43-bg95t-2OXaFxVv20d-oWTFPDwKlmqRk_lM7xcI21O5XlSxCt5ctwaOC=w72-h72-s-no?authuser=0',
  'https://lh3.googleusercontent.com/pw/ADCreHcBuJY89kwhiwesqjGJVGbjyO-kxYpc0-jqL5OHY4RIJRxC5JERVMwHRYO70TAPG5pJz5kTrLB8q_Y7jp7IHcYqjwVAge8Rjz7RHKur0rCWFsFRDDuBJZ6L-3zJeuPeDInYtKSTwOKXi3ahpt33jopx=w77-h80-s-no?authuser=0',
  'https://lh3.googleusercontent.com/pw/ADCreHckVYPWmR1sdx7blvN_t8CLhRPktUDnq-E1tqZ6SKvISe9NqoFtUEFFNeD4uPP4HUS2EhkY82jFgmfQzrT4YYw6tMSHoFOm0K0AfqvVoBvnL3wj4QzGR9ZIMIKWddVdlZgmyTYzGOKB88r5GR8aAvWJ=w73-h78-s-no?authuser=0',
  'https://lh3.googleusercontent.com/pw/ADCreHfOCK2qtO1eGyP-oj1XINRT-ikEqt72P1R4avNg76nN3ThXISajc8syUjFoxMoQNloSZx0jvNw7Xa2ZtmVkEXKZaCNoHYbqij-xO7Djc8GS8k4GB2SnjQdkhWbwQpSZ5x6bpi_-ZaEl0Z5T3xJ3GVsl=w78-h93-s-no?authuser=0'
]

const driveDefaultURL = "https://drive.google.com/uc?export=view&id=";
const driveExpectedURL = "https://lh3.google.com/u/0/d/"

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
            pageData.pageTitle = getPostDataDecoded.data.homePageTitle.title
            pageData.pageDescription = getPostDataDecoded.data.homePageTitle.description
            pageData.titleMission = getPostDataDecoded.data.titleMission
            pageData.missions = getPostDataDecoded.data.missions.map((m, index) => ({...m, ...{icon: missionsIcon[index]}}))
            pageData.descriptionEvaluate = getPostDataDecoded.data.descriptionEvaluate
            pageData.evaluateSlides = getPostDataDecoded.data.evaluateSlides
            pageData.carouselData = getPostDataDecoded.data.bannerSlides
            pageData.descriptionESGPart = getPostDataDecoded.data.introduction.description
            pageData.videoESGPart = getPostDataDecoded.data.introduction.videoURL

            pageData.stories = SUCCESS_STORIES
            storiesToShow.value = SUCCESS_STORIES.slice(0, 3)

            pageData.hotNews = getHotNewsResponse.data.data.map(hotNews => ({
              id: hotNews.id,
              title: hotNews.title,
              href: hotNews.content,
              contentType: hotNews.content_type,
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

const titleEvaluatePart = 'Bộ công cụ đánh giá \nKinh doanh bền vững'
const titleESGPart = 'Giới thiệu'
const titleStories = 'Câu chuyện điển hình về \nkinh doanh bền vững'

const showMore = () => {
  const newStoriesToShow = pageData.stories.slice(0, storiesToShow.value.length + 3)
  storiesToShow.value = newStoriesToShow
  isAllStories.value = newStoriesToShow.length === pageData.stories.length
}

const handleSeeDetail = document => {
  router.push(`/news/detail/${document.id}`)
}
</script>

<template>
  <Carousel v-if="pageData.carouselData.length !== 0" :slides="pageData.carouselData"/>

  <div class="relative">
    <div class="flex justify-center items-center relative overflow-hidden">
      <div class="absolute top-0 z-10">
        <div class="text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258] whitespace-pre-wrap
            text-center lg:text-[40px] md:text-[28px] text-[15px] md:leading-[48.59px] leading-[30px] md:mt-[80px] mt-[40px] font-medium">
          {{ pageData.pageTitle }}
        </div>
        <div
            class="text-[#757575] whitespace-pre-wrap font-medium lg:text-[14px]/[26.25px] text-[8px]/[20px] text-center md:tracking-[.20em] tracking-[.1em] lg:mt-[35px] mt-[20px]">
          {{ pageData.pageDescription.toUpperCase() }}
        </div>
        <div class="flex justify-center md:mt-[20px] mt-[20px]">
          <div class="h-[3px] md:w-[310px] w-[150px] bg-[#FF7437]"></div>
        </div>

        <div class="text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258] text-center
            lg:text-[40px] md:text-[28px] text-[15px] md:leading-[89.03px] leading-[40px] font-medium">
          Mục tiêu
        </div>
      </div>
      <div
          class="circle-wrapper lg:h-[1800px] md:h-[1500px] h-[1200px] lg:w-[1800px] md:w-[1500px] w-[1200px] !border-none">
        <div class="circle-wrapper lg:h-[1480px] md:h-[1240px] h-[1000px] lg:w-[1480px] md:w-[1240px] w-[1000px]">
          <div class="circle-wrapper lg:h-[1160px] md:h-[980px] h-[800px] lg:w-[1160px] md:w-[980px] w-[800px]">
            <div class="circle-wrapper lg:h-[840px] md:h-[720px] h-[600px] lg:w-[840px] md:w-[720px] w-[600px]">
              <div class="circle-wrapper lg:h-[520px] md:h-[460px] h-[400px] lg:w-[520px] md:w-[460px] w-[400px]">
                <div class="circle-wrapper h-[200px] w-[200px]">
                  <div v-for="(mission, index) in pageData.missions"
                       class="absolute left-[-20%] lg:h-[300px] md:h-[250px] h-[180px] lg:w-[300px] md:w-[250px] w-[180px] md:py-5 md:px-8 py-3 px-5 bg-[#edf2f1] border border-[#64DB86] rounded-full text-center whitespace-pre-wrap"
                       :class="`deg-${index*(360/pageData.missions.length)}`">
                    <div class="h-full flex justify-center flex-col items-center relative md:gap-3.5 gap-1">
                      <div
                          class="absolute lg:w-[120px] md:w-[100px] w-[70px] lg:h-[120px] md:h-[100px] h-[70px] -top-1/3 rounded-full border border-[#64DB86] bg-[#edf2f1] flex justify-center items-center">
                        <img class="lg:w-[70px] md:w-[50px] w-[30px] lg:h-[70px] md:h-[50px] h-[30px]"
                             :src="mission.icon"
                             :alt="mission.icon">
                      </div>
                      <div
                          class="lg:text-[32px]/[45px] md:text-[24px]/[28px] text-[15px] text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258] font-medium">
                        {{ mission.title }}
                      </div>
                      <div class="lg:text-base md:text-sm text-[10px] text-gray-600">
                        {{ mission.content }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div
          class="py-5 lg:px-10 md:px-5 px-2 w-full max-w-[1440px] max-h-[1500px] h-full absolute xl:top-[70%] lg:top-[68%] md:top-[68%] top-[75%] z-10">
        <div
            class="rounded-[20px] bg-gradient-to-br from-[#f8fafa] to-[#fbf6f0] border border-[#c1da73] flex flex-col h-fit xl:pt-[80px] lg:py-[50px] md:py-[20px] py-5">
          <div class="xl:px-[95px] lg:px-[50px] md:px-[20px] px-5">
            <div>
              <img class="w-full max-h-[550px]" src="../assets/evaluate_top.png" alt="evaluate_top">
            </div>
            <div class="grid md:grid-cols-2 grid-cols-1 xl:gap-20 gap-5 md:mt-[50px] mt-[25px]">
              <div class="text-justify space-y-5"
                   data-aos="fade-down"
                   data-aos-duration="500"
                   data-aos-easing="ease-in-out">
                <div
                    class="whitespace-pre-wrap font-medium xl:text-[50px]/[64px] lg:text-[34px]/[46px] md:text-[30px]/[36px] text-[20px]/[30px] text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258]">
                  {{ titleEvaluatePart }}
                </div>
                <div class="ql-editor !p-0 !text-left text-gray-600" v-html="pageData.descriptionEvaluate"/>
              </div>
              <div data-aos="fade-up"
                   data-aos-duration="500"
                   data-aos-easing="ease-in-out">
                <Flicking :options="{ align: 'center', circular: true, adaptive: true }"
                          :plugins="plugins"
                          class="rounded-[15px] !h-full max-h-[210px]">
                  <div v-for="(slide, index) in pageData.evaluateSlides"
                       :key="index"
                       class="w-full h-full relative">
                    <div class="h-full rounded-[20px]">
                      <img :alt="slide.image[0]?.url"
                           :src="handleGoogleImageLink(slide.image[0]?.url)"
                           class="object-cover rounded-[20px]"
                           loading="lazy">
                    </div>

                    <div
                        class="rounded-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-black bg-opacity-50 flex flex-col gap-5 justify-center items-center">
                      <div class="text-white !h-fit">
                        <div class="ql-editor !p-0 !text-center font-semibold tracking-wide"
                             v-html="slide.title"/>
                      </div>
                      <a-button class="text-white h-fit min-h-[50px] md:text-base xl:text-lg">
                        <a :href="slide.target" target="_blank">
                          Đánh giá ngay
                        </a>
                      </a-button>
                    </div>
                  </div>
                  <template #viewport>
                    <span class="evaluate-slide-arrow flicking-arrow-prev is-thin"/>
                    <span class="evaluate-slide-arrow flicking-arrow-next is-thin"/>
                    <div class="evaluate-slide-pagination flicking-pagination"/>
                  </template>
                </Flicking>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="xl:mt-[330px] lg:mt-[230px] md:mt-[100px] mt-[320px] w-full max-w-[1440px]">
      <div class="py-5 lg:px-10 md:px-5 px-2">
        <div class="rounded-[20px] bg-[#E7E6DF] border border-[#c1da73]">
          <div class="rounded-t-[20px] overflow-hidden">
            <img src="https://lh3.googleusercontent.com/pw/ABLVV8770J8YWUY9Gvint59mxO4vsFdaOEPxrbraglLED4n7j394Rxdcq1o5l7Zum8jibI2E5H3KReZHH0WKAGZo_7Xb8wYfRJxlJhMQ4Z9R-UlnnLxY5W0qPEjztCUV8HYaVH6m5DXF-pujz9lQEO5zHVMF=w1047-h968-s-no-gm?authuser=0"
                 class="w-full"
                 alt="esg_homepage_top">
          </div>
          <div class="xl:px-[95px] lg:p-[50px] xl:pt-0 xl:pb-[80px] md:p-[20px] p-5 pt-0">
            <div class="flex lg:flex-row flex-col gap-5 md:mt-[50px] mt-[25px]">
              <div class="space-y-5 basis-1/2"
                   data-aos="fade-down"
                   data-aos-duration="500"
                   data-aos-easing="ease-in-out">
                <div
                    class="whitespace-pre-wrap font-medium xl:text-[50px]/[64px] lg:text-[34px]/[46px] md:text-[30px]/[36px] text-[26px]/[32px] text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258]">
                  {{ titleESGPart }}
                </div>
                <div class="text-base/[26.5px] font-normal text-[#659D51]">
                  {{ pageData.descriptionESGPart }}
                </div>
                <div class="md:px-6 px-3 md:py-2 lg:py-3 md:text-base xl:text-xl md:min-h-[50px] min-h-[30px] flex justify-center items-center border border-image hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-500 hover:cursor-pointer
                                         text-transparent bg-gradient-to-r bg-clip-text from-blue-400 to-green-500 hover:bg-clip-padding hover:text-white w-fit"
                     style="border-image: linear-gradient(45deg, #60a5fa, #22c55e) 1"
                     @click.prevent="router.push('/esg-vietnam')">
                  ĐĂNG KÝ THAM GIA NGAY
                </div>
              </div>
              <div class="rounded-[10px] flex justify-end items-center basis-1/2"
                   data-aos="fade-up"
                   data-aos-duration="500"
                   data-aos-easing="ease-in-out">
                <iframe :src="pageData.videoESGPart"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen/>
              </div>
            </div>
            <div class="md:mt-[100px] mt-[50px]"
                 data-aos="fade-down"
                 data-aos-duration="500"
                 data-aos-easing="ease-in-out">
              <div
                  class="whitespace-pre-wrap py-1 font-medium xl:text-[50px]/[50px] lg:text-[34px]/[34px] md:text-[30px]/[30px] text-[26px]/[26px] text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258]">
                {{ titleStories }}
              </div>
              <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-11 gap-y-24 mt-[45px]">
                <div class="relative hover:cursor-pointer" v-for="story in storiesToShow"
                     @click.prevent="handleOpenLink(story.content)">
                  <div
                      class="aspect-[1.56] w-full max-w-[350px] border border-[#c1da73] rounded-[10px] overflow-hidden">
                    <img class="rounded-[10px] h-full w-full hover:scale-110 transition-all duration-500 ease-in-out"
                         :src="story.thumbnail"
                         :alt="story.name">
                  </div>
                  <div
                      class="bg-white rounded-[10px] p-2.5 flex justify-between max-w-[295px] 2xl:w-[88%] xl:w-[85%] lg:w-[80%] w-[83%] border-b-4 border-[#659D51] absolute -bottom-[15%] left-[29px] hover:cursor-pointer"
                      @click.prevent="handleOpenLink(story.content)">
                    <div class="flex justify-between gap-2 h-[70px]">
                      <div
                          class="font-medium xl:text-lg/[22px] lg:text-[13px]/[20px] text-base/[22px] tracking-wider text-[#263238] flex items-end">
                        <div class="line-clamp-3 text-ellipsis">
                          {{ story.description }}
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
              <div class="mt-[120px] text-center mb-[50px]" v-if="!isAllStories">
                <a-button
                    class="rounded-[88px] border-[#BABABA] h-[50px] lg:w-[300px] w-[220px] font-medium lg:text-2xl/[40px] text-xl/[40px] text-[#717171] tracking-[.2em]"
                    @click.prevent="showMore">
                  XEM THÊM
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-5 xl:px-[145px] px-5 mb-10 xl:mt-[100px] md:mt-[80px] mt-[40px]">
        <div
            class="text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258] font-medium xl:text-[50px]/[64px] lg:text-[34px]/[46px] md:text-[30px]/[36px] text-[26px]/[32px]">
          Tin tức & Sự kiện
        </div>
        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          <a-card v-for="news in pageData.hotNews"
                  class="md:basis-[48%] lg:basis-[45%] xl:basis-1/4 basis-full"
                  data-aos="fade-down"
                  data-aos-duration="500"
                  data-aos-easing="ease-in-out">
            <template #cover>
              <a v-if="news.contentType === 'LINK'"
                 :href="news.href"
                 class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all"
                 target="_blank">
                <img :alt="news.thumbnail"
                     :src="handleGoogleImageLink(news.thumbnail)"
                     class="aspect-[16/11] w-full hover:scale-110 transition-all object-cover"
                     loading="lazy">
              </a>
              <a v-else
                 class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all"
                 @click.prevent="handleSeeDetail(news)">
                <img :alt="news.thumbnail"
                     :src="handleGoogleImageLink(news.thumbnail)"
                     class="aspect-[16/11] w-full hover:scale-110 transition-all object-cover"
                     loading="lazy">
              </a>
            </template>
            <div class="space-y-2">
              <a v-if="news.contentType === 'LINK'" :href="news.href"
                 class="h-[60px] font-medium line-clamp-2 text-ellipsis text-lg text-[#263238] tracking-wide"
                 target="_blank">
                {{ news.title }}
              </a>
              <a v-else
                 class="h-[60px] font-medium line-clamp-2 text-ellipsis text-lg text-[#263238] tracking-wide"
                 @click.prevent="handleSeeDetail(news)">
                {{ news.title }}
              </a>
              <div class="text-[12px] line-clamp-4 text-ellipsis text-justify">
                {{ news.description }}
              </div>
            </div>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.evaluate-slide-pagination .flicking-pagination-bullet) {
  width: 50px;
  height: 3px;
  border-radius: 0;
}

:deep(.evaluate-slide-pagination .flicking-pagination-bullet-active) {
  background: #f4f4f4;
}

:deep(.evaluate-slide-arrow:before),
:deep(.evaluate-slide-arrow:after),
:deep(.evaluate-slide-arrow:before),
:deep(.evaluate-slide-arrow:after) {
  width: 10px;
  background: #f4f4f4;
}

.circle-wrapper {
  border-radius: 50%;
  border: solid 1px #CCE5D8;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.deg-0 {
  transform: translate(260px)
}

.deg-90 {
  left: -25%;
  transform: rotate(90deg) translate(170px) rotate(-90deg);
}

.deg-180 {
  transform: rotate(180deg) translate(280px) rotate(-180deg);
}

.deg-270 {
  left: -25%;
  transform: rotate(270deg) translate(210px) rotate(-270deg);
}

iframe {
  width: 100%;
  height: 340px;
}

@media only screen and (max-width: 430px) {
  .deg-0 {
    transform: translate(154px)
  }

  .deg-90 {
    left: 5%;
    transform: rotate(90deg) translate(200px) rotate(-90deg);
  }

  .deg-180 {
    transform: rotate(180deg) translate(57px) rotate(-180deg);
  }

  .deg-270 {
    left: 5%;
    transform: rotate(270deg) translate(200px) rotate(-270deg);
  }

  :deep(.carousel-container .slick-slide) {
    height: 200px;
  }
  iframe {
    height: 260px;
  }
}

@media only screen and (min-width: 431px) and (max-width: 768px) {
  .deg-90 {
    left: -10%;
    transform: rotate(90deg) translate(150px) rotate(-90deg);
  }
  .deg-180 {
    transform: rotate(180deg) translate(230px) rotate(-180deg);
  }
  .deg-270 {
    left: -10%;
    transform: rotate(270deg) translate(160px) rotate(-270deg);
  }
  :deep(.carousel-container .slick-slide) {
    height: 200px;
  }
  iframe {
    height: 350px;
  }
}

@media only screen and (min-width: 769px) and (max-width: 1024px) {
  iframe {
    height: 270px;
  }
}
</style>
