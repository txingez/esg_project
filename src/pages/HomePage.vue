<script setup>
import DividerWithName from "../components/DividerWithName.vue";
import Carousel from "../components/Carousel.vue";
import {handleAccessForm} from "../utils/handleClickEvaluate.js";
import {computed, onMounted, ref} from "vue";
import AOS from 'aos'

const isAuth = computed(() => {
    const token = localStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
    return !!token
})

const screenWidth = ref(0)

const routes = [
    {name: 'Home', to: '/'}
]

const newsArray = [
    {
        title: 'Diễn đàn Doanh nhân nữ năm 2023',
        href: 'https://hanoionline.vn/dien-dan-doanh-nhan-nu-nam-2023-193989.htm',
        description: 'Diễn đàn Doanh nhân nữ 2023 vừa được tổ chức, với sự phối hợp của Mạng lưới nữ lãnh đạo Tiên phong WeLead, Cục Phát triển doanh nghiệp - Bộ Kế hoạch Đầu tư và USAID. Với chủ đề “Kinh doanh bền vững - Chìa khóa tạo lợi thế cạnh tranh cho Doanh nghiệp do nữ làm chủ”, diễn đàn quy tụ những tham vấn quan trọng trong việc giúp doanh nghiệp thực hiện mục tiêu tăng trưởng xanh, chuyển đổi số, phát triển bền vững.',
        thumbnail: 'https://c1baf5zxnlobj.vcdn.cloud/attach/crawler/2023/09/23/32691441-69ef-4ce7-a391-d170649b6b3d-241.png'
    },
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
        thumbnail: 'https://lh3.googleusercontent.com/pw/AIL4fc9mKCf1GEIxkSuM9U1Wf2iQSGqEr2Pr4Kt-ka4J6fdqyXX3gUjPpCIYBd0aqunDTV1oVS3bfzfTiX_kSlF9mQtCrmOmh-TvdnCaxtAeRgPV_O_WAAdNZq7KP2yJNSxAFnVJslyDFzi585dOPpJCq2Fl=w1600-h900-s-no?authuser=0'
    },
    {
        title: 'Kinh doanh bền vững: Chìa khoá tạo lợi thế cạnh tranh cho các doanh nghiệp Việt',
        href: 'https://vov.vn/kinh-te/kinh-doanh-ben-vung-chia-khoa-tao-loi-the-canh-tranh-cho-cac-doanh-nghiep-viet-post1013624.vov',
        description: '(BĐT) - Ngày 7/9/2023, tại Hà Nội, Bộ Kế hoạch và Đầu tư phối hợp với Cơ quan Phát triển Quốc tế Hoa Kỳ (USAID) tổ chức Vòng chung kết Sáng kiến ESG Việt Nam 2023. Top 3 doanh nghiệp giành chiến thắng chung cuộc sẽ được nhận các hỗ trợ kỹ thuật và tư vấn chuyên sâu có trị giá lên tới 2 tỷ đồng để thí điểm, triển khai hoặc nhân rộng các sáng kiến kinh doanh bền vững.',
        thumbnail: 'https://img.freepik.com/free-photo/millennial-group-young-businesspeople-asia-businessman-businesswoman-celebrate-giving-five-after-dealing-feeling-happy-signing-contract-agreement-meeting-room-small-modern-office_7861-2498.jpg?w=2000&t=st=1693468290~exp=1693468890~hmac=001d9e6eb00d981ccab6bd7d53a0cc1e08dcc72817319ab60c1a9561a7530ff2'
    }
]

const missions = [
    {
        icon: 'https://lh3.googleusercontent.com/pw/AIL4fc92P1hsYz1B1HrZGloCO4Vl-uylzW_NojqXDFFHdCoPdITZZh2zy7_IU4iedZGBDwxdP4fl29usb1aFqNoH1yXJUEHAOMNUs0If04ZC6cvsytd95KhHvsldVctuREiljFeOJ-jIPCOPUOSkcnzvt9GN=w249-h256-s-no?authuser=0',
        content: 'Nâng cao nhận thức của cộng đồng doanh nghiệp khu vực tư nhân về kinh doanh bền vững.'
    },
    {
        icon: 'https://lh3.googleusercontent.com/pw/AIL4fc9SZVX44PkbLTDWFQdGFt58Hs9n5WW4yOVj8RFqKpzTDBawzoHEp4Sbz5B2avJvEh4krJismHBLfADwAejQwpR4-Wf2y-2CM50ERRbl-yNDXZiRMBK15HQqeLTkKs5WFe5kumpBK6ZyIs44_1ZpIGHi=w256-h256-s-no?authuser=0',
        content: 'Hỗ trợ khoảng 10.000 doanh nghiệp khu vực tư nhân thực hành kinh doanh bền vững.'
    },
    {
        icon: 'https://lh3.googleusercontent.com/pw/AIL4fc-vuqx4NdQb9LsnkMpNAT0HYYQi84EJ6ORCvfLBxWQ-mlwF7XMv8_8VHZVBXncRxHw35VJKz3Eq2rDK7RCvcSLw-jNqXDWtnanC5JgJNl2CNU_z2WosOL8QSClPsNncNkj45NkOR0XzDKtH8krRHQp7=w246-h256-s-no?authuser=0',
        content: 'Góp phần đạt mức tiết kiệm năng lượng 5,0-7,0% tổng tiêu thụ năng lượng toàn quốc.'
    },
    {
        icon: 'https://lh3.googleusercontent.com/pw/AIL4fc9-Uq_LYLtlIoDHqOgxz89mMzB5Uts2ero9SGVGDLMopMSs3u-1VTDPVWur03cPu5XsFi0nshTD24gSdZbUyG13NajHEYf4oGrMfUQzsKetM8Mb4tWjMPhxSOkkY47JbO7h0V0Ba5jsdCt75DtaXs5c=w500-h500-s-no?authuser=0',
        content: 'Tăng năng suất lao động bình quân khoảng 7%/năm.'
    }
]
const evaluateSlides = [
    {
        image: 'https://lh3.googleusercontent.com/pw/ADCreHfQrAVEie6WBY2asEXYqXsFNi-qgrEY37avz0ZBY22UpWUkgfGhN6Vj7HE-1uzYF_fvvY6i-XqvOidM5dPU5avHD7fc_s7ROqF1DZIvbxPa7sC03KuT_C29YKNc8lj0pO5-X5QCVlvIMiN5RPCDVF5K=w953-h699-s-no?authuser=0',
        formId: 'ESG',
        name: 'CÔNG CỤ ĐÁNH GIÁ THỰC HÀNH ESG'
    },
    {
        image: 'https://lh3.googleusercontent.com/pw/ADCreHfQrAVEie6WBY2asEXYqXsFNi-qgrEY37avz0ZBY22UpWUkgfGhN6Vj7HE-1uzYF_fvvY6i-XqvOidM5dPU5avHD7fc_s7ROqF1DZIvbxPa7sC03KuT_C29YKNc8lj0pO5-X5QCVlvIMiN5RPCDVF5K=w953-h699-s-no?authuser=0',
        formId: 'NEC',
        name: 'CÔNG CỤ ĐÁNH GIÁ ÁP DỤNG KINH TẾ TUẦN HOÀN'
    }
]

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
})
</script>

<template>
    <Carousel/>

    <div>
        <DividerWithName label="GIỚI THIỆU"/>
        <div class="md:px-10 lg:px-[100px] px-5 mb-10">
            <p class="text-justify">
                Phát triển bền vững đã trở thành xu thế chung trên toàn cầu và cũng là mục tiêu cốt lõi của Việt Nam
                trên con đường trở thành nước phát triển vào năm 2050. Đối với khu vực kinh tế tư nhân Việt Nam, kinh
                doanh bền vững đang là một xu hướng phổ biến và sẽ dần được xem là một yêu cầu bắt buộc để vừa đóng góp
                cho mục tiêu phát triển bền vững của quốc gia và đồng thời đáp ứng nhu cầu của nhà đầu tư và thị trường.
            </p>
            <p class="text-justify">
                Trong bối cảnh đó, Bộ Kế hoạch và Đầu tư đang hỗ trợ tích cực cho cộng đồng doanh nghiệp để bắt kịp các
                xu hướng kinh doanh bền vững, các mô hình kinh doanh mới để giúp các doanh nghiệp Việt Nam thu hút được
                nhiều nhà đầu tư có chất lượng, hướng tới các thị trường cao cấp và có giá trị tăng trưởng cao hơn và
                người tiêu dùng Việt Nam được sử dụng các sản phẩm xanh hơn. Chương trình hỗ trợ doanh nghiệp khu vực tư
                nhân kinh doanh bền vững giai đoạn 2022-2025 được phê duyệt theo Quyết định số 167/QĐ-TTg là một công cụ
                chính sách quan trọng để thúc đẩy các hoạt động hỗ trợ này. Chương trình được kỳ vọng sẽ tạo động lực
                phát triển bền vững trong doanh nghiệp tư nhân, đảm bảo kết hợp chặt chẽ, hợp lý và hài hòa giữa hiệu
                quả kinh tế với trách nhiệm xã hội, bảo vệ tài nguyên và môi trường; huy động nguồn lực của khu vực tư
                nhân và góp phần hoàn thành 17 mục tiêu phát triển bền vững của Việt Nam vào năm 2030.
            </p>
            <p class="text-justify">
                Trang tin điện tử về Hỗ trợ doanh nghiệp kinh doanh bền vững là kênh thông tin chính thức của Cục Phát
                triển doanh nghiệp, Bộ Kế hoạch và Đầu tư nhằm kết nối và chia sẻ thông tin, kiến thức về việc áp dụng
                kinh doanh bền vững tại Việt Nam; giúp nâng cao nhận thức của cộng đồng doanh nghiệp khu vực tư nhân về
                vai trò, ý nghĩa và tầm quan trọng của kinh doanh bền vững; và phát triển hệ sinh thái hỗ trợ doanh
                nghiệp kinh doanh bền vững.
            </p>
        </div>
    </div>

    <div class="bg-[#46c585]">
        <div class="flex min-h-[800px] xl:flex-row flex-col xl:gap-5 gap-5">
            <div class="flex gap-5 flex-col basis-1/2">
                <DividerWithName label="mục tiêu"/>
                <div class="md:pl-10 lg:pl-[100px] pl-5 md:pr-10 lg:pr-[100px] xl:pr-0 pr-5 space-y-14">
                    <div class="md:text-3xl xl:text-2xl text-2xl font-bold">
                        <div>CHƯƠNG TRÌNH</div>
                        <div>HỖ TRỢ DOANH NGHIỆP KHU VỰC TƯ NHÂN</div>
                        <div>KINH DOANH BỀN VỮNG GIAI ĐOẠN 2022-2025</div>
                        <div>(Quyết định 167/QĐ-TTg 2022)</div>
                    </div>
                    <div class="flex gap-5 flex-wrap">
                        <div v-for="mission in missions"
                             class="md:basis-[48%] flex gap-2 flex-col"
                             data-aos="flip-left"
                             data-aos-easing="ease-in-out"
                             data-aos-duration="500">
                            <div>
                                <img :src="mission.icon"
                                     class="md:w-[100px] w-[70px] md:h-[100px] h-[70px] relative left-[-7px]"
                                     alt="icon">
                            </div>
                            <div class="md:text-xl text-base text-stone-800">{{ mission.content }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="basis-1/2">
                <img src="https://lh3.googleusercontent.com/pw/ADCreHeAytfKwV1GqlwwXUqlGqIWNEM0Ar7lCr-XL1tFLQrryT7opshpRreplWF3zRO9C-wLqUi-1uc9v8SMnrS4jC4W-IITpC5nG8UWgYdGkAxQa1Zzk7BTotWJxj2aqbXI2BwTnDdkc4SGyhGDtkw3DXg2=w1690-h1690-s-no?authuser=0"
                     class="h-full w-full"
                     alt="mission_block_image">
            </div>
        </div>
    </div>

    <div>
        <DividerWithName label="BỘ CÔNG CỤ ĐÁNH GIÁ KINH DOANH BỀN VỮNG"/>
        <div class="md:px-10 lg:px-[100px] px-5 space-y-10 mb-10">
            <div class="grid md:grid-cols-2 grid-cols-1 xl:gap-20 gap-5">
                <div class="text-justify"
                     data-aos="fade-down"
                     data-aos-easing="ease-in-out"
                     data-aos-duration="500">
                    Bộ công cụ đánh giá kinh doanh bền vững cho phép doanh nghiệp tự đánh giá để đo lường hiệu quả mô
                    hình kinh doanh theo các tiêu chí bền vững, hướng tới mục tiêu cân bằng lợi ích kinh tế với bảo vệ
                    môi trường, phát triển con người và xã hội một cách tổng hòa và bao trùm.
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
            <div class="flex lg:gap-10 xl:gap-5 gap-5 md:flex-row flex-col flex-wrap justify-between">
                <a-card v-for="news in newsArray"
                        class="md:basis-[48%] lg:basis-[45%] xl:basis-[23%] basis-full"
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
