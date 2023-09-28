<script setup>
import {CloseOutlined, HistoryOutlined, LogoutOutlined, MenuOutlined, UserOutlined} from '@ant-design/icons-vue'
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
    {label: 'Tổng quan về kinh doanh bền vững', name: ['Overview'], to: '/overview'},
    {
        label: 'Đánh giá kinh doanh bền vững',
        name: ['Evaluate', 'EvaluateESGForm', 'EvaluateNECForm'],
        to: '/evaluate',
        children: [
            {label: 'Công cụ đánh giá ESG', to: '/evaluate/esg/form'},
            {label: 'Công cụ đánh giá kinh tế tuần hoàn', to: '/evaluate/nec/form'}
        ]
    },
    {label: 'Sáng kiến ESG Việt Nam', name: ['OutTarget'], to: 'https://main.ipsc.vn/esg'},
    {label: 'Hoạt động', name: ['Events'], to: '/events'},
    {label: 'Thư viện', name: ['Library', 'Detail'], to: '/library'},
    {label: 'Liên hệ', name: ['Contact'], to: '/contact'},
]

const handleClickMenu = () => {
    open.value = !open.value
}

const handleChangeRoute = () => {
    open.value = false
}

const handleLogout = () => {
    const body = {
        email: localStorage.getItem(import.meta.env.ENV_EMAIL_KEY)
    }
    logout(body).then(() => {
        localStorage.clear()
        userInfo.token = null
        userInfo.email = null
        userInfo.fullName = null
        router.push('/')
    }).catch((err) => {
        console.log(err)
    })
}

const updateUserInfo = () => {
    userInfo.fullName = localStorage.getItem(import.meta.env.ENV_FULL_NAME_KEY)
    userInfo.email = localStorage.getItem(import.meta.env.ENV_EMAIL_KEY)
    userInfo.token = localStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
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

const onSearch = (value) => {
    searchStore.update(value)
    router.push(`/search-result/${value}`)
}

const handleShowUserInfo = () => {
    router.push('/user-info')
}

const handleShowHistoryEvaluated = () => {
    router.push('/history')
}
</script>

<template>
    <div class="sticky top-0 left-0 right-0 z-[100]">
        <div class="md:h-[50px] h-[40px] bg-[#072608] flex flex-row items-center py-2 md:gap-5 gap-2 justify-end md:px-[20px] xl:px-[25px] px-[10px] text-white">
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

            <a-input-search v-model:value="searchStore.searchValue"
                            placeholder="Tìm kiếm ..."
                            class="md:w-[25%] xl:w-[20%] w-full"
                            @search="onSearch"/>
            <div v-if="!userInfo.token && !userInfo.fullName" class="flex md:space-x-2 xl:text-sm text-xs">
                <router-link class="w-[60px]" to="/register">Đăng ký</router-link>
                <router-link class="xl:w-[80px] w-[65px]" to="/login">Đăng nhập</router-link>
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
                        <div class="px-5 py-2.5 text-base hover:cursor-pointer hover:text-blue-500 flex gap-2 items-center"
                             @click.prevent="handleShowUserInfo">
                            <UserOutlined/>
                            <span>Thông tin tài khoản</span>
                        </div>
                        <div class="px-5 py-2.5 text-base hover:cursor-pointer hover:text-blue-500 flex gap-2 items-center"
                             @click.prevent="handleShowHistoryEvaluated">
                            <HistoryOutlined/>
                            <span>Hoạt động</span>
                        </div>
                        <div class="px-5 py-2.5 text-base hover:cursor-pointer hover:text-blue-500 flex gap-2 items-center"
                             @click.prevent="handleLogout">
                            <LogoutOutlined/>
                            <span>Đăng xuất</span>
                        </div>
                    </div>
                </template>
            </a-dropdown>
        </div>
        <div class="md:flex md:p-[20px_40px] xl:p-[25px] p-[15px] items-center justify-between bg-white">
            <div class="xl:w-[250px] lg:w-[150px] w-[200px] lg:h-[25px] xl:h-[30px] h-[30px]">
                <router-link to="/">
                    <img class="h-full w-full" src="../assets/logo.jpg" alt="Logo">
                </router-link>
            </div>

            <MenuOutlined v-if="!open"
                          class="absolute xl:hidden md:right-6 right-3 md:top-[65px] lg:top-[62px] top-[51px] cursor-pointer text-2xl"
                          @click.prevent="handleClickMenu"/>
            <CloseOutlined v-else
                           class="absolute xl:hidden md:right-6 right-3 md:top-[65px] lg:top-[62px] top-[51px] cursor-pointer text-2xl"
                           @click.prevent="handleClickMenu"/>

            <ul class="xl:transition-none transition-all ease-linear duration-500 xl:flex xl:gap-10 xl:justify-center
            xl:static m-0 absolute md:top-[120px] lg:top-[115px] top-[100px] xl:w-auto w-full z-10 bg-white"
                :class="[open ? 'left-0' : 'left-[-100%]']">
                <li v-for="link in links" class="my-2 flex items-center xl:px-0 px-5">
                    <a-dropdown v-if="link.children" @click.prevent :trigger="['hover']">
                        <router-link :to="link.to"
                                     class="text-center md:text-base xl:text-lg text-sm font-semibold"
                                     :class="link.name.includes(router.currentRoute.value.name) ? 'activated' : ''"
                                     @click.prevent="handleChangeRoute">
                            {{ link.label }}
                        </router-link>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item v-for="child in link.children" :key="child.key">
                                    <router-link :to="child.to"
                                                 target="_blank"
                                                 class="md:text-base xl:text-lg text-sm font-semibold">
                                        {{ child.label }}
                                    </router-link>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                    <a v-else-if="link.name.includes('OutTarget')"
                       class="text-center md:text-base xl:text-lg text-sm font-semibold deactive"
                       :href="link.to"
                       target="_blank">
                        {{ link.label }}
                    </a>
                    <router-link v-else :to="link.to"
                                 class="text-center md:text-base xl:text-lg text-sm font-semibold"
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

.deactive:focus {
    background-position: -100%;
}

.deactive:focus::before {
    width: 0;
}


:deep(.ant-input-search-button) {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
