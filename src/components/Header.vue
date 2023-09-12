<script setup>
import {CloseOutlined, MenuOutlined, SearchOutlined, UserOutlined} from '@ant-design/icons-vue'
import {onMounted, reactive, ref, watch} from 'vue'
import {logout} from "../services/authentication.js";
import {useRouter} from "vue-router";
import {useSearchStore} from "../stores/useSearchStore.js";

const router = useRouter()
const searchStore = useSearchStore()

const open = ref(false)
const language = ref('VIE')
const userInfo = reactive({})

const links = [
    {label: 'Trang chủ', to: '/'},
    {label: 'Tổng quan về kinh doanh bền vững', to: '/overview'},
    {label: 'Đánh giá kinh doanh bền vững', to: '/evaluate'},
    {label: 'Thư viện', to: '/library'},
    {label: 'Hoạt động', to: '/events'}
]

const handleClickMenu = () => {
    open.value = !open.value
}

const handleChangeRoute = () => {
    open.value = false
}

const handleLogout = () => {
    const body = {
        email: sessionStorage.getItem(import.meta.env.ENV_EMAIL_KEY)
    }
    logout(body).then(() => {
        sessionStorage.clear()
        userInfo.token = null
        userInfo.email = null
        userInfo.fullName = null
        router.push('/')
    }).catch((err) => {
        console.log(err)
    })
}

const updateUserInfo = () => {
    userInfo.fullName = sessionStorage.getItem(import.meta.env.ENV_FULL_NAME_KEY)
    userInfo.email = sessionStorage.getItem(import.meta.env.ENV_EMAIL_KEY)
    userInfo.token = sessionStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
}

onMounted(() => {
    if (router.currentRoute.value.name === 'SearchResult') {
        searchStore.update(router.currentRoute.value.params.searchValue)
    }
    updateUserInfo()
})

watch(router.currentRoute, (route) => {
    updateUserInfo()
})

const onSearch = (e) => {
    e.preventDefault()
    searchStore.update(e.target.value)
    router.push(`/search-result/${e.target.value}`)
}
</script>

<template>
    <div class="sticky top-0 left-0 right-0 z-[100]">
        <div class="md:h-[50px] bg-[#072608] flex md:flex-row flex-col-reverse md:items-center items-end py-2 md:gap-5 gap-2 justify-end xl:px-[25px] px-[10px] text-white">
            <!--            <div class="flex items-center gap-1">-->
            <!--                <div class="flex items-center gap-1.5">-->
            <!--                    <img class="md:w-[24px] w-[18px]" src="../assets/vietnam.png" alt="vietnam">-->
            <!--                    <a :class="language === 'VIE' ? 'text-sky-500' : ''">VIE</a>-->
            <!--                </div>-->
            <!--                <a-divider type="vertical" class="bg-white"/>-->
            <!--                <div class="flex items-center gap-1.5">-->
            <!--                    <img class="md:w-[24px] w-[18px]" src="../assets/english.png" alt="english">-->
            <!--                    <a>EN</a>-->
            <!--                </div>-->
            <!--            </div>-->

            <a-input v-model:value="searchStore.searchValue"
                     placeholder="Tìm kiếm ..."
                     class="md:w-1/3 w-full"
                     @pressEnter="onSearch">
                <template #addonAfter>
                    <SearchOutlined/>
                </template>
            </a-input>
            <div v-if="!userInfo.token && !userInfo.fullName" class="space-x-2.5">
                <router-link to="/register">Đăng ký</router-link>
                <router-link to="/login">Đăng nhập</router-link>
            </div>
            <a-dropdown v-else trigger="['click']">
                <a-avatar size="default" class="bg-[#d1d5db] flex justify-center items-center hover:cursor-pointer">
                    <template #icon>
                        <UserOutlined/>
                    </template>
                </a-avatar>
                <template #overlay>
                    <div class="bg-[#072608] text-white min-w-[250px]">
                        <div class="border-b min-h-[80px] p-5">
                            <div class="text-base">TÀI KHOẢN</div>
                            <div class="flex items-center gap-2.5">
                                <a-avatar size="default" class="bg-[#d1d5db] flex justify-center items-center">
                                    <template #icon>
                                        <UserOutlined/>
                                    </template>
                                </a-avatar>
                                <div class="text-[#d1d5db]">
                                    <div>{{ userInfo.fullName }}</div>
                                    <div class="text-xs">{{ userInfo.email }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="px-5 py-2.5 text-base hover:cursor-pointer" @click.prevent="handleLogout">
                            Đăng xuất
                        </div>
                    </div>
                </template>
            </a-dropdown>
        </div>
        <div class="md:flex md:p-[20px_10px] xl:p-[20px_100px] p-[15px] items-center justify-between bg-white">
            <div class="md:w-[70px] lg:w-[100px] xl:w-[130px] w-[100px] ">
                <router-link to="/">
                    <img src="../assets/logo.png" alt="Logo">
                </router-link>
            </div>

            <MenuOutlined v-if="!open" class="absolute md:hidden right-6 top-[100px] cursor-pointer text-2xl"
                          @click.prevent="handleClickMenu"/>
            <CloseOutlined v-else class="absolute md:hidden right-6 top-[100px] cursor-pointer text-2xl"
                           @click.prevent="handleClickMenu"/>

            <ul class="md:transition-none transition-all ease-linear duration-500 md:flex md:justify-center md:static m-0 absolute top-[163px] md:w-auto w-full z-10 bg-white"
                :class="[open ? 'left-0' : 'left-[-100%]']">
                <li v-for="link in links" class="my-3 flex items-center md:px-2 xl:px-5 px-5">
                    <router-link :to="link.to" class="text-center md:text-xs lg:text-base xl:text-lg text-sm"
                                 @click.prevent="handleChangeRoute">
                        {{ link.label }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
:deep(.ant-input-group-addon) {
    background: #15B9A0;
}
</style>
