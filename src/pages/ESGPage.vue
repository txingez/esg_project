<script setup>

import BreadCrumb from "../components/BreadCrumb.vue";
import { onMounted, reactive, ref } from "vue";
import { SUCCESS_STORIES } from "../constants/successStories.js";
import { getPosts } from "../services/posts.js";
import { useJwt } from "@vueuse/integrations/useJwt";

const screenWidth = ref(0)
const isAllStories = ref(false)
const storiesToShow = ref([])
const isVisible = ref(false)
const srcViewer = ref('')

const pageData = reactive({
  banner: '',
  titleIntroduction: '',
  contentIntroduction: '',
  titleBenefit: '',
  contentsBenefit: [],
  titleCondition: '',
  contentCondition: '',
  titleTimeline: '',
  timelines: []
})

const routes = [
  {name: 'Home', to: '/'},
  {name: 'Sáng kiến ESG Việt Nam', to: '/esg-vietnam'},
]

const titleStories = 'Câu chuyện điển hình về kinh doanh bền vững'
const timelineColors = ['#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1']

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
    console.log(getPostDatDecoded)
    pageData.banner = getPostDatDecoded.data.banner[0]?.url
    pageData.titleIntroduction = getPostDatDecoded.data.introduction.title
    pageData.contentIntroduction = getPostDatDecoded.data.introduction.content
    pageData.titleBenefit = getPostDatDecoded.data.benifit.headTitle
    pageData.contentsBenefit = getPostDatDecoded.data.benifit.contents
    pageData.titleCondition = getPostDatDecoded.data.condition.title
    pageData.contentCondition = getPostDatDecoded.data.condition.content
    pageData.titleTimeline = getPostDatDecoded.data.timeline.headTitle
    pageData.timelines = getPostDatDecoded.data.timeline.contents.map((t, index) => ({...t, ...{bgColor: timelineColors[index]}}))
  })
  storiesToShow.value = SUCCESS_STORIES.slice(0, 6)
})

const showMore = () => {
  const newStoriesToShow = SUCCESS_STORIES.slice(0, storiesToShow.value.length + 6)
  storiesToShow.value = newStoriesToShow
  isAllStories.value = newStoriesToShow.length === SUCCESS_STORIES.length
}

const setVisible = (story) => {
  isVisible.value = true
  srcViewer.value = story.content
}

const closeImageViewer = () => {
  isVisible.value = false
  srcViewer.value = ''
}
</script>

<template>
  <div v-if="isVisible"
       class="fixed z-[1000] p-1 left-0 top-0 w-screen h-screen overflow-auto bg-black bg-opacity-70 flex justify-center items-center">
    <font-awesome-icon
        class="absolute top-0 right-0 -translate-x-6 translate-y-6 text-4xl text-white hover:cursor-pointer"
        icon="fa-solid fa-xmark"
        @click.prevent="closeImageViewer"/>
    <img :src="srcViewer" alt="">
  </div>

  <div class="">
    <img :src="pageData.banner"
         class="w-full"
         alt="banner_esg">
  </div>
  <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
    <BreadCrumb :routes="routes"/>
    <div>
      <div class="text-[#004990] xl:text-3xl md:text-2xl text-lg text-center mt-5 mb-10">
        {{ pageData.titleIntroduction }}
      </div>
      <div class="ql-editor" v-html="pageData.contentIntroduction"/>
    </div>
  </div>
  <div class="bg-[url(https://main.ipsc.vn/hubfs/raw_assets/public/IPSC%20v2/css/images/graphics/bg-support-project.png)]
    text-white md:px-10 lg:px-[100px] xl:px-[150px] px-5 pb-20">
    <div class="xl:text-[40px] lg:text-[34px] md:text-[28px] text-2xl leading-none text-center py-10 font-bold">
      <span>{{ pageData.titleBenefit }}</span>
    </div>
    <div class="text-justify space-y-8">
      <div class="space-y-1" v-for="benefit in pageData.contentsBenefit">
        <div class="font-semibold xl:text-2xl md:text-xl text-lg">
          {{ benefit.title }}
        </div>
        <div>{{ benefit.description }}</div>
      </div>
    </div>
  </div>

  <div class="bg-[url(https://main.ipsc.vn/hubfs/raw_assets/public/IPSC%20v2/css/images/graphics/bg-support-enterprise.png)]
    md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
    <div class="text-[#004990] xl:text-3xl md:text-2xl text-lg text-center mb-10">
      {{ pageData.titleCondition }}
    </div>
    <div class="ql-editor" v-html="pageData.contentCondition"/>
  </div>

  <section id=timeline class="py-16 bg-[#f7f7f7]">
    <div class="text-[#004990] xl:text-3xl md:text-2xl text-lg text-center mb-10">
      {{ pageData.titleTimeline }}
    </div>
    <div class="lg:grid lg:grid-cols-2 grid-cols-1 relative">
      <div v-for="(tlc, index) in pageData.timelines" class="demo-card-block flex border-1 border-[#bdbdbd] lg:py-5 md:p-0 lg:static lg:m-0 lg:after:hidden
            relative m-auto after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-1/2 after:border-l after:border-[#bdbdbd]">
        <div class="demo-card h-fit md:!max-w-[60%] lg:!max-w-[450px] shadow-md">
          <div class="head border-none flex-col gap-1 h-[160px] p-2 !items-start"
               :class="`bg-[${tlc.bgColor}] after:border-[${tlc.bgColor}]`">
            <div class="bg-black bg-opacity-10 p-2.5">
              <span class="text-xl font-semibold">{{ tlc.datetime }}</span>
            </div>
            <div class="text-xl px-2">
              {{ tlc.title.toUpperCase() }}
            </div>
          </div>
          <div class="body">
            <p class="whitespace-pre-wrap text-base">{{ tlc.description }}</p>
            <div :class="tlc.image.length !== 0 ? '' :'h-[235px]' ">
              <img v-if="tlc.image.length !== 0" :src="tlc.image[0]?.url" alt="Graphic">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
    <div class="text-[#004990] xl:text-3xl md:text-2xl text-lg text-center mb-10">
      {{ titleStories }}
    </div>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-24 mt-[45px]">
      <div class="relative hover:cursor-pointer" v-for="story in storiesToShow"
           @click.prevent="setVisible(story)">
        <div class="h-[250px] w-full border border-[#c1da73] rounded-[10px] overflow-hidden">
          <img class="rounded-[10px] h-full w-full hover:scale-110 transition-all duration-500 ease-in-out"
               :src="story.thumbnail"
               :alt="story.name">
        </div>
        <div
            class="bg-white rounded-[10px] p-2.5 flex justify-between 2xl:w-[88%] xl:w-[85%] lg:w-[80%] w-[83%] border-b-4 border-[#659D51] absolute -bottom-[15%] left-[29px] hover:cursor-pointer"
            @click.prevent="setVisible(story)">
          <div class="flex justify-between gap-2 h-[70px]">
            <div
                class="font-medium xl:text-lg/[22px] lg:text-[13px]/[20px] text-base/[22px] tracking-[0.05em] text-[#263238] flex items-end">
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
</template>

<style>
.ql-editor {
  padding: 0 !important;
}

.ql-editor .ql-video {
  margin: 20px auto !important;
  width: calc(100vw - 50%) !important;
  height: 500px !important;
}

.ql-editor p {
  line-height: 1.5rem;
}

@media screen and (max-width: 430px) {
  .ql-editor .ql-video {
    width: 100%;
    height: 250px;
  }
}

@media screen and (min-width: 431px) and (max-width: 768px) {
  .ql-editor .ql-video {
    width: calc(100vw - 40%);
    height: 300px;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .ql-editor .ql-video {
    width: calc(100vw - 50%);
    height: 350px;
  }
}

@media (min-width: 1000px) {
  #timeline .demo-card:nth-child(even) .head::after, #timeline .demo-card:nth-child(odd) .head::after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }

  #timeline .demo-card:nth-child(even) .head::before, #timeline .demo-card:nth-child(odd) .head::before {
    position: absolute;
    content: "";
    width: 9px;
    height: 9px;
    background-color: #bdbdbd;
    border-radius: 9px;
    box-shadow: 0px 0px 2px 8px #f7f7f7;
  }
}

/* Some Cool Stuff */

#timeline .demo-card {
  position: relative;
  display: block;
  margin: 10px auto 80px;
  max-width: 94%;
  z-index: 2;
}

#timeline .demo-card-block:nth-child(odd) {
  justify-self: end;
  border-right: 1px solid #000;
}

#timeline .demo-card-block:nth-child(even) {
  justify-self: start;
}

@media only screen and (max-width: 768px) {
  #timeline .demo-card-block:nth-child(odd) {
    border-right: none;
  }
}

@media (min-width: 1000px) {
  #timeline .demo-card {
    max-width: 450px;
  }

  #timeline .demo-card-block:nth-child(odd) .demo-card {
    margin-right: 45px;
  }

  #timeline .demo-card-block:nth-child(odd) .demo-card .head::after {
    border-left-width: 15px;
    border-left-style: solid;
    left: 100%;
    top: 40%;
  }

  #timeline .demo-card-block:nth-child(odd) .demo-card .head::before {
    left: 491.5px;
    top: 47%;
  }

  #timeline .demo-card-block:nth-child(even) .demo-card {
    margin-left: 45px;
    transform: translateY(100px);
  }

  #timeline .demo-card-block:nth-child(even) .demo-card .head::after {
    border-right-width: 15px;
    border-right-style: solid;
    left: -14px;
    top: 40%;
  }

  #timeline .demo-card-block:nth-child(even) .demo-card .head::before {
    right: 489.5px;
    top: 47%;
  }
}

#timeline .demo-card .head {
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 400;
}

#timeline .demo-card .body {
  background: #fff;
  border: 1px solid rgba(191, 191, 191, 0.4);
  border-top: 0;
  padding: 15px;
}
</style>
