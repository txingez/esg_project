<script setup>
import Carousel from "../components/Carousel.vue";
import { onMounted, reactive, ref } from "vue";
import AOS from 'aos'
import { getHotNews, getPosts } from "../services/posts.js";
import { useJwt } from "@vueuse/integrations/useJwt";
import axios from "axios";
import { SUCCESS_STORIES } from "../constants/successStories.js";

const pageData = reactive({
	carouselData: [],
	introduction: '',
	titleMission: '',
	imageMission: [],
	missions: [],
	descriptionEvaluate: '',
	evaluateSlides: [],
	hotNews: []
})
const screenWidth = ref(0)
const evaluatePart = ref(null)
const evaluatePartHeight = ref(0)
const loading = ref(false)
const isAllStories = ref(false)
const storiesToShow = ref([])
const isVisible = ref(false)
const srcViewer = ref('')

const routes = [
	{name: 'Home', to: '/'}
]

const updateScreenWidth = () => {
	screenWidth.value = window.innerWidth;
}

const updateEvaluatePartHeight = () => {
	evaluatePartHeight.value = evaluatePart.value.offsetHeight
}

const onScreenResize = () => {
	window.addEventListener("resize", () => {
		updateScreenWidth();
		updateEvaluatePartHeight();
	});
}

onMounted(() => {
	updateScreenWidth()
	onScreenResize()
	AOS.init()
	storiesToShow.value = SUCCESS_STORIES.slice(0, 6)
	loading.value = true
	axios.all([getPosts('HOME', 10, 0), getHotNews(4)])
		.then(
			axios.spread((getPostResponse, getHotNewsResponse) => {
				const getPostDataDecoded = useJwt(getPostResponse.data[0].content).payload.value
				pageData.introduction = getPostDataDecoded.data.introduction
				pageData.titleMission = getPostDataDecoded.data.titleMission
				pageData.imageMission = getPostDataDecoded.data.imageMission
				pageData.missions = getPostDataDecoded.data.missions
				pageData.descriptionEvaluate = getPostDataDecoded.data.descriptionEvaluate
				pageData.evaluateSlides = getPostDataDecoded.data.evaluateSlides
				pageData.carouselData = getPostDataDecoded.data.bannerSlides

				pageData.hotNews = getHotNewsResponse.data.data.map(hotNews => ({
					title: hotNews.title,
					href: hotNews.content,
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

const titleIntroduction = 'Kênh thông tin chính thức của \nCục Phát triển doanh nghiệp, Bộ Kế hoạch và Đầu tư \nthúc đẩy áp dụng kinh doanh bền vững tại Việt Nam'
const descriptionIntroduction = 'Triển khai chương trình hỗ trợ doanh nghiệp khu vực tư nhân \nkinh doanh bền vững giai đoạn 2022-2025 được phê duyệt theo \nquyết định 167/QĐ-TTg 2022 của thủ tướng chính phủ'
const missions = [

	{
		title: 'Tiết kiệm năng lượng quốc gia',
		description: 'Góp phần đạt mức tiết kiệm năng lượng 5,0-7,0% tổng tiêu thụ năng lượng toàn quốc.',
		imgIcon: 'https://lh3.googleusercontent.com/pw/ADCreHdjMApadQJ-1u4HJ5XPkPu8ZLb9yOBCkdbxg6qcdmm4ZFBlMBMNbC6A6O1DgozeJ46gRk2pt4A_qvqZgl96Qpbjl6Euju43-bg95t-2OXaFxVv20d-oWTFPDwKlmqRk_lM7xcI21O5XlSxCt5ctwaOC=w72-h72-s-no?authuser=0'
	},
	{
		title: 'Đẩy mạnh \nthực hành',
		description: 'Hỗ trợ khoảng 10.000 doanh nghiệp khu vực tư nhân thực hành kinh doanh bền vững.',
		imgIcon: 'https://lh3.googleusercontent.com/pw/ADCreHcBuJY89kwhiwesqjGJVGbjyO-kxYpc0-jqL5OHY4RIJRxC5JERVMwHRYO70TAPG5pJz5kTrLB8q_Y7jp7IHcYqjwVAge8Rjz7RHKur0rCWFsFRDDuBJZ6L-3zJeuPeDInYtKSTwOKXi3ahpt33jopx=w77-h80-s-no?authuser=0'
	},
	{
		title: 'Nâng cao năng suất lao động',
		description: 'Tăng năng suất lao động bình quân khoảng 7%/năm.',
		imgIcon: 'https://lh3.googleusercontent.com/pw/ADCreHckVYPWmR1sdx7blvN_t8CLhRPktUDnq-E1tqZ6SKvISe9NqoFtUEFFNeD4uPP4HUS2EhkY82jFgmfQzrT4YYw6tMSHoFOm0K0AfqvVoBvnL3wj4QzGR9ZIMIKWddVdlZgmyTYzGOKB88r5GR8aAvWJ=w73-h78-s-no?authuser=0'
	},
	{
		title: 'Nâng cao \nnhận thức',
		description: 'Nâng cao nhận thức của cộng đồng doanh nghiệp khu vực tư nhân về kinh doanh bền vững.',
		imgIcon: 'https://lh3.googleusercontent.com/pw/ADCreHfOCK2qtO1eGyP-oj1XINRT-ikEqt72P1R4avNg76nN3ThXISajc8syUjFoxMoQNloSZx0jvNw7Xa2ZtmVkEXKZaCNoHYbqij-xO7Djc8GS8k4GB2SnjQdkhWbwQpSZ5x6bpi_-ZaEl0Z5T3xJ3GVsl=w78-h93-s-no?authuser=0'
	}
]

const titleEvaluatePart = 'Bộ công cụ đánh giá \nKinh doanh bền vững'
const titleESGPart = 'Giới thiệu'
const descriptionESGPart = 'Sáng kiến ESG Việt Nam (Vietnam ESG Initiative) là chương trình hỗ trợ các doanh nghiệp kinh doanh bền vững triển khai thực hành khung đánh giá ESG. Sáng kiến được hình thành trong khuôn khổ hợp tác giữa Cơ quan Phát triển Quốc tế Hoa Kỳ (USAID) và Bộ Kế hoạch và Đầu tư, nhằm thúc đẩy tăng trưởng bền vững và bao trùm trong khu vực kinh tế tư nhân tại Việt Nam. Sáng kiến này là một phần của Dự án Tăng cường năng lực cạnh tranh khu vực tư nhân Việt Nam (USAID IPSC) do Cơ quan Phát triển Quốc tế Hoa Kỳ (USAID) tài trợ và Cục Phát triển doanh nghiệp thuộc Bộ Kế hoạch và Đầu tư là chủ dự án.'
const titleStories = 'Câu chuyện điển hình về \nkinh doanh bền vững'

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

    <div class="py-5 md:px-10 px-2 rounded-[10px]">
        <Carousel v-if="pageData.carouselData.length !== 0" :slides="pageData.carouselData"/>
    </div>

    <div class="relative">
        <div class="flex justify-center items-center relative overflow-hidden">
            <div class="absolute top-0 z-10">
                <div class="text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258] whitespace-pre-wrap
            text-center lg:text-[40px] md:text-[28px] text-[15px] md:leading-[48.59px] leading-[30px] md:mt-[80px] mt-[40px] font-medium">
                    {{ titleIntroduction }}
                </div>
                <div class="text-[#757575] whitespace-pre-wrap font-medium lg:text-[14px]/[26.25px] text-[8px]/[20px] text-center md:tracking-[.20em] tracking-[.1em] md:mt-[35px] mt-[15px]">
                    {{ descriptionIntroduction.toUpperCase() }}
                </div>
                <div class="flex justify-center md:mt-[85px] mt-[45px]">
                    <div class="h-[3px] md:w-[310px] w-[150px] bg-[#FF7437]"></div>
                </div>

                <div class="text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258] text-center
            lg:text-[40px] md:text-[28px] text-[15px] md:leading-[89.03px] leading-[40px] md:mt-[50px] mt-[25px] font-medium">
                    Mục tiêu
                </div>
            </div>
            <div class="circle-wrapper lg:h-[2200px] md:h-[1900px] h-[1350px] lg:w-[2200px] md:w-[1900px] w-[1350px] !border-none">
                <div class="circle-wrapper lg:h-[1800px] md:h-[1550px] h-[1120px] lg:w-[1800px] md:w-[1550px] w-[1120px]">
                    <div class="circle-wrapper lg:h-[1400px] md:h-[1250px] h-[890px] lg:w-[1400px] md:w-[1250px] w-[890px]">
                        <div class="circle-wrapper lg:h-[1000px] md:h-[900px] h-[660px] lg:w-[1000px] md:w-[900px] w-[660px]">
                            <div class="circle-wrapper lg:h-[600px] md:h-[550px] h-[430px] lg:w-[600px] md:w-[550px] w-[430px]">
                                <div class="circle-wrapper h-[200px] w-[200px]">
                                    <div v-for="(mission, index) in missions"
                                         class="absolute left-[-20%] lg:h-[345.27px] md:h-[250px] h-[180px] lg:w-[345.27px] md:w-[250px] w-[180px] md:py-5 md:px-8 py-3 px-5 bg-[#edf2f1] border border-[#64DB86] rounded-full text-center whitespace-pre-wrap"
                                         :class="`deg-${index*(360/missions.length)}`">
                                        <div class="h-full flex justify-center flex-col items-center relative md:gap-3.5 gap-1">
                                            <div class="absolute lg:w-[148.33px] md:w-[100px] w-[70px] lg:h-[148.33px] md:h-[100px] h-[70px] -top-1/3 rounded-full border border-[#64DB86] bg-[#edf2f1] flex justify-center items-center">
                                                <img class="lg:w-fit md:w-[50px] w-[30px] lg:h-fit md:h-[50px] h-[30px]"
                                                     :src="mission.imgIcon"
                                                     :alt="mission.imgIcon">
                                            </div>
                                            <div class="lg:text-[37.39px]/[45px] md:text-[24px]/[28px] text-[15px] text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258]">
                                                {{ mission.title }}
                                            </div>
                                            <div class="lg:text-base md:text-sm text-[10px]">
                                                {{ mission.description }}
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

        <div class="py-5 lg:px-10 md:px-5 px-2 absolute xl:top-[75%] lg:top-[73%] md:top-[68%] top-[75%] z-10 w-full"
             ref="evaluatePart">
            <div class="rounded-[10px] bg-[#f9faf9] border border-[#c1da73] flex flex-col">
                <div class="xl:px-[95px] lg:p-[50px] xl:py-[80px] md:p-[20px] p-5">
                    <div>
                        <img class="w-full max-h-[550px]" src="../assets/evaluate_top.png" alt="evaluate_top">
                    </div>
                    <div class="grid md:grid-cols-2 grid-cols-1 xl:gap-20 gap-5 md:mt-[50px] mt-[25px]">
                        <div class="text-justify space-y-5"
                             data-aos="fade-down"
                             data-aos-duration="500"
                             data-aos-easing="ease-in-out">
                            <div class="whitespace-pre-wrap font-medium xl:text-[50px]/[64px] lg:text-[34px]/[46px] md:text-[30px]/[36px] text-[20px]/[30px] text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258]">
                                {{ titleEvaluatePart }}
                            </div>
                            <div class="ql-editor !p-0" v-html="pageData.descriptionEvaluate"/>
                        </div>
                        <div class="rounded-[10px]"
                             data-aos="fade-up"
                             data-aos-duration="500"
                             data-aos-easing="ease-in-out">
                            <a-carousel id="overview"
                                        :autoplay-speed="3000"
                                        arrows
                                        autoplay
                                        class="carousel-container rounded-[10px]">
                                <template #prevArrow>
                                    <div class="custom-slick-arrow" style="left: 10px">
                                        <font-awesome-icon icon="fa-solid fa-chevron-left"/>
                                    </div>
                                </template>
                                <template #nextArrow>
                                    <div class="custom-slick-arrow" style="right: 10px">
                                        <font-awesome-icon icon="fa-solid fa-chevron-right"/>
                                    </div>
                                </template>
                                <div v-for="slide in pageData.evaluateSlides"
                                     class="relative overview-block h-full w-full text-black rounded-[10px]">
                                    <div class="w-full rounded-[10px]">
                                        <img :alt="slide.image[0]?.url"
                                             :src="slide.image[0]?.url"
                                             class="object-cover h-full w-full rounded-[10px]"
                                             loading="lazy">
                                    </div>

                                    <div class="rounded-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-[rgba(0,0,0,0.4)] flex flex-col gap-5 justify-center items-center">
                                        <div class="text-white !h-fit">
                                            <div class="ql-editor !p-0 !text-center font-semibold"
                                                 v-html="slide.title"/>
                                        </div>
                                        <a-button class="text-white h-fit min-h-[50px] md:text-base xl:text-lg">
                                            <a :href="slide.target" target="_blank">
                                                Đánh giá ngay
                                            </a>
                                        </a-button>
                                    </div>
                                </div>
                            </a-carousel>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center">
                    <img class="max-w-full h-full lg:min-h-[500px]" src="../assets/evaluate_bottom.png"
                         alt="evaluate_bottom">
                </div>
            </div>
        </div>
    </div>

    <div class="2xl:mt-[960px] xl:mt-[900px] lg:mt-[660px] md:mt-[420px] mt-[580px]">
        <div class="py-5 lg:px-10 md:px-5 px-2">
            <div class="rounded-[10px] bg-[#E7E6DF] border border-[#c1da73]">
                <div>
                    <img src="../assets/esg_top.png"
                         class="w-full"
                         alt="esg_homepage_top">
                </div>
                <div class="xl:px-[95px] lg:p-[50px] xl:py-[80px] md:p-[20px] p-5">
                    <div class="flex lg:flex-row flex-col gap-5 md:mt-[50px] mt-[25px]">
                        <div class="text-justify space-y-5 basis-1/2"
                             data-aos="fade-down"
                             data-aos-duration="500"
                             data-aos-easing="ease-in-out">
                            <div class="whitespace-pre-wrap font-medium xl:text-[50px]/[64px] lg:text-[34px]/[46px] md:text-[30px]/[36px] text-[26px]/[32px] text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258]">
                                {{ titleESGPart }}
                            </div>
                            <div class="text-base/[26.5px] font-normal text-[#659D51]">
                                {{ descriptionESGPart }}
                            </div>
                        </div>
                        <div class="rounded-[10px] flex justify-end items-center basis-1/2"
                             data-aos="fade-up"
                             data-aos-duration="500"
                             data-aos-easing="ease-in-out">
                            <iframe src="https://www.youtube.com/embed/LYjBzPa7fkA?si=BLUb2O66UelCCmyT"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen/>
                        </div>
                    </div>
                    <div class="md:mt-[100px] mt-[50px]"
                         data-aos="fade-down"
                         data-aos-duration="500"
                         data-aos-easing="ease-in-out">
                        <div class="whitespace-pre-wrap py-1 font-medium xl:text-[50px]/[50px] lg:text-[34px]/[34px] md:text-[30px]/[30px] text-[26px]/[26px] text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258]">
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
                                <div class="bg-white rounded-[10px] p-2.5 flex justify-between 2xl:w-[88%] xl:w-[85%] lg:w-[80%] w-[83%] border-b-4 border-[#659D51] absolute -bottom-[15%] left-[29px] hover:cursor-pointer"
                                     @click.prevent="setVisible(story)">
                                    <div class="flex justify-between gap-2 h-[70px]">
                                        <div class="font-medium xl:text-lg/[22px] lg:text-[13px]/[20px] text-base/[22px] tracking-[0.05em] text-[#263238] flex items-end">
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
        <div class="md:px-10 lg:px-[100px] px-5 space-y-5 mb-10 xl:mt-[100px] md:mt-[80px] mt-[40px]">
            <div class="text-transparent bg-clip-text bg-gradient-to-b from-[#00BEF0] to-[#2A4258] font-medium xl:text-[50px]/[64px] lg:text-[34px]/[46px] md:text-[30px]/[36px] text-[26px]/[32px]">
                Tin tức & Sự kiện
            </div>
            <div class="flex lg:gap-10 xl:gap-5 gap-5 md:flex-row flex-col flex-wrap justify-between">
                <a-card v-for="news in pageData.hotNews"
                        class="md:basis-[48%] lg:basis-[45%] xl:basis-[23%] basis-full"
                        data-aos="fade-down"
                        data-aos-duration="500"
                        data-aos-easing="ease-in-out">
                    <template #cover>
                        <a :href="news.href"
                           class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all"
                           target="_blank">
                            <img :alt="news.thumbnail"
                                 :src="news.thumbnail"
                                 class="lg:h-[200px] md:h-[150px] h-[200px] w-full hover:scale-110 transition-all"
                                 loading="lazy">
                        </a>
                    </template>
                    <div class="space-y-2">
                        <a :href="news.href"
                           class="h-[60px] font-medium line-clamp-2 text-ellipsis text-lg text-[#263238]"
                           target="_blank">
                            {{ news.title }}
                        </a>
                        <div class="text-[12px] line-clamp-4 text-ellipsis text-justify">{{ news.description }}</div>
                    </div>
                </a-card>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.carousel-container .slick-slide) {
  height: 250px;
  width: 100%;
  border-radius: 10px;
}

:deep(.carousel-container .slick-slide div) {
  height: 100%;
  border-radius: 10px;
}

:deep(.carousel-container .slick-slide .overview-block) {
  display: flex !important;
}

:deep(.ant-carousel .slick-dots li button) {
  background: #94a3b8;
}

:deep(.carousel-container .slick-arrow.custom-slick-arrow) {
  width: 15px;
  height: 15px;
  font-size: 15px;
  color: #e5e7eb;
  transition: ease all 0.3s;
  opacity: 0.7;
  z-index: 1;
}

:deep(.carousel-container .slick-arrow.custom-slick-arrow:before) {
  display: none;
}

:deep(.carousel-container .slick-arrow.custom-slick-arrow:hover) {
  color: #e5e7eb;
  opacity: 0.5;
}

.slide-name {
  height: fit-content !important;
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
  left: -40%;
  transform: rotate(90deg) translate(270px) rotate(-90deg);
}

.deg-180 {
  transform: rotate(180deg) translate(330px) rotate(-180deg);
}

.deg-270 {
  left: -40%;
  transform: rotate(270deg) translate(270px) rotate(-270deg);
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
    transform: rotate(90deg) translate(175px) rotate(-90deg);
  }
  .deg-180 {
    transform: rotate(180deg) translate(230px) rotate(-180deg);
  }
  .deg-270 {
    left: -10%;
    transform: rotate(270deg) translate(180px) rotate(-270deg);
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
