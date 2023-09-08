<script setup>

import Banner from "../components/Banner.vue";
import {computed} from "vue";
import {handleAccessForm} from "../utils/handleClickEvaluate.js";

const isAuth = computed(() => {
    const token = sessionStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
    return !!token
})
</script>

<template>
    <Banner label="đánh giá kinh doanh"
            img-src="https://lh3.googleusercontent.com/pw/AIL4fc-RSoSKp0th5coF0QDkiJ5CETvqdl86Edy5wb9dbNWjNxZywzep8YG8x_fgde8ASbaOF_lrccZI6MKWqg13QYPbsK42oTdypA9cMY6255hewGnmB7hzpcg2Awd9G7gcEZfaCwIR5JlRxQLltSoQ_wM=w2934-h1956-s-no?authuser=0"/>

    <div class="md:px-10 lg:px-[150px] xl:px-[200px] px-5 py-10 flex md:gap-10 gap-5 flex-col">
        <div class="grid grid-cols-4 gap-5">
            <div class="md:col-span-2 col-span-4">
                <img class="rounded-[10px] md:h-[190px] xl:h-[290px] h-[200px] w-full" src="../assets/business7.jpg"
                     alt="business7">
            </div>
            <div class="flex flex-col gap-3 md:col-span-2 col-span-4 justify-center">
                <div class="md:text-2xl xl:text-4xl text-xl font-bold">
                    Bộ công cụ đánh giá tổng quan về thực hành ESG
                </div>
                <!--                <div class="text-justify">-->
                <!--                    ESG là cụm từ viết tắt bởi E-Environmental (Môi trường); S-Social (Xã hội) và G-Governance (Quản trị-->
                <!--                    doanh nghiệp), là một bộ tiêu chuẩn để đo lường các yếu tố liên quan đến phát triển bền vững và ảnh-->
                <!--                    hưởng của doanh nghiệp đến cộng đồng. Doanh nghiệp có điểm số ESG càng cao tức là năng lực thực hành-->
                <!--                    ESG càng tốt.-->
                <!--                </div>-->
                <div>
                    <a-button class="min-h-[50px] md:text-base xl:text-lg" @click.prevent="handleAccessForm(isAuth, 'ESG')">
                        Thực hiện đánh giá
                    </a-button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-5">
            <div class="md:col-span-2 col-span-4 md:order-last">
                <img class="rounded-[10px] md:h-[190px] xl:h-[290px] h-[200px] w-full"
                     src="../assets/pages/evaluate/manufacture.jpg" alt="manufacture_evaluate">
            </div>
            <div class="flex flex-col gap-3 md:col-span-2 col-span-4 justify-center">
                <div class="md:text-2xl xl:text-4xl text-xl font-bold">
                    Bộ công cụ đánh giá về thực hành kinh tế tuần hoàn
                </div>
                <!--                <div class="text-justify">-->
                <!--                    Kinh tế tuần hoàn là một hệ thống có tính khôi phục và tái tạo thông qua các kế hoạch và thiết kế-->
                <!--                    chủ động. Nó thay thế khái niệm kết thúc vòng đời của vật liệu bằng khái niệm khôi phục, chuyển dịch-->
                <!--                    theo hướng sử dụng năng lượng tái tạo, không dùng các hóa chất độc hại gây tổn hại tới việc tái sử-->
                <!--                    dụng và hướng tới giảm thiểu chất thải thông qua việc thiết kế vật liệu, sản phẩm, hệ thống kỹ thuật-->
                <!--                    và cả các mô hình kinh doanh trong phạm vi của hệ thống đó-->
                <!--                </div>-->
                <div>
                    <a-button class="min-h-[50px] md:text-base xl:text-lg" @click.prevent="handleAccessForm(isAuth, 'NEC')">
                        Thực hiện đánh giá
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
