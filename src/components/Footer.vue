<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useRouter} from "vue-router";
import {onMounted, ref, watch} from "vue";

const router = useRouter()
const isRenderDivider = ref(true)

const links = [
    {label: 'Tổng quan về kinh doanh bền vững', to: '/overview'},
    {label: 'Đánh giá kinh doanh bền vững', to: '/evaluate'},
    {label: 'Thư viện', to: '/library'},
    {label: 'Hoạt động', to: '/events'}
]

watch(router.currentRoute, (currentValue) => {
    isRenderDivider.value = !(currentValue.name === 'Register' || currentValue.name === 'Login');
})

onMounted(() => {
    isRenderDivider.value = !(router.currentRoute.value.name === 'Register' || router.currentRoute.value.name === 'Login');
})
</script>

<template>
    <div class="xl:text-xl flex flex-col gap-5">
        <div v-if="isRenderDivider"
             class="lg:w-[70%] w-[90%] m-[0_auto]">
            <a-divider class="bg-black"/>
        </div>
        <div class="flex md:flex-row flex-col justify-between gap-5 md:p-[20px_40px] lg:p-[50px_100px] p-[15px_30px]">
            <div class="md:w-1/4 flex justify-center">
                <router-link to="/" class="flex justify-center">
                    <img class="xl:h-[120px] xl:w-[220px] lg:h-[60%] lg:w-[70%] md:h-[50%] md:w-[80%] w-1/2"
                         src="../assets/logo.png" alt="logo_footer">
                </router-link>
            </div>
            <div class="flex flex-col md:items-start gap-5">
                <div class="flex gap-5 items-center">
                    <font-awesome-icon icon="fa-solid fa-location-dot"/>
                    <span>Số 6B, Hoàng Diệu, Ba Đình, Hà Nội</span>
                </div>
                <div class="flex gap-5 items-center">
                    <font-awesome-icon icon="fa-solid fa-phone"/>
                    <span>(123) 456-7890</span>

                </div>
                <div class="flex gap-5 items-center">
                    <font-awesome-icon icon="fa-solid fa-envelope"/>
                    <span>https://business.gov.vn/</span>
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
            <ul class="flex flex-col md:items-start gap-5 m-0">
                <li v-for="link in links">
                    <router-link :to="link.to">{{ link.label }}</router-link>
                </li>
            </ul>
        </div>
        <div class="md:p-[20px_40px] lg:p-[20px_100px] p-[20px_30px] bg-[#072608] text-white md:text-base text-xs">
            <span><font-awesome-icon icon="fa-solid fa-copyright"/> 2023, Bản quyền thuộc về Cục phát triển doanh nghiệp, Bộ Kế hoạch và đầu tư</span>
        </div>
    </div>
</template>
