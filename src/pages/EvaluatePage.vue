<script setup>

import Banner from "../components/Banner.vue";
import {computed, onMounted} from "vue";
import {handleAccessForm} from "../utils/handleClickEvaluate.js";
import BreadCrumb from "../components/BreadCrumb.vue";
import AOS from 'aos'
import {DownloadOutlined} from '@ant-design/icons-vue'

const isAuth = computed(() => {
    const token = localStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
    return !!token
})

const routes = [
    {name: 'Home', to: '/'},
    {name: 'Đánh giá kinh doanh bền vững', to: '/evaluate'},
]

onMounted(() => {
    AOS.init()
})
</script>

<template>
    <Banner img-src="https://lh3.googleusercontent.com/pw/AIL4fc9ZceHAFiHOWTxrrxinjHqpovV6-fzGgEYNqFKy4ErwJfaUdekISojkjwx7QHwk-v5ylDXToGH7l5FXEuymJBxNgB1_XnE9JEW7-zYjE-XZcMVHPGScDdScSx6g2gbfTQpAEW24He_NGStitA4QCmun=w1600-h900-s-no?authuser=0">
        <div>ĐÁNH GIÁ</div>
        <div>KINH DOANH BỀN VỮNG</div>
    </Banner>

    <div class="md:px-10 lg:px-[100px] px-5 mt-2.5">
        <BreadCrumb :routes="routes"/>
    </div>

    <div class="md:px-10 lg:px-[100px] px-5 py-10 flex md:gap-10 gap-5 flex-col">
        <div>
            <h1 class="font-bold text-2xl">Giới thiệu chung về Bộ công cụ đánh giá kinh doanh bền vững</h1>
            <p class="text-justify">
                Bộ công cụ đánh giá kinh doanh bền vững cho phép doanh nghiệp tự đánh giá để đo lường hiệu quả mô hình
                kinh doanh theo các tiêu chí bền vững, hướng tới mục tiêu cân bằng lợi ích kinh tế với bảo vệ môi
                trường, phát triển con người và xã hội một cách tổng hòa và bao trùm.
            </p>
            <p class="text-justify">
                Bộ công cụ bao gồm Công cụ đánh giá mức độ thực hành kinh doanh bền vững theo khung Môi trường – Xã hội
                – Quản trị (ESG) và Công cụ đánh giá mức độ thực hành kinh doanh bền vững theo nguyên tắc kinh tế tuần
                hoàn. Trong thời gian tới, Cục Phát triển doanh nghiệp sẽ tiếp tục xây dựng các công cụ khác, nhằm đáp
                ứng nhu cầu tự đánh giá cho các mục tiêu ưu tiên về bền vững khác nhau của doanh nghiệp. Các công cụ này
                được phát triển dựa trên các tiêu chuẩn được công nhận phổ biến, có điều chỉnh cho phù hợp với bối cảnh
                cụ thể của các doanh nghiệp Việt Nam, đặc biệt là các doanh nghiệp nhỏ và vừa.
            </p>
        </div>

        <div class="grid grid-cols-4 gap-10">
            <div class="lg:col-span-2 col-span-4 border rounded-[10px] max-h-[340px]"
                 data-aos="fade-down"
                 data-aos-easing="ease-in-out"
                 data-aos-duration="500">
                <img class="rounded-[10px] w-full h-full"
                     loading="lazy"
                     src="https://lh3.googleusercontent.com/pw/AIL4fc_LohterWxqt79IJu9IfyYTm9IXthqHuzPu_2aWJjvyjcgmaX4AkD1R7ro7dfjNY1poanZgcJC_DGIkyLK-R2TDHCywlohkf8JW9vmIEU5g9BEuKiM3ztzV3aCDCT2qfcl4UmDG6ZHioKb9baGt325u=w612-h344-s-no?authuser=0"
                     alt="business7">
            </div>
            <div class="flex flex-col gap-3 lg:col-span-2 col-span-4 justify-center"
                 data-aos="fade-up"
                 data-aos-easing="ease-in-out"
                 data-aos-duration="500">
                <div class="md:text-xl xl:text-2xl text-xl font-bold">
                    Công cụ đánh giá mức độ thực hành kinh doanh bền vững theo khung ESG
                </div>
                <!--                <div class="text-justify">-->
                <!--                    Công cụ tự đánh giá mức độ thực hành ESG của doanh nghiệp có 30 câu hỏi tập trung vào đánh giá ba-->
                <!--                    trụ cột chính là môi trường, xã hội và quản trị trong doanh nghiệp với tổng điểm tối đa là 100.-->
                <!--                    Doanh nghiệp được phân loại theo ngành. Tổng điểm ESG được tính dựa trên tỷ trọng môi trường (E), xã-->
                <!--                    hội (S) và quản trị (G). Mỗi nhóm ngành có tỷ trọng môi trường (E), xã hội (S) và quản trị (G) khác-->
                <!--                    nhau, nhưng tổng tỷ trọng luôn là 100%.-->
                <!--                </div>-->
                <div class="flex gap-2.5 xl:flex-row flex-col">
                    <a-button class="min-h-[50px] md:text-base xl:text-lg"
                              @click.prevent="handleAccessForm(isAuth, 'ESG')">
                        Thực hiện đánh giá
                    </a-button>
                    <a-button class="min-h-[50px] md:text-base xl:text-lg bg-blue-500"
                              type="primary">
                        <a class="flex items-center justify-center gap-2 w-full h-full"
                           href="/Sổ%20tay%20công%20cụ%20ESG.pdf" download>
                            <DownloadOutlined/>
                            <span>Tài liệu giới thiệu và hướng dẫn</span>
                        </a>
                    </a-button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-10">
            <div class="lg:col-span-2 col-span-4 lg:order-last border rounded-[10px] max-h-[340px]"
                 data-aos="fade-left"
                 data-aos-easing="ease-in-out"
                 data-aos-duration="500">
                <img class="rounded-[10px] w-full h-full"
                     loading="lazy"
                     src="https://lh3.googleusercontent.com/pw/ADCreHcMYu5RULAW84DmTFWa6PVdTGU_JTi6ajUMryYxYFNWm0cZ4t_nlEl7bw9fFUHnlOL06j7VQTq5f9qSHSWGI_lbBQoJ-ENRro-eErO9NxpyaB0mxRgs3gCxAoJcoMbAel5IzXUt0zUJ3bhdk6__0tkw=w2364-h1576-s-no?authuser=0"
                     alt="manufacture_evaluate">
            </div>
            <div class="flex flex-col gap-3 lg:col-span-2 col-span-4 justify-center"
                 data-aos="fade-right"
                 data-aos-easing="ease-in-out"
                 data-aos-duration="500">
                <div class="md:text-xl xl:text-2xl text-xl font-bold">
                    Công cụ đánh giá mức độ thực hành kinh doanh bền vững theo nguyên tắc KTTH
                </div>
                <!--                <div class="text-justify">-->
                <!--                    Công cụ tự đánh giá mức độ áp dụng nguyên tắc KTTH của doanh nghiệp có 38 câu hỏi tập trung vào ba-->
                <!--                    nhóm tiêu chí về: (1) tầm nhìn và chiến lược áp dụng KTTH của doanh nghiệp, (2) áp dụng nguyên tắc-->
                <!--                    KTTH trong sản xuất và tiền sản xuất, và (3) áp dụng nguyên tắc KTTH trong công đoạn sau bán hàng.-->
                <!--                    Tổng điểm đánh giá tối đa là 100.-->
                <!--                </div>-->
                <div class="flex gap-2.5 xl:flex-row flex-col">
                    <a-button class="min-h-[50px] md:text-base xl:text-lg"
                              @click.prevent="handleAccessForm(isAuth, 'NEC')">
                        Thực hiện đánh giá
                    </a-button>
                    <a-button class="min-h-[50px] md:text-base xl:text-lg bg-blue-500"
                              type="primary">
                        <a class="flex items-center justify-center gap-2"
                           href="/Sổ%20tay%20công%20cụ%20CE.pdf" download>
                            <DownloadOutlined/>
                            <span>Tài liệu giới thiệu và hướng dẫn</span>
                        </a>
                    </a-button>
                </div>
            </div>
        </div>

        <!--        <div class="grid grid-cols-4 gap-5">-->
        <!--            <div class="md:col-span-2 col-span-4">-->
        <!--                <img class="rounded-[10px]" src="../assets/pages/evaluate/information_technology.jpg"-->
        <!--                     alt="information_technology_evaluate">-->
        <!--            </div>-->
        <!--            <div class="flex flex-col gap-3 md:col-span-2 col-span-4 justify-center">-->
        <!--                <div class="md:text-2xl xl:text-4xl text-xl font-bold text">-->
        <!--                    Bộ công cụ đánh giá về thực hành kinh doanh bao trùm-->
        <!--                </div>-->
        <!--                <div class="text-justify">-->
        <!--                    Mô hình kinh doanh bao trùm không chỉ nâng cao năng lực cạnh tranh địa phương, tối ưu hoá nguồn lực-->
        <!--                    địa phương, phát triển chuỗi giá trị song hành với vùng nguyên liệu bền vững, sản phẩm cạnh tranh-->
        <!--                    bền vững mang thương hiệu địa phương mà còn phát triển bền vững kinh tế – xã hội, phát triển kinh tế-->
        <!--                    song song với tạo việc làm bền vững, xoá đói giảm nghèo, cải thiện đời sống người dân, bình đẳng-->
        <!--                    giới, bảo vệ môi trường… Phát triển bền vững, sáng tạo, bao trùm là yêu cầu xuyên suốt trong chiến-->
        <!--                    lược phát triển của đất nước.-->
        <!--                </div>-->
        <!--                <div>-->
        <!--                    <a-button class="min-h-[50px] md:text-base xl:text-lg" @click.prevent>-->
        <!--                        <router-link to="/evaluate/esg/form">Thực hiện đánh giá</router-link>-->
        <!--                    </a-button>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
    </div>

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
