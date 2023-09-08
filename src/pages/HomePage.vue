<script setup>
import DividerWithName from "../components/DividerWithName.vue";
import Carousel from "../components/Carousel.vue";
import RadarChart from "../components/RadarChart.vue";
import {handleAccessForm} from "../utils/handleClickEvaluate.js";
import {computed} from "vue";

const isAuth = computed(() => {
    const token = sessionStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
    return !!token
})

const newsArray = [
    {
        title: 'Hỗ trợ doanh nghiệp khu vực tư nhân kinh doanh bền vững',
        href: 'https://cafef.vn/ho-tro-doanh-nghiep-khu-vuc-tu-nhan-kinh-doanh-ben-vung-188230508153443887.chn',
        description: 'ESG (Môi trường, Xã hội và Quản trị) hướng đến kinh doanh bền vững là điều còn khá mới mẻ với nhiều doanh nghiệp. Bà Trịnh Thị Hương, Phó Cục trưởng Cục Phát triển doanh nghiệp, Bộ Kế hoạch & Đầu tư đã có những chia sẻ về nội dung này.',
        thumbnail: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/5/8/photo1683281633115-1683281633210361616685-1683534888047591735700.png'
    },
    {
        title: 'Sắp đưa ra bộ công cụ đánh giá ESG tại doanh nghiệp',
        href: 'https://vneconomy.vn/sap-dua-ra-bo-cong-cu-danh-gia-esg-tai-doanh-nghiep.htm',
        description: 'Bộ Kế hoạch và Đầu tư dự kiến sẽ đưa ra bộ công cụ đánh giá thực hành ESG tại doanh nghiệp trong quý 3/2022 và sẽ cung cấp các gói hỗ trợ kỹ thuật chuyên sâu cho các doanh nghiệp có mức độ sẵn sàng thực hành ESG cao.',
        thumbnail: 'https://img.freepik.com/premium-vector/background-01cicle_851394-23.jpg?w=2000'
    },
    {
        title: 'Kinh doanh bền vững: Chìa khoá tạo lợi thế cạnh tranh cho các doanh nghiệp Việt',
        href: 'https://vov.vn/kinh-te/kinh-doanh-ben-vung-chia-khoa-tao-loi-the-canh-tranh-cho-cac-doanh-nghiep-viet-post1013624.vov',
        description: 'VOV.VN - Doanh nghiệp Việt cần theo xu hướng kinh doanh bền vững để nâng cao khả năng cạnh tranh và trở thành một mắt xích quan trọng trong chuỗi cung ứng bền vững toàn cầu.',
        thumbnail: 'https://img.freepik.com/free-photo/millennial-group-young-businesspeople-asia-businessman-businesswoman-celebrate-giving-five-after-dealing-feeling-happy-signing-contract-agreement-meeting-room-small-modern-office_7861-2498.jpg?w=2000&t=st=1693468290~exp=1693468890~hmac=001d9e6eb00d981ccab6bd7d53a0cc1e08dcc72817319ab60c1a9561a7530ff2'
    }
]

const evaluatedForms = [
    {
        title: 'Bộ công cụ đánh giá tổng quan về thực hành ESG',
        formName: 'ESG'
    },
    {
        title: 'Bộ công cụ đánh giá về thực hành kinh tế tuần hoàn',
        formName: 'NEC'
    },
    // {
    //     title: 'Bộ công cụ đánh giá về thực hành kinh doanh bao trùm',
    //     image: '',
    //     to: ''
    // }
]
</script>

<template>
    <Carousel/>

    <div>
        <DividerWithName label="HIỂU THÊM VỀ CHÚNG TÔI"/>
        <div class="md:px-10 lg:px-[150px] xl:px-[200px] px-5 space-y-5 mb-10">
            <div class="md:text-4xl xl:text-5xl text-2xl font-bold">
                CHƯƠNG TRÌNH 167 VÀ TRANG WEB
            </div>
            <div class="text-justify">
                Chương trình 167 là một chương trình quan trọng trong chuỗi hỗ trợ doanh nghiệp khu vực tư nhân thúc đẩy
                kinh doanh bền vững từ năm 2022 đến 2025, dựa trên Quyết định số 167/QĐ-TTg ngày 08 tháng 02 năm 2022
                của Thủ tướng Chính phủ. Đây là chương trình tiên phong của Chính phủ, hướng tới đem lại phát triển bền
                vững trong lĩnh vực tư nhân. Chương trình này tạo sự hòa hợp giữa hiệu quả kinh tế và trách nhiệm xã
                hội, bảo vệ tài nguyên và môi trường. Đồng thời, chương trình cũng thúc đẩy sự đóng góp của doanh nghiệp
                khu vực tư nhân vào việc đạt được 17 mục tiêu phát triển bền vững của Việt Nam vào năm 2030.
            </div>
            <div class="text-justify">
                Trang web về kinh doanh bền vững và ESG là kênh thông tin chính thức do Cục Phát triển Doanh nghiệp xây
                dựng, được hỗ trợ kỹ thuật bởi Cơ quan Phát triển quốc tế Hoa Kỳ thông qua Dự án Tăng cường năng lực
                cạnh tranh khu vực tư nhân Việt Nam. Nhiệm vụ của trang web này là cung cấp một môi trường trực tuyến để
                kết nối thông tin và chia sẻ dữ liệu về việc áp dụng kinh doanh bền vững tại Việt Nam. Đây là một nỗ lực
                nhằm góp phần vào việc thực hiện Chiến lược Tăng trưởng xanh của Việt Nam giai đoạn 2021-2030 và Chương
                trình Hỗ trợ doanh nghiệp khu vực tư nhân kinh doanh bền vững giai đoạn 2022-2025.
            </div>
            <div>
                <img class="w-full" src="../assets/overview_homepage.jpeg" alt="overview_homepage">
            </div>
        </div>
    </div>

    <div class="bg-[#15B9A0]">
        <DividerWithName label="mục tiêu"/>
        <div class="md:px-10 lg:px-[150px] xl:px-[200px] px-5 space-y-5 mb-10">
            <div class="flex gap-5 flex-row md:flex-nowrap flex-wrap">
                <div class="md:text-3xl xl:text-4xl text-2xl font-bold md:basis-1/2">
                    HƯỚNG TỚI HOÀN THÀNH CAM KẾT CỦA VIỆT NAM TRONG VIỆC ỨNG PHÓ VỚI BIẾN ĐỔI KHÍ HẬU
                </div>
                <div class="md:basis-1/2 basis-full">
                    <div class="flex gap-5 flex-col">
                        <div class="flex gap-5 items-center">
                            <div class="w-[25px] h-[30px] rounded-[5px] bg-green-400 text-base text-white font-medium flex justify-center items-center">
                                <font-awesome-icon icon="fa-regular fa-building"/>
                            </div>
                            <div class="text-lg ">Hỗ trợ 10.000 doanh nghiệp thực hành kinh doanh bền vững</div>
                        </div>

                        <div class="flex gap-5 items-center">
                            <div class="w-[25px] h-[30px] rounded-[5px] bg-green-400 text-base text-white font-medium flex justify-center items-center">
                                <font-awesome-icon icon="fa-solid fa-tree"/>
                            </div>
                            <div class="text-lg">Góp phần tiết kiệm năng lượng 5,0-7,0% tổng tiêu thụ năng lượng quốc
                                gia
                            </div>
                        </div>

                        <div class="flex gap-5 items-center">
                            <div class="w-[25px] h-[30px] rounded-[5px] bg-green-400 text-base text-white font-medium flex justify-center items-center">
                                <font-awesome-icon icon="fa-solid fa-water"/>
                            </div>
                            <div class="text-lg">Tăng năng suất lao động bình quân khoảng 7%/năm</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div>
        <DividerWithName label="công cụ đánh giá"/>
        <div class="flex flex-col md:px-10 lg:px-[150px] xl:px-[200px] px-5 space-y-10 mb-10">
            <div class="flex flex-col gap-5">
                <div class="md:text-3xl xl:text-4xl text-2xl font-bold">
                    CÔNG CỤ ĐÁNH GIÁ KINH DOANH BỀN VỮNG.
                </div>
                <div class="text-justify">
                    Bộ công cụ đánh giá mô hình kinh doanh bền vững được phát triển bởi Cục Phát triển doanh nghiệp, Bộ
                    Kế hoạch và đầu tư nhằm hỗ trợ và khuyến khích các doanh nghiệp tại Việt Nam áp dụng kinh doanh bền
                    vững. Bộ công cụ này không chỉ là một bước đột phá trong việc hướng dẫn và định hình mô hình kinh
                    doanh bền vững, mà còn là tập hợp thông tin cụ thể và khả năng lượng hóa theo thang điểm, trọng số.
                    Với các tiêu chí cụ thể, bộ công cụ này sẽ giúp doanh nghiệp tự đánh giá mức độ phù hợp với nguyên
                    tắc kinh doanh bền vững, định rõ điểm mạnh và điểm yếu; giúp nâng cao nhận thức, tạo cơ hội cho việc
                    điều chỉnh và cải thiện mô hình kinh doanh có lợi cho xã hội và môi trường.
                </div>
            </div>
            <div class="flex md:flex-row flex-col gap-10">
                <div class="basis-1/2 flex justify-center items-center flex-col">
                    <div class="xl:w-[500px] xl:h-[500px] md:h-[300px] md:w-[300px]">
                        <RadarChart id="chartESG"
                                    :labels="['E-Môi trường', 'S-Xã hội', 'G-Quản trị']"
                                    :data="[43.75, 57.50, 79.31]"
                                    :circular="true"/>
                    </div>
                    <div class="italic font-normal text-center lg:text-base text-sm">Kết quả đánh giá thực hành ESG
                    </div>
                </div>
                <div class="basis-1/2 lex justify-center items-center flex-col">
                    <div class="xl:w-[500px] xl:h-[500px] md:h-[300px] md:w-[300px]">
                        <RadarChart id="chartNEC"
                                    :labels="['Nhóm tiêu chí 1', 'Nhóm tiêu chí 2', 'Nhóm tiêu chí 3']"
                                    :data="[20, 20, 15]"
                                    :suggested-max="30"
                                    :step-size="10"
                                    color="#f97316"
                                    :circular="true"/>
                    </div>

                    <div class="italic font-normal text-center lg:text-base text-sm">
                        Kết quả đánh giá thực hành kinh tế tuần hoàn
                    </div>
                </div>
            </div>
            <a-carousel class="carousel-container" id="overview" arrows>
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
                <div v-for="form in evaluatedForms"
                     class="overview-block flex-col items-start md:gap-5 gap-2 h-full text-black px-10">
                    <div class="evaluated-title md:text-2xl xl:text-3xl text-xl h-fit">
                        {{ form.title }}
                    </div>
                    <a-button class="h-fit min-h-[50px] md:text-base xl:text-lg"
                              @click.prevent="handleAccessForm(isAuth, form.formName)">
                        Đánh giá ngay
                    </a-button>
                </div>
            </a-carousel>
        </div>
    </div>

    <div class="bg-[#15B9A0]">
        <DividerWithName label="tin tức và sự kiện"/>
        <div class="md:px-10 lg:px-[150px] xl:px-[200px] px-5 space-y-5 mb-10">
            <div class="flex flex-wrap gap-5">
                <div v-for="news in newsArray" class="relative md:w-[48%] xl:w-[32%] w-full">
                    <div class="absolute xl:p-5 md:p-8 p-10 text-white space-y-2.5 z-50 bg-black h-full bg-opacity-60 rounded-[5px]">
                        <a :href="news.href" target="_blank" class="text-xl font-bold">{{ news.title }}</a>
                        <div class="text-[14px] text-justify">{{ news.description }}</div>
                    </div>
                    <div>
                        <img :src="news.thumbnail"
                             class="rounded-[5px] min-h-[300px]"
                             :alt="`News_Image_${news.id}`">
                    </div>
                </div>
            </div>
        </div>
    </div>

  <!--    <ContactForm/>-->
</template>

<style scoped>
:deep(.carousel-container .slick-slide) {
    height: 170px;
}

:deep(.carousel-container .slick-slide div) {
    height: 100%;
}

:deep(.carousel-container .slick-slide .overview-block) {
    display: flex !important;
}

:deep(.carousel-container .slick-slide .overview-block .evaluated-title) {
    height: fit-content;
}

:deep(.ant-carousel .slick-dots li button) {
    background: #94a3b8;
}

:deep(.carousel-container .slick-arrow.custom-slick-arrow) {
    width: 15px;
    height: 15px;
    font-size: 15px;
    color: #94a3b8;
    transition: ease all 0.3s;
    opacity: 0.7;
    z-index: 1;
}

:deep(.carousel-container .slick-arrow.custom-slick-arrow:before) {
    display: none;
}

:deep(.carousel-container .slick-arrow.custom-slick-arrow:hover) {
    color: #94a3b8;
    opacity: 0.5;
}
</style>
