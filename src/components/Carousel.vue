<script setup>

const banners = [
    {
        src: 'https://lh3.googleusercontent.com/pw/AIL4fc_oECM0I_B7HzrXlMmuG9WIcVN6K6P6zmw68wlvmU_MgyQ7XHqM5s30dcubvS-dhTi265b2F8Lqt_4FfNDgFCV7b_8YVkS6Cjyhw_f4aLGOynMka1FucOq1wXHi-8Y488BVGJuWJijulzhmyooSJ1to=w612-h344-s-no?authuser=0',
        label: 'HỖ TRỢ DOANH NGHIỆP KINH DOANH BỀN VỮNG'
    },
    {
        src: 'https://lh3.googleusercontent.com/pw/AIL4fc-RSoSKp0th5coF0QDkiJ5CETvqdl86Edy5wb9dbNWjNxZywzep8YG8x_fgde8ASbaOF_lrccZI6MKWqg13QYPbsK42oTdypA9cMY6255hewGnmB7hzpcg2Awd9G7gcEZfaCwIR5JlRxQLltSoQ_wM=w2934-h1956-s-no?authuser=0',
        label: 'CÔNG CỤ ĐÁNH GIÁ KINH DOANH BỀN VỮNG',
        labelBtn: 'Thông tin chi tiết',
        to: '/evaluate'
    },
    {
        src: 'https://lh3.googleusercontent.com/pw/AIL4fc9jWmNmPGjP0PpfCmSjZO1NJEcAMES0rErWfvxeqnzs6n7coypU2d7YJlwGZmC46SqM3IZjf-wJv6s2PLsAWMR2a8_wRq5zMc3SJLMxcYHkvD0oBTEHt7KVKL8zuDKLmIekLHxz27Mh7_IWdsPQC5iI=w612-h408-s-no?authuser=0',
        label: 'SÁNG KIẾN ESG VIỆT NAM 2023',
        labelBtn: 'Thông tin chi tiết',
        to: '/events'
    }
]
</script>

<template>
    <a-carousel arrows class="h-full">
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
        <div v-for="banner in banners" class="relative h-full">
            <div class="text-white md:text-3xl xl:text-5xl text-base font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col md:gap-5 gap-2">
                <div class="text-center">
                    {{ banner.label }}
                </div>
                <a-button v-if="banner.labelBtn" class="text-white h-fit md:text-lg xl:text-2xl">
                    <router-link :to="banner.to">{{ banner.labelBtn }}</router-link>
                </a-button>
            </div>
            <div class="h-full">
                <img class="w-full h-full" :src="banner.src" alt="carousel">
            </div>
        </div>
    </a-carousel>
</template>

<style scoped>
:deep(.slick-slide) {
    height: 500px;
}

:deep(.slick-slide>div) {
    height: 500px;
}

@media screen and (max-width: 430px) {
    :deep(.slick-slide) {
        height: 300px;
    }

    :deep(.slick-slide>div) {
        height: 300px;
    }
}


:deep(.slick-arrow.custom-slick-arrow) {
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    transition: ease all 0.3s;
    opacity: 0.7;
    z-index: 1;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff;
    opacity: 0.5;
}

:deep(.slick-slide h3) {
    color: #fff;
}
</style>