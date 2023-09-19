<script setup>
import {CloseOutlined, MenuOutlined, SearchOutlined, UserOutlined, DownOutlined} from '@ant-design/icons-vue'
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
    {label: 'Trang chủ', name: ['Home'], to: '/'},
    {label: 'Tổng quan về kinh doanh bền vững', name: ['Overview'], to: '/overview'},
    {label: 'Đánh giá kinh doanh bền vững', name: ['Evaluate', 'EvaluateESGForm', 'EvaluateNECForm'], to: '/evaluate', children: [
            {label: 'Công cụ đánh giá ESG', to: '/evaluate/esg/form'},
            {label: 'Công cụ đánh giá kinh tế tuần hoàn', to: '/evaluate/nec/form'}
        ]},
    {label: 'Thư viện', name: ['Library', 'Detail'], to: '/library'},
    {label: 'Hoạt động', name: ['Events'], to: '/events'}
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
                <router-link to="/home">
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
                    <a-dropdown v-if="link.children" @click.prevent :trigger="['hover']">
                        <div class="flex gap-1 items-center text-center md:text-xs lg:text-base xl:text-lg text-sm">
                            <router-link :to="link.to" class="text-center md:text-xs lg:text-base xl:text-lg text-sm"
                                         :class="link.name.includes(router.currentRoute.value.name) ? 'activated' : ''"
                                         @click.prevent="handleChangeRoute">
                                {{ link.label }}
                            </router-link>
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
                                 :class="link.name.includes(router.currentRoute.value.name) ? 'activated' : ''"
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

ul li a {
    background-image: linear-gradient(
            to right,
            #15B9A0,
            #15B9A0 50%,
            #000 50%
    );
    background-size: 200% 100%;
    background-position: -100%;
    display: inline-block;
    padding: 5px 0;
    position: relative;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease-in-out;
}

ul li a:before {
    content: '';
    background: #15B9A0;
    display: block;
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 3px;
    transition: all 0.3s ease-in-out;
}

ul li a:hover {
    background-position: 0;
}

ul li a:hover::before {
    width: 100%;
}

.activated {
    background-position: 0;
}

.activated::before {
    width: 100%;
}
</style>
