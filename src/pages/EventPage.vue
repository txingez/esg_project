<script setup>

import Banner from "../components/Banner.vue";
import {onMounted, ref} from "vue";

const eventsToShow = ref([])
const newsToShow = ref([])

const events = [
    {
        id: 1,
        title: 'Bộ Kế hoạch và Đầu tư mở cổng đăng ký Sáng kiến ESG Việt Nam 2023',
        href: 'https://vneconomy.vn/bo-ke-hoach-va-dau-tu-mo-cong-dang-ky-sang-kien-esg-viet-nam-2023.htm',
        resource: 'VnEconomy',
        datePublic: '07/04/2023',
        eventImg: 'https://media.vneconomy.vn/w900/images/upload/2023/04/07/ong-nguyen-quy-hanh-chuyen-vien-tu-van-cao-cap-va-truong-nhom-xa-hoi-cong-ty-erm-viet-nam-trinh-bay-truc-tuyen-tai-hoi-thao.jpg'
    },
    {
        id: 2,
        title: 'Bộ Kế hoạch và Đầu tư mở cổng đăng ký Sáng kiến ESG Việt Nam 2023',
        href: 'https://diendandoanhnghiep.vn/sang-kien-esg-ho-tro-doanh-nghiep-viet-thich-ung-tieu-chuan-quoc-te-242009.html',
        resource: 'Diễn đàn doanh nghiệp',
        datePublic: '08/04/2023',
        eventImg: 'https://diendandoanhnghiep.vn/media/uploaded/514/2023/04/08/anh-1-ESG.JPG'
    },
    {
        id: 3,
        title: 'ESG: Cách các công ty theo dõi tác động đến môi trường, xã hội',
        href: 'https://tienphong.vn/esg-cach-cac-cong-ty-theo-doi-tac-dong-den-moi-truong-xa-hoi-post1524912.tpo',
        resource: 'Tiền Phong',
        datePublic: '10/04/2023',
        eventImg: 'https://photo-cms-tpo.epicdn.me/w645/Uploaded/2023/pcgycivo/2023_04_10/image001-5287.png'
    },
    {
        id: 4,
        title: 'Sáng kiến Việt Nam ESG 2023 trong khuôn khổ dự án tăng cường năng lực cạnh tranh khu vực tư nhân Việt Nam',
        href: 'https://haiphongdpi.gov.vn/2023/03/28/sang-kien-viet-nam-esg-2023-trong-khuon-kho-du-an-tang-cuong-nang-luc-canh-tranh-khu-vuc-tu-nhan-viet-nam/',
        resource: 'Sở KHĐT Hải Phòng',
        datePublic: '08/04/2023',
        eventImg: 'https://photo-cms-tpo.epicdn.me/w645/Uploaded/2023/pcgycivo/2023_04_10/image001-5287.png'
    },
    {
        id: 5,
        title: 'ESG - Chìa khóa để doanh nghiệp tạo lợi thế cạnh tranh',
        href: 'https://baocantho.com.vn/esg-chia-khoa-de-doanh-nghiep-tao-loi-the-canh-tranh-a158772.html',
        resource: 'Báo Cần Thơ',
        datePublic: '20/04/2023',
        eventImg: 'https://baocantho.com.vn/image/fckeditor/upload/2023/20230420/images/T9-a1.gif'
    },
    {
        id: 6,
        title: 'ESG Initiative 2023 program helps Vietnamese households move towards sustainable model',
        href: 'https://hanoitimes.vn/esg-initiative-2023-program-supports-vietnamese-households-towards-sustainable-model-323346.html',
        resource: 'Hanoi Times',
        datePublic: '08/04/2023',
        eventImg: 'https://media.hanoitimes.vn/2023/4/7/Vinamilk%20Green%20Farm.jpg'
    }
]

const newsData = [
    {
        id: 1,
        title: 'Bộ Kế hoạch và Đầu tư và Cơ quan Phát triển Quốc tế Hoa Kỳ công bố sáng kiến thúc đẩy thực hành ESG trong khu vực tư nhân',
        href: 'https://vtv.vn/truyen-hinh-truc-tuyen/vtv1/thoi-su-0.htm',
        resource: 'VTV1 – The national television scrolled a headline in the news coverage at 12:00 p.m.',
        datePublic: '22/11/2022',
        eventImg: 'https://img.meta.com.vn/Data/image/2021/11/15/lich-phat-song-vtv1-hom-nay-4.png'
    },
    {
        id: 2,
        title: 'Mỹ - Việt Nam công bố sáng kiến về ESG để thúc đẩy tăng trưởng bền vững',
        href: 'https://thanhnien.vn/my-viet-nam-cong-bo-sang-kien-ve-esg-de-thuc-day-tang-truong-ben-vung-1851524139.htm',
        resource: 'Thanh Niên',
        datePublic: '22/11/2022',
        eventImg: 'https://images2.thanhnien.vn/Uploaded/thimai/2022_11_22/viet-my-6635.png'
    },
    {
        id: 3,
        title: 'Sáng kiến mới để thúc đẩy khu vực kinh tế tư nhân tăng trưởng bền vững',
        href: 'https://vneconomy.vn/sang-kien-moi-de-thuc-day-khu-vuc-kinh-te-tu-nhan-tang-truong-ben-vung.htm',
        resource: 'VnEconomy',
        datePublic: '22/11/2022',
        eventImg: 'https://media.vneconomy.vn/w800/images/upload/2022/11/22/z3900918902434-2f9eec0f42caea4e4b69cd755ee907ad.jpg'
    },
    {
        id: 4,
        title: 'Thúc đẩy vai trò doanh nghiệp tư nhân tăng trưởng bền vững',
        href: 'https://doanhnghiepvn.vn/doanh-nghiep/thuc-day-vai-tro-doanh-nghiep-tu-nhan-tang-truong-ben-vung/20221122010844288',
        resource: 'Doanh Nghiệp Việt Nam',
        datePublic: '22/11/2022',
        eventImg: 'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2022/11/22/38dz3900923478782_43578d06cf77f5e466ce671949d28f4d.jpg'
    },
    {
        id: 5,
        title: 'Công bố sáng kiến thúc đẩy tăng trưởng bền vững khu vực tư nhân',
        href: 'https://baodautu.vn/cong-bo-sang-kien-thuc-day-tang-truong-ben-vung-khu-vuc-tu-nhan-d178386.html',
        resource: 'Báo Đầu tư',
        datePublic: '22/11/2022',
        eventImg: 'https://media.baodautu.vn/Images/hongnhung/2022/11/22/316534234_510694304435613_8584318209994482607_n.jpeg'
    },
    {
        id: 6,
        title: 'Thúc đẩy khu vực tư nhân hướng tới tăng trưởng bền vững',
        href: 'https://kinhtedothi.vn/thuc-day-khu-vuc-tu-nhan-huong-toi-tang-truong-ben-vung.html',
        resource: 'Kinh Tế Đô Thị',
        datePublic: '22/11/2022',
        eventImg: 'https://static.kinhtedothi.vn/w960/images/upload/2022/11/22/z3900710380681-ada4475ddc19761b69a9e33097d6541a.jpg'
    },
    {
        id: 7,
        title: 'Công bố sáng kiến thúc đẩy tăng trưởng bền vững trong khu vực tư nhân',
        href: 'https://baodauthau.vn/cong-bo-sang-kien-thuc-day-tang-truong-ben-vung-trong-khu-vuc-tu-nhan-post131407.html',
        resource: 'Báo Đấu Thầu',
        datePublic: '22/11/2022',
        eventImg: 'https://photo-cms-baodauthau.epicdn.me/w750/Uploaded/2023/qjmfn/2022_11_22/000-2857.jpg'
    },
    {
        id: 8,
        title: 'Hoa Kỳ, Việt Nam công bố sáng kiến thúc đẩy tăng trưởng bền vững được dẫn dắt bởi khu vực kinh tế tư nhân',
        href: 'https://doanhnghiephoinhap.vn/hoa-ky-viet-nam-cong-bo-sang-kien-thuc-day-tang-truong-ben-vung-duoc-dan-dat-boi-khu-vuc-kinh-te-tu-nhan.html',
        resource: 'Doanh Nghiệp Hội Nhập',
        datePublic: '22/11/2022',
        eventImg: 'https://media.doanhnghiephoinhap.vn/uploads/2022/11/22/z3901052820372-4a1c7cb3eccbb6bd4769c67a00766230-1669101994.jpg'
    },
    {
        id: 9,
        title: 'Thúc đẩy khu vực tư nhân hướng tới tăng trưởng bền vững',
        href: 'https://bnews.vn/thuc-day-khu-vuc-tu-nhan-huong-toi-tang-truong-ben-vung/269495.html',
        resource: 'Bnews',
        datePublic: '22/11/2022',
        eventImg: 'https://media.doanhnghiephoinhap.vn/uploads/2022/11/22/z3901052820372-4a1c7cb3eccbb6bd4769c67a00766230-1669101994.jpg'
    },
    {
        id: 10,
        title: 'Sáng kiến thúc đẩy khu vực kinh tế tư nhân hướng tới tăng trưởng bền vững',
        href: 'https://petrotimes.vn/sang-kien-thuc-day-khu-vuc-kinh-te-tu-nhan-huong-toi-tang-truong-ben-vung-672050.html',
        resource: 'Petro Times',
        datePublic: '22/11/2022',
        eventImg: 'https://cdn-petrotimes.mastercms.vn/stores/news_dataimages/2022/112022/22/12/thu-truong-khoa-hoc-va-dau-tu-tran-quoc-phuong20221122123157.jpg?rt=20221122123234'
    },
    {
        id: 11,
        title: 'Hoa Kỳ và Việt Nam công bố sáng kiến mới để thúc đẩy tăng trưởng bền vững',
        href: 'https://thoidai.com.vn/hoa-ky-va-viet-nam-cong-bo-sang-kien-moi-de-thuc-day-tang-truong-ben-vung-178833.html',
        resource: 'Vietnam Times',
        datePublic: '22/11/2022',
        eventImg: 'https://thoidai.com.vn/stores/news_dataimages/2022/112022/22/11/72e5bc342ebd91ac443ba61e304f810b.jpg?rt=20221122115107'
    },
    {
        id: 12,
        title: 'Công bố sáng kiến thúc đẩy tăng trưởng bền vững khu vực tư nhân',
        href: 'https://www.tinnhanhchungkhoan.vn/cong-bo-sang-kien-thuc-day-tang-truong-ben-vung-khu-vuc-tu-nhan-post310487.html',
        resource: 'Đầu Tư Chứng Khoán',
        datePublic: '22/11/2022',
        eventImg: 'https://photo-cms-tinnhanhchungkhoan.epicdn.me/w860/Uploaded/2023/gtnwae/2022_11_22/1-858.jpg'
    },
    {
        id: 13,
        title: 'Thúc đẩy khu vực tư nhân hướng tới tăng trưởng bền vững',
        href: 'https://cand.com.vn/Kinh-te/thuc-day-khu-vuc-tu-nhan-huong-toi-tang-truong-ben-vung-i675149/',
        resource: 'Công An Nhân Dân',
        datePublic: '22/11/2022',
        eventImg: 'https://img.cand.com.vn/resize/800x800/NewFiles/Images/2022/11/22/316599714_1170576117222939_5383-1669102820337.jpeg'
    },
    {
        id: 14,
        title: 'Thúc đẩy vai trò dẫn dắt của kinh tế tư nhấn đối với tăng trưởng',
        href: 'https://baochinhphu.vn/thuc-day-vai-tro-dan-dat-cua-kinh-te-tu-nhan-doi-voi-tang-truong-102221122152234864.htm',
        resource: 'Báo Điện tử Chính phủ',
        datePublic: '22/11/2022',
        eventImg: 'https://bcp.cdnchinhphu.vn/thumb_w/640/334894974524682240/2022/11/22/pa-16691050739711886680543.jpg'
    }
]

onMounted(() => {
    eventsToShow.value = events.slice(0, 8)
    newsToShow.value = newsData.slice(0, 8)
})

const showMore = isEvent => {
    if (isEvent) {
        eventsToShow.value = events.slice(0, eventsToShow.value.length + 8)
    } else {
        newsToShow.value = newsData.slice(0, newsToShow.value.length + 8)
    }
}

</script>

<template>
    <Banner label="tin tức và sự kiện"
            img-src="https://lh3.googleusercontent.com/pw/AIL4fc9mMay8KiUbjJOYkuB-zwa8WPcnYJ6gv3X-Tev2ea3-tvvGq3AnSa7heOck6Sk-8YgZgzl2d8enbP6yxA7elyDlS3vut4fHXR5VpHPt1Dbuo9Ss7d_wLd3DTY8XhJj5hSMZ6gw2-QQnLAOtMaIGgGI=w2934-h1956-s-no?authuser=0"/>

    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
        <div class="flex flex-col gap-10">
            <div class="font-bold md:text-4xl xl:text-5xl text-3xl">
                Tin tức
            </div>
            <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
                <a-card v-for="news in newsToShow">
                    <template #cover>
                        <a :href="news.href" target="_blank"><img class="h-[200px] w-full" :src="news.eventImg" alt=""></a>
                    </template>
                    <div class="space-y-2">
                        <a :href="news.href" target="_blank" class="font-bold line-clamp-2 text-ellipsis text-base">
                            {{ news.title }}
                        </a>
                        <div>
                            <div>Nguồn: <span>{{ news.resource }}</span></div>
                            <div>Đăng ngày: <span>{{ news.datePublic }}</span></div>
                        </div>
                    </div>
                </a-card>
            </div>
            <div class="text-center" v-if="newsToShow.length < newsData.length">
                <a-button @click.prevent="showMore(false)" class="min-h-[50px] min-w-[150px]">Xem thêm</a-button>
            </div>
        </div>
    </div>

    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
        <div class="flex flex-col gap-10">
            <div class="font-bold md:text-4xl xl:text-5xl text-3xl">
                Sự kiện
            </div>
            <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
                <a-card v-for="event in eventsToShow">
                    <template #cover>
                        <a :href="event.href" target="_blank"><img class="h-[200px] w-full" :src="event.eventImg"
                                                                   alt=""></a>
                    </template>
                    <div class="space-y-2">
                        <a :href="event.href" target="_blank" class="font-bold line-clamp-2 text-ellipsis text-base">
                            {{ event.title }}
                        </a>
                        <div>
                            <div>Nguồn: <span>{{ event.resource }}</span></div>
                            <div>Đăng ngày: <span>{{ event.datePublic }}</span></div>
                        </div>
                    </div>
                </a-card>
            </div>
            <div class="text-center" v-if="eventsToShow.length < events.length">
                <a-button @click.prevent="showMore(true)" class="min-h-[50px] min-w-[150px]">Xem thêm</a-button>
            </div>
        </div>
    </div>

</template>

<style scoped>
:deep(.ant-card-body) {
    padding: 20px;
}
</style>
