<script setup>

import Banner from "../components/Banner.vue";
import {computed, onMounted} from "vue";
import {handleAccessForm} from "../utils/handleClickEvaluate.js";
import BreadCrumb from "../components/BreadCrumb.vue";
import AOS from 'aos'

const isAuth = computed(() => {
    const token = sessionStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
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
    <Banner label="ĐÁNH GIÁ KINH DOANH BỀN VỮNG"
            img-src="https://lh3.googleusercontent.com/pw/AIL4fc9ZceHAFiHOWTxrrxinjHqpovV6-fzGgEYNqFKy4ErwJfaUdekISojkjwx7QHwk-v5ylDXToGH7l5FXEuymJBxNgB1_XnE9JEW7-zYjE-XZcMVHPGScDdScSx6g2gbfTQpAEW24He_NGStitA4QCmun=w1600-h900-s-no?authuser=0"/>

    <div class="md:px-10 lg:px-[100px] px-5 mt-2.5">
        <BreadCrumb :routes="routes"/>
    </div>

    <div class="md:px-10 lg:px-[100px] px-5 py-10 flex md:gap-10 gap-5 flex-col">
        <div>
            <div class="font-bold text-2xl">Bộ công cụ đánh giá kinh doanh bền vững là gì?</div>
            <p class="text-justify">
                Bộ công cụ đánh giá mô hình kinh doanh bền vững được phát triển bởi Cục Phát triển doanh nghiệp, Bộ Kế
                hoạch
                và đầu tư, là các bộ công cụ tự đánh giá, cho phép doanh nghiệp đo lường hiệu quả việc cân bằng lợi ích
                của
                các chỉ tiêu về kinh tế, xã hội, môi trường và quản trị của tổ chức, doanh nghiệp.
            </p>
            <p class="text-justify">
                Các bộ công cụ này được phát triển dựa trên các tiêu chuẩn toàn cầu và trong nước như Sáng kiến Báo cáo
                Toàn
                cầu (GRI), Chỉ số MSCI, Tiêu chuẩn của Tập đoàn Tài chính Quốc tế (IFC), Chỉ số Phát triển bền vững Việt
                Nam
                (VNSI), Bộ chỉ số doanh nghiệp bền vững (CSI), Circulytics, Circularity Check, và đồng thời được điều
                chỉnh
                cho phù hợp với bối cảnh cụ thể của các doanh nghiệp ở Việt Nam.
            </p>
            <p class="text-justify">
                Bộ công cụ đánh giá mô hình kinh doanh bền vững sẽ bao gồm các nhóm tiêu chí cụ thể hóa theo từng mô
                hình
                kinh doanh bền vững ESG, mô hinh kinh doanh áp dụng kinh tế tuần hoàn và mô hình kinh doanh bao trùm.
            </p>
            <p class="text-justify">
                Sau khi hoàn thành đánh giá, doanh nghiệp sẽ nhận được kết quả về mức độ áp dụng các nguyên tắc, mô hình
                kinh doanh bền vững trong doanh nghiệp; điểm thành phần của từng nhóm tiêu chí tùy theo từng mô hình.
                Mức độ
                áp dụng mô hình kinh doanh bền vững của doanh nghiệp được phân loại theo ba nhóm: Loại C (tổng điểm
                &lt;50/100
                điểm); Loại B (tổng điểm từ 50 đến 80/100 điểm), và Loại A (tổng điểm trên 80/100 điểm). Ngoài ra, các
                doanh
                nghiệp sẽ nhận được các đề xuất về biện pháp nhằm kiểm soát hoặc cải thiện những tiêu chí có điểm chưa
                tốt.
            </p>
            <div class="font-bold text-2xl">Tại sao phải thực hiện đánh giá kinh doanh bền vững?</div>
            <p class="text-justify">
                Thông qua việc thực hành đánh giá kinh doanh bền vững, các doanh nghiệp sẽ được cung cấp một khung tham
                chiếu để hiểu rõ hơn về mức độ áp dụng các nguyên tắc, mô hình kinh doanh bền vững trong doanh nghiệp
                của
                mình, nắm được các điểm mạnh, điểm yếu và các điểm cần cải thiện để cân bằng được các lợi ích về kinh
                tế, xã
                hội và môi trường. Ngoài ra, đánh giá và thực hiện tốt việc phát triển chiến lược kinh doanh gắn liền
                với
                các nguyên tắc kinh doanh bền vững sẽ trở thành một lợi thế cạnh tranh, giá trị gia tăng cho doanh
                nghiệp,
                mở rộng cơ hội tiếp cận các nguồn tài chính xanh.
            </p>
            <div class="font-bold text-2xl">Cách sử dụng kết quả đánh giá kinh doanh bền vững?</div>
            <p class="text-justify">
                Doanh nghiệp có thể sử dụng kết quả đánh giá kinh doanh bền vững của mình để xác định rủi ro và cơ hội
                liên
                quan đến môi trường và xã hội. Từ đó, doanh nghiệp sẽ phát triển các chiến lược kinh doanh áp dụng các
                nguyên tắc kinh doanh bền vững một cách hiệu quả hơn. Ngoài ra, doanh nghiệp còn có thể chia sẻ kết quả
                đánh
                giá này với các bên liên quan như một cách để khẳng định mức độ áp dụng tốt các nguyên tắc kinh doanh
                bền
                vững trong doanh nghiệp mình.
            </p>
        </div>

        <div class="grid grid-cols-4 gap-10">
            <div class="lg:col-span-2 col-span-4"
                 data-aos="fade-down"
                 data-aos-easing="ease-in-out"
                 data-aos-duration="500">
                <img class="rounded-[10px] w-full"
                     src="https://lh3.googleusercontent.com/pw/AIL4fc_LohterWxqt79IJu9IfyYTm9IXthqHuzPu_2aWJjvyjcgmaX4AkD1R7ro7dfjNY1poanZgcJC_DGIkyLK-R2TDHCywlohkf8JW9vmIEU5g9BEuKiM3ztzV3aCDCT2qfcl4UmDG6ZHioKb9baGt325u=w612-h344-s-no?authuser=0"
                     alt="business7">
            </div>
            <div class="flex flex-col gap-3 lg:col-span-2 col-span-4"
                 data-aos="fade-up"
                 data-aos-easing="ease-in-out"
                 data-aos-duration="500">
                <div class="md:text-xl xl:text-2xl text-xl font-bold">
                    Công cụ đánh giá mức độ thực hành Môi trường, Xã hội và Quản trị (ESG) của doanh nghiệp
                </div>
                <div class="text-justify">
                    Công cụ tự đánh giá mức độ thực hành ESG của doanh nghiệp có 30 câu hỏi tập trung vào đánh giá ba
                    trụ cột chính là môi trường, xã hội và quản trị trong doanh nghiệp với tổng điểm tối đa là 100.
                    Doanh nghiệp được phân loại theo ngành. Tổng điểm ESG được tính dựa trên tỷ trọng môi trường (E), xã
                    hội (S) và quản trị (G). Mỗi nhóm ngành có tỷ trọng môi trường (E), xã hội (S) và quản trị (G) khác
                    nhau, nhưng tổng tỷ trọng luôn là 100%.
                </div>
                <div>
                    <a-button class="min-h-[50px] md:text-base xl:text-lg"
                              @click.prevent="handleAccessForm(isAuth, 'ESG')">
                        Thực hiện đánh giá
                    </a-button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-10">
            <div class="lg:col-span-2 col-span-4 lg:order-last"
                 data-aos="fade-left"
                 data-aos-easing="ease-in-out"
                 data-aos-duration="500">
                <img class="rounded-[10px] w-full"
                     src="https://lh3.googleusercontent.com/pw/AIL4fc8NKdE1jEh_MnYPO_VBPdKBzfI0rbNT9ndmpdoyDZwhreCz1h4NBlkYmR2SU7dhs9AKDkLZd97Tkx-XnX28NeInnjvRIaV98pTCCkAxo5TX2CgBdsVvjj-_1gdKyp0gUNxdWtfzhAOMaOuYxdX4-ich=w900-h506-s-no?authuser=0"
                     alt="manufacture_evaluate">
            </div>
            <div class="flex flex-col gap-3 lg:col-span-2 col-span-4"
                 data-aos="fade-right"
                 data-aos-easing="ease-in-out"
                 data-aos-duration="500">
                <div class="md:text-xl xl:text-2xl text-xl font-bold">
                    Công cụ đánh giá mức độ áp dụng nguyên tắc kinh tế tuần hoàn (KTTH) của doanh nghiệp
                </div>
                <div class="text-justify">
                    Công cụ tự đánh giá mức độ áp dụng nguyên tắc KTTH của doanh nghiệp có 38 câu hỏi tập trung vào ba
                    nhóm tiêu chí về: (1) tầm nhìn và chiến lược áp dụng KTTH của doanh nghiệp, (2) áp dụng nguyên tắc
                    KTTH trong sản xuất và tiền sản xuất, và (3) áp dụng nguyên tắc KTTH trong công đoạn sau bán hàng.
                    Tổng điểm đánh giá tối đa là 100.
                </div>
                <div>
                    <a-button class="min-h-[50px] md:text-base xl:text-lg"
                              @click.prevent="handleAccessForm(isAuth, 'NEC')">
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
