<script setup>
import DividerWithName from "../components/DividerWithName.vue";
import Carousel from "../components/Carousel.vue";
import {handleAccessForm} from "../utils/handleClickEvaluate.js";
import {computed, onMounted} from "vue";
import AOS from 'aos'

const isAuth = computed(() => {
    const token = sessionStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
    return !!token
})

const routes = [
    {name: 'Home', to: '/'}
]

const newsArray = [
    {
        title: 'Hỗ trợ doanh nghiệp khu vực tư nhân kinh doanh bền vững',
        href: 'https://cafef.vn/ho-tro-doanh-nghiep-khu-vuc-tu-nhan-kinh-doanh-ben-vung-188230508153443887.chn',
        description: 'ESG (Môi trường, Xã hội và Quản trị) hướng đến kinh doanh bền vững là điều còn khá mới mẻ với nhiều doanh nghiệp. Bà Trịnh Thị Hương, Phó Cục trưởng Cục Phát triển doanh nghiệp, Bộ Kế hoạch & Đầu tư đã có những chia sẻ về nội dung này.',
        thumbnail: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/5/8/photo1683281633115-1683281633210361616685-1683534888047591735700.png'
    },
    {
        title: 'Bộ Kế hoạch và Đầu tư và USAID tổ chức Vòng chung kết Sáng kiến ESG Việt Nam 2023',
        href: 'https://baodauthau.vn/bo-ke-hoach-va-dau-tu-va-usaid-to-chuc-vong-chung-ket-sang-kien-esg-viet-nam-2023-post143384.html',
        description: 'Bộ Kế hoạch và Đầu tư dự kiến sẽ đưa ra bộ công cụ đánh giá thực hành ESG tại doanh nghiệp trong quý 3/2022 và sẽ cung cấp các gói hỗ trợ kỹ thuật chuyên sâu cho các doanh nghiệp có mức độ sẵn sàng thực hành ESG cao.',
        thumbnail: 'https://img.freepik.com/premium-vector/background-01cicle_851394-23.jpg?w=2000'
    },
    {
        title: 'Kinh doanh bền vững: Chìa khoá tạo lợi thế cạnh tranh cho các doanh nghiệp Việt',
        href: 'https://vov.vn/kinh-te/kinh-doanh-ben-vung-chia-khoa-tao-loi-the-canh-tranh-cho-cac-doanh-nghiep-viet-post1013624.vov',
        description: '(BĐT) - Ngày 7/9/2023, tại Hà Nội, Bộ Kế hoạch và Đầu tư phối hợp với Cơ quan Phát triển Quốc tế Hoa Kỳ (USAID) tổ chức Vòng chung kết Sáng kiến ESG Việt Nam 2023. Top 3 doanh nghiệp giành chiến thắng chung cuộc sẽ được nhận các hỗ trợ kỹ thuật và tư vấn chuyên sâu có trị giá lên tới 2 tỷ đồng để thí điểm, triển khai hoặc nhân rộng các sáng kiến kinh doanh bền vững.',
        thumbnail: 'https://img.freepik.com/free-photo/millennial-group-young-businesspeople-asia-businessman-businesswoman-celebrate-giving-five-after-dealing-feeling-happy-signing-contract-agreement-meeting-room-small-modern-office_7861-2498.jpg?w=2000&t=st=1693468290~exp=1693468890~hmac=001d9e6eb00d981ccab6bd7d53a0cc1e08dcc72817319ab60c1a9561a7530ff2'
    }
]

const evaluateSlides = [
    {
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc836mXERsuKuX1xyqweyQY0iqHji-W0TU2uEJn65qcAXuBH_W1rGTLMoLvPEs0YximvA7uitb6Tjlb8LhaEfH6mQx5mU2G1hha7rjIWKyqA21Or0jSW5km_PsWM6R9HlnwZW2-lHhK8ak9nzH_dDJrw=w1600-h900-s-no?authuser=0',
        formId: 'ESG',
        name: 'CÔNG CỤ ĐÁNH GIÁ THỰC HÀNH ESG'
    },
    {
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc_8t_bhSyN3BuzqMBpLjh8t1Ne5MqEJ70GgiQiOV5OtKYfkEbXLloWN1WC32ScIGijh3_B9mWE7MzTte6zM_EukhuNFQZXbr3nIPot6uq3c52oLzuzULBEIoUuPqj49llz6C9JjBWplsIZrClvxm7jX=w1600-h900-s-no?authuser=0',
        formId: 'NEC',
        name: 'CÔNG CỤ ĐÁNH GIÁ ÁP DỤNG KINH TẾ TUẦN HOÀN'
    }
]

onMounted(() => {
    AOS.init()
})
</script>

<template>
    <Carousel/>

    <div>
        <DividerWithName label="GIỚI THIỆU"/>
        <div class="md:px-10 lg:px-[100px] px-5 mb-10">
            <p class="text-justify">
                Phát triển bền vững đã trở thành xu thế chung trên toàn cầu. Đối với Việt Nam, phát triển nhanh và bền
                vững là mục tiêu cốt lõi trên con đường trở thành nước phát triển vào năm 2050. Và đối với khu vực kinh
                tế tư nhân, kinh doanh bền vững cũng đã trở thành một xu hướng để vừa đóng góp cho mục tiêu phát triển
                bền vững của quốc gia và đồng thời đáp ứng nhu cầu của nhà đầu tư và thị trường.
            </p>
            <p class="text-justify">
                Với vai trò là cơ quan đồng hành cùng doanh nghiệp, Cục Phát triển doanh nghiệp luôn chủ động nắm bắt
                các xu hướng kinh doanh mới, phương thức hỗ trợ doanh nghiệp phù hợp với bối cảnh và tình hình mới. Đầu
                năm 2022, Cục đã tham mưu lãnh đạo Bộ Kế hoạch và Đầu tư trình Thủ tướng Chính phủ ban hành Quyết định
                số 167/QĐ-TTg phê duyệt Chương trình hỗ trợ doanh nghiệp khu vực tư nhân kinh doanh bền vững giai đoạn
                2022-2025 (sau đây gọi là Chương trình 167). Chương trình này được kỳ vọng sẽ thúc đẩy phát triển bền
                vững trong doanh nghiệp khu vực tư nhân, đảm bảo kết hợp chặt chẽ, hợp lý và hài hòa giữa hiệu quả kinh
                tế với trách nhiệm xã hội, bảo vệ tài nguyên và môi trường; huy động nguồn lực của khu vực tư nhân góp
                phần hoàn thành 17 mục tiêu phát triển bền vững của Việt Nam vào năm 2030.
            </p>
            <p class="text-justify">
                Trang web về kinh doanh bền vững và ESG là kênh thông tin chính thức được xây dựng bởi Cục Phát triển
                Doanh nghiệp, thông qua sự hỗ trợ kỹ thuật của Cơ quan Phát triển quốc tế Hoa Kỳ (USAID). Đây là một
                trong những nỗ lực góp phần vào thực hiện Chương trình 167 của Thủ tướng Chính phủ. Trang web đóng vai
                trò là nền tảng trực tuyến để kết nối và chia sẻ thông tin dữ liệu về việc áp dụng kinh doanh bền vững
                tại Việt Nam; giúp nâng cao nhận thức của cộng đồng doanh nghiệp khu vực tư nhân về vai trò, ý nghĩa và
                tầm quan trọng của kinh doanh bền vững; và phát triển hệ sinh thái hỗ trợ doanh nghiệp kinh doanh bền
                vững.
            </p>
        </div>
    </div>

    <div class="bg-[#46c585]">
        <DividerWithName label="mục tiêu"/>
        <div class="md:px-10 lg:px-[100px] px-5 space-y-5 mb-10">
            <div class="flex gap-5 xl:flex-row flex-col">
                <div class="md:text-2xl xl:text-3xl text-2xl font-bold md:basis-1/2">
                    CHƯƠNG TRÌNH HỖ TRỢ DOANH NGHIỆP KHU VỰC TƯ NHÂN KINH DOANH BỀN VỮNG GIAI ĐOẠN 2022-2025 (Quyết định
                    167/QĐ-TTg 2022)
                </div>
                <div class="md:basis-1/2 basis-full">
                    <div class="flex gap-5 flex-col">
                        <div class="flex gap-5 items-center"
                             data-aos="fade-left"
                             data-aos-easing="ease-in-out"
                             data-aos-duration="500">
                            <div class="basis-[5%] w-[25px] h-[30px] rounded-[5px] bg-emerald-700 text-base text-white font-medium flex justify-center items-center">
                                <font-awesome-icon icon="fa-regular fa-building"/>
                            </div>
                            <div class="text-lg basis-[95%]">
                                Nâng cao nhận thức của cộng đồng doanh nghiệp khu vực tư nhân về kinh doanh bền vững.
                            </div>
                        </div>

                        <div class="flex gap-5 items-center"
                             data-aos="fade-right"
                             data-aos-easing="ease-in-out"
                             data-aos-duration="500">
                            <div class="basis-[5%] w-[25px] h-[30px] rounded-[5px] bg-emerald-700 text-base text-white font-medium flex justify-center items-center">
                                <font-awesome-icon icon="fa-solid fa-tree"/>
                            </div>
                            <div class="text-lg basis-[95%]">
                                Hỗ trợ khoảng 10.000 doanh nghiệp khu vực tư nhân thực hành kinh doanh bền vững.
                            </div>
                        </div>

                        <div class="flex gap-5 items-center"
                             data-aos="fade-left"
                             data-aos-easing="ease-in-out"
                             data-aos-duration="500">
                            <div class="basis-[5%] w-[25px] h-[30px] rounded-[5px] bg-emerald-700 text-base text-white font-medium flex justify-center items-center">
                                <font-awesome-icon icon="fa-solid fa-water"/>
                            </div>
                            <div class="text-lg basis-[95%]">
                                Góp phần đạt mức tiết kiệm năng lượng 5,0-7,0% tổng tiêu thụ năng lượng toàn quốc.
                            </div>
                        </div>

                        <div class="flex gap-5 items-center"
                             data-aos="fade-right"
                             data-aos-easing="ease-in-out"
                             data-aos-duration="500">
                            <div class="basis-[5%] w-[25px] h-[30px] rounded-[5px] bg-emerald-700 text-base text-white font-medium flex justify-center items-center">
                                <font-awesome-icon icon="fa-solid fa-arrow-up"/>
                            </div>
                            <div class="text-lg basis-[95%]">Tăng năng suất lao động bình quân khoảng 7%/năm.</div>
                        </div>

                        <div class="flex gap-5 items-center"
                             data-aos="fade-left"
                             data-aos-easing="ease-in-out"
                             data-aos-duration="500">
                            <div class="basis-[5%] w-[25px] h-[30px] rounded-[5px] bg-emerald-700 text-base text-white font-medium flex justify-center items-center">
                                <font-awesome-icon icon="fa-solid fa-mountain-sun"/>
                            </div>
                            <div class="text-lg basis-[95%]">Và một số mục tiêu cụ thể khác.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div>
        <DividerWithName label="CÔNG CỤ ĐÁNH GIÁ KINH DOANH BỀN VỮNG"/>
        <div class="md:px-10 lg:px-[100px] px-5 space-y-10 mb-10">
            <div class="grid md:grid-cols-2 grid-cols-1 xl:gap-20 gap-5 items-center">
                <div class="text-justify"
                     data-aos="fade-down"
                     data-aos-easing="ease-in-out"
                     data-aos-duration="500">
                    Bộ công cụ đánh giá mô hình kinh doanh bền vững được phát triển bởi Cục Phát triển doanh nghiệp, Bộ
                    Kế hoạch và đầu tư, là các bộ công cụ tự đánh giá, cho phép doanh nghiệp đo lường hiệu quả việc cân
                    bằng lợi ích của các chỉ tiêu về kinh tế, xã hội, môi trường và quản trị của tổ chức, doanh nghiệp.
                    Bộ công cụ đánh giá mô hình kinh doanh bền vững sẽ bao gồm các nhóm tiêu chí cụ thể hóa theo từng mô
                    hình kinh doanh bền vững ESG (E - Môi trường, S - Xã hội và G - Quản trị), mô hình kinh doanh áp
                    dụng nguyên tắc kinh tế tuần hoàn và mô hình kinh doanh bao trùm.
                </div>
                <div class="rounded-[10px]"
                     data-aos="fade-up"
                     data-aos-easing="ease-in-out"
                     data-aos-duration="500">
                    <a-carousel class="carousel-container rounded-[10px]" id="overview" arrows>
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
                        <div v-for="slide in evaluateSlides"
                             class="relative overview-block h-full w-full text-black rounded-[10px]">
                            <div class="w-full rounded-[10px]">
                                <img :src="slide.image"
                                     class="object-cover h-full w-full rounded-[10px]"
                                     loading="lazy"
                                     :alt="slide.image">
                            </div>

                            <div class="rounded-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-[rgba(0,0,0,0.4)] flex flex-col gap-5 justify-center items-center">
                                <div class="text-white slide-name xl:text-2xl lg:text-xl text-lg text-center">
                                    {{ slide.name }}
                                </div>
                                <a-button class="text-white h-fit min-h-[50px] md:text-base xl:text-lg"
                                          @click.prevent="handleAccessForm(isAuth, slide.formId)">
                                    Đánh giá ngay
                                </a-button>
                            </div>
                        </div>
                    </a-carousel>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-[#46c585]">
        <DividerWithName label="tin tức và sự kiện"/>
        <div class="md:px-10 lg:px-[100px] px-5 space-y-5 mb-10">
            <div class="flex gap-5 md:flex-row flex-col">
                <a-card v-for="news in newsArray"
                        class="basis-1/3"
                        data-aos="fade-down"
                        data-aos-easing="ease-in-out"
                        data-aos-duration="500">
                    <template #cover>
                        <a class="overflow-hidden rounded-t-[10px] opacity-[0.85] hover:opacity-100 transition-all"
                           :href="news.href" target="_blank">
                            <img class="lg:h-[200px] md:h-[150px] h-[200px] w-full hover:scale-110 transition-all"
                                 :src="news.thumbnail"
                                 loading="lazy"
                                 :alt="news.thumbnail">
                        </a>
                    </template>
                    <div class="space-y-2">
                        <a :href="news.href" target="_blank"
                           class="font-bold line-clamp-2 text-ellipsis text-base">
                            {{ news.title }}
                        </a>
                        <div class="text-[14px] line-clamp-4 text-ellipsis text-justify">{{ news.description }}</div>
                    </div>
                </a-card>
            </div>
        </div>
    </div>

  <!--    <ContactForm/>-->
</template>

<style scoped lang="scss">
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
</style>
