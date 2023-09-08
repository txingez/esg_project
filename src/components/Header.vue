<script setup>
import {CloseOutlined, DownOutlined, MenuOutlined, UserOutlined} from '@ant-design/icons-vue'
import {onMounted, reactive, ref} from 'vue'
import {logout} from "../services/authentication.js";
import {useRouter} from "vue-router";

const router = useRouter()

const open = ref(false)
const language = ref('VIE')
const userInfo = reactive({})

const links = [
    {label: 'Trang chủ', to: '/'},
    {label: 'Tổng quan về kinh doanh bền vững', to: '/overview'},
    {label: 'Đánh giá kinh doanh bền vững', to: '/evaluate'},
    {label: 'Thư viện', to: '/library'},
    {label: 'Hoạt động', to: '/events'},
    // {
    //     label: 'Nguồn lực hỗ trợ', to: '/', children: [
    //         {key: 1, label: 'Mạng lưới Chuyên gia', to: ''},
    //         {key: 2, label: 'Tiếp cận Tài chính xanh', to: ''},
    //         {key: 3, label: 'Giải pháp kinh doanh bền vững', to: ''},
    //     ]
    // },
]

const handleClickMenu = () => {
    open.value = !open.value
}

const handleChangeRoute = () => {
    open.value = false
}

const handleLogout = () => {
    logout().then((response) => {
        sessionStorage.clear()
        userInfo.token = null
        userInfo.email = null
        userInfo.fullName = null
        router.push('/')
    }).catch((err) => {
        console.log(err)
    })
}

onMounted(() => {
    userInfo.fullName = sessionStorage.getItem(import.meta.env.ENV_FULL_NAME_KEY)
    userInfo.email = sessionStorage.getItem(import.meta.env.ENV_EMAIL_KEY)
    userInfo.token = sessionStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
})

</script>

<template>
    <div class="sticky top-0 left-0 right-0 z-[100]">
        <div v-if="!userInfo.token && !userInfo.fullName"
             class="h-[50px] bg-[#072608] flex gap-5 justify-end items-center xl:px-[100px] px-[25px] text-white">
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
            <router-link to="/register">Đăng ký</router-link>
            <router-link to="/login">Đăng nhập</router-link>
        </div>
        <div v-else
             class="h-[50px] bg-[#072608] flex justify-end gap-1.5 items-center xl:px-[25px] px-[25px] text-white">
            <a-dropdown>
                <a-avatar size="default" class="bg-[#d1d5db] flex justify-center items-center">
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
                        <div class="px-5 py-2.5 text-base hover:cursor-pointer" @click.prevent="handleLogout">Đăng
                            xuất
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

            <MenuOutlined v-if="!open" class="absolute md:hidden right-6 top-[70px] cursor-pointer text-2xl"
                          @click.prevent="handleClickMenu"/>
            <CloseOutlined v-else class="absolute md:hidden right-6 top-[70px] cursor-pointer text-2xl"
                           @click.prevent="handleClickMenu"/>

            <ul class="md:transition-none transition-all ease-linear duration-500 md:flex md:justify-center md:static m-0 absolute top-[137px] md:w-auto w-full z-10 bg-white"
                :class="[open ? 'left-0' : 'left-[-100%]']">
                <li v-for="link in links" class="my-3 flex items-center md:px-2 xl:px-5 px-5">
                    <a-dropdown v-if="link.children" @click.prevent :trigger="['click']">
                        <div class="flex gap-1 items-center text-center md:text-xs lg:text-base xl:text-lg text-sm">
                            <span>{{ link.label }}</span>
                            <DownOutlined/>
                        </div>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item v-for="child in link.children" :key="child.key">
                                    <router-link :to="child.to" class="md:text-base lg:text-base xl:text-lg text-sm">
                                        {{ child.label }}
                                    </router-link>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                    <router-link v-else :to="link.to" class="text-center md:text-xs lg:text-base xl:text-lg text-sm"
                                 @click.prevent="handleChangeRoute">
                        {{ link.label }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
