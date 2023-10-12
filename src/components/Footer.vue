<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";

const router = useRouter()

const links = [
	{label: 'Tổng quan về kinh doanh bền vững', to: '/overview'},
	{label: 'Đánh giá kinh doanh bền vững', to: '/evaluate'},
	{label: 'Sáng kiến ESG Việt Nam', to: '/esg-vietnam'},
	{label: 'Thư viện', to: '/library'},
	{label: 'Hoạt động', to: '/events'}
]

</script>

<template>
    <div class="xl:text-xl flex flex-col gap-5 bg-[#e6e6e6] text-[#263238]">
        <div class="flex md:flex-row flex-col justify-between gap-5 md:px-[40px] lg:px-[100px] px-[30px] py-20">
            <div class="flex justify-center">
                <router-link to="/home" class="flex justify-center">
                    <div class="flex flex-row xl:gap-5 gap-3">
                        <div class="flex justify-center">
                            <img alt="MPI_logo"
                                 class="xl:w-[130px] lg:w-[80px] w-[100px] xl:h-[130px] lg:h-[80px] h-[100px]"
                                 src="../assets/MPI_logo.png"/>
                        </div>
                        <div class="">
                            <img alt="NED_logo"
                                 class="xl:h-[90px] lg:h-[55px] h-[70px] xl:translate-y-6 lg:translate-y-4 md:translate-y-3 translate-y-4"
                                 src="../assets/ned_vertical_logo.png">
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="flex flex-col md:items-start gap-5 md:basis-1/4">
                <div class="flex gap-5 items-center">
                    <font-awesome-icon icon="fa-solid fa-location-dot"/>
                    <span>Số 6B, Hoàng Diệu, Ba Đình, Hà Nội</span>
                </div>
                <div class="flex gap-5 items-center">
                    <font-awesome-icon icon="fa-solid fa-globe" />
                    <span>esg.business.gov.vn</span>
                </div>
                <div class="flex gap-5 text-4xl">
                    <a href="https://www.facebook.com/CongThongTinDoanhNghiep" target="_blank">
                        <font-awesome-icon icon="fa-brands fa-facebook-square"/>
                    </a>
                    <a href="https://www.youtube.com/channel/UCmBien8d7q9jdBDHT6RCKqw/featured" target="_blank">
                        <font-awesome-icon icon="fa-brands fa-youtube"/>
                    </a>
                </div>
            </div>
            <ul class="flex flex-col md:items-start gap-5 m-0 list-none md:basis-1/4">
                <li v-for="link in links">
                    <router-link :to="link.to">{{ link.label }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
:deep(.subscribe-input.ant-input-affix-wrapper >input.ant-input) {
    background: transparent !important;
}

:deep(.subscribe-input.ant-input-affix-wrapper >input.ant-input)::placeholder {
    color: #fff;
    font-size: 14px;
    line-height: 20px;
}
</style>
