<script setup>
import { useRouter } from "vue-router";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import { Arrow, Fade, Pagination, AutoPlay } from "@egjs/flicking-plugins";
import { ref } from "vue";
import { handleGoogleImageLink } from "../utils/handleGoogleImageLink.js";
import { useI18n } from 'vue-i18n';

const router = useRouter()
const {t, locale} = useI18n()

defineProps({
  slides: Array
})

const plugins = ref([
  // new AutoPlay({duration: 3000, direction: "NEXT", stopOnHover: true}),
  new Fade(),
  new Arrow(),
  new Pagination({
    type: 'bullet',
  })
])

const handleClickBtn = target => {
  window.open(target, target.includes('esg-demo.web.app') ? '_self' : '_blank')
}
</script>

<template>
  <div class="w-full h-[calc(100vh_-_165px_-_40px)] xl:max-h-[850px] md:max-h-[500px] max-h-[300px] max-w-[1440px] m-[0_auto] md:px-10 px-2 py-5 relative">
    <Flicking :options="{ align: 'center', circular: true, adaptive: true }" :plugins="plugins"
              class="rounded-[20px] !h-full">
      <div v-for="(banner, index) in slides" class="w-full h-full relative" :key="index">
        <div v-if="index === 0" class="absolute h-full w-full flex flex-col items-center justify-center gap-4 xl:top-[24%] md:top-[27%] top-[29%]">
<!--          <div class="flex gap-10 md:-translate-y-[60%] logo-banner">-->
<!--            <img src="../assets/usaid.png" class="md:h-[90px] h-[50px]" alt="usaid" id="usaid">-->
<!--            <img src="../assets/mpi.png" class="md:h-[80px] h-[42px]" alt="mpi" id="mpi">-->
<!--            <img src="../assets/aed.png" alt="aed" class="md:h-[90px] h-[55px]" id="aed">-->
<!--          </div>-->
          <div class="space-y-5">
<!--            <div class="p-1.5 break-after-auto font-bold whitespace-pre-wrap text-center xl:text-[6vh]/[7vh] lg:text-5xl/[4vh] lg:py-1 md:text-4xl/[4vh] text-base-->
<!--                      text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 w-full">-->
<!--              {{ locale === 'en' && !!banner.titleEn && banner.titleEn !== '' ? banner.titleEn : banner.title }}-->
<!--            </div>-->
<!--            <div-->
<!--                class="whitespace-pre-wrap xl:text-2xl lg:text-lg md:text-base text-xs italic xl:pr-72 lg:pr-32 md:pr-28 pr-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">-->
<!--              {{ locale === 'en' && !!banner.descriptionEn && banner.descriptionEn !== '' ? banner.descriptionEn : banner.description }}-->
<!--            </div>-->
            <div class="flex flex-col gap-2 items-center">
<!--              <div :class="banner.labelBtn ? '' : 'invisible'"-->
<!--                   class="w-fit md:px-6 px-3 md:py-2 lg:py-3 md:text-base xl:text-lg md:min-h-[50px] min-h-[30px] flex justify-center items-center border rounded border-image hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-500 hover:cursor-pointer-->
<!--                      text-transparent bg-gradient-to-r bg-clip-text from-blue-400 to-green-500 hover:bg-clip-padding hover:text-white"-->
<!--                   style="border-image: linear-gradient(45deg, #60a5fa, #22c55e) 1"-->
<!--                   @click.prevent="handleClickBtn(banner.target)">-->
<!--                {{ locale === 'en' && !!banner.labelBtnEn && banner.labelBtnEn !== '' ? banner.labelBtnEn : banner.labelBtn }}-->
<!--              </div>-->
              <div :class="banner.labelBtn ? '' : 'invisible'"
                   class="w-fit md:px-6 px-3 md:py-3 lg:py-3 py-2 md:text-base xl:text-lg text-[10px] md:min-h-[50px] min-h-[30px] font-bold bg-[#0e8369] rounded-[30px] hover:cursor-pointer"
                   @click.prevent="handleClickBtn(banner.target)">
                {{ locale === 'en' && !!banner.labelBtnEn && banner.labelBtnEn !== '' ? banner.labelBtnEn : banner.labelBtn }}
              </div>
              <div class="text-[#35426e] md:text-[16px] text-[10px] font-bold">
                {{ $t("carousel.banner_1") }}
              </div>
            </div>
          </div>
        </div>
        <div v-else
             class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    flex flex-col lg:gap-5 md:gap-2.5 gap-2 w-full h-full justify-end items-start lg:p-14 md:p-8 p-5">
          <div
              :class="banner.placeTitle === 'center' ? 'text-center md:-translate-y-[130%] xl:text-6xl lg:text-5xl lg:py-1 md:text-4xl text-base' : 'md:text-5xl lg:text-6xl xl:text-7xl text-2xl'"
              class="p-1.5 break-after-auto font-bold whitespace-pre-wrap
                                    text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 w-full">
            {{ locale === 'en' && !!banner.titleEn && banner.titleEn !== '' ? banner.titleEn : banner.title }}
          </div>
          <div
              class="whitespace-pre-wrap xl:text-2xl lg:text-lg md:text-base text-xs italic xl:pr-72 lg:pr-32 md:pr-28 pr-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
            {{ locale === 'en' && !!banner.descriptionEn && banner.descriptionEn !== '' ? banner.descriptionEn : banner.description }}
          </div>
          <div :class="banner.labelBtn ? '' : 'invisible'"
               class="md:px-6 px-3 md:py-2 lg:py-3 md:text-base xl:text-2xl md:min-h-[50px] min-h-[30px] flex justify-center items-center border rounded border-image hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-500 hover:cursor-pointer
                                         text-transparent bg-gradient-to-r bg-clip-text from-blue-400 to-green-500 hover:bg-clip-padding hover:text-white"
               style="border-image: linear-gradient(45deg, #60a5fa, #22c55e) 1"
               @click.prevent="handleClickBtn(banner.target)">
            {{ locale === 'en' && !!banner.labelBtnEn && banner.labelBtnEn !== '' ? banner.labelBtnEn : banner.labelBtn }}
          </div>
        </div>
        <div class="h-full">
          <img :src="handleGoogleImageLink(banner.image[0]?.url)"
               class="h-full w-full"
               :class="index === 0 ? '' : 'object-cover'"
               alt="carousel"
               loading="lazy">
        </div>
      </div>
      <template #viewport>
        <span class="flicking-arrow-prev"/>
        <span class="flicking-arrow-next"/>
        <div class="flicking-pagination"/>
      </template>
    </Flicking>
  </div>
</template>

<style scoped>
:deep(.flicking-pagination-bullet) {
  width: 50px;
  height: 3px;
  border-radius: 0;
}

:deep(.flicking-pagination-bullet-active) {
  background: #0E7AB7;
}

:deep(.flicking-arrow-prev:before), :deep(.flicking-arrow-prev:after), :deep(.flicking-arrow-next:before), :deep(.flicking-arrow-next:after) {
  background: #0E7AB7;
}

@media only screen and (min-height: 900px) and (min-width: 1440px){
  .logo-banner {
    transform: translateY(-100%);
  }
  #usaid {
    height: 120px;
  }
  #mpi {
    height: 100px;
  }
  #aed {
    height: 130px;
  }
}
</style>
