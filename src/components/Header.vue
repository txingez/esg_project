<script setup>
import {
	CloseOutlined,
	HistoryOutlined,
	LogoutOutlined,
	MenuOutlined,
	SearchOutlined,
	UserOutlined
} from '@ant-design/icons-vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { logout } from "../services/authentication.js";
import { useRouter } from "vue-router";
import { useSearchStore } from "../stores/useSearchStore.js";

const router = useRouter()
const searchStore = useSearchStore()

const open = ref(false)
const language = ref('VIE')
const userInfo = reactive({})

const links = [
	{label: 'Tổng quan về \nkinh doanh bền vững', name: ['Overview'], to: '/overview'},
	{
		label: 'Đánh giá \nkinh doanh bền vững',
		name: ['Evaluate', 'EvaluateESGForm', 'EvaluateNECForm'],
		to: '/evaluate',
		children: [
			{label: 'Công cụ đánh giá ESG', to: '/evaluate/esg/form'},
			{label: 'Công cụ đánh giá kinh tế tuần hoàn', to: '/evaluate/nec/form'},
            {label: 'Công cụ đánh giá kinh doanh bao trùm', to: '/news/detail/100'}
		]
	},
	{label: 'Sáng kiến \nESG Việt Nam', name: ['ESGVietNam'], to: '/esg-vietnam'},
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

const onSearch = e => {
	searchStore.update(e.target.value)
	router.push(`/search-result/${e.target.value}`)
}

const handleShowUserInfo = () => {
	router.push('/user-info')
}

const handleShowHistoryEvaluated = () => {
	router.push('/history')
}
</script>

<template>
    <div class="sticky top-0 left-0 right-0 z-[999]">
        <div class="xl:h-[50px] md:h-[75px] h-[100px] bg-[#0E7AB7] flex justify-center">
            <div class="w-full xl:px-10 px-5 max-w-[1440px] flex xl:flex-row flex-col xl:items-center items-end py-2 justify-between text-white">
                <div class="text-[10px] tracking-widest xl:self-start self-center flex justify-center items-center h-full xl:text-left text-center">
                    TRANG THÔNG TIN ĐIỆN TỬ CHÍNH THỨC CỦA CỤC PHÁT TRIỂN DOANH NGHIỆP, BỘ KẾ HOẠCH VÀ ĐẦU TƯ VỀ ÁP DỤNG
                    KINH DOANH BỀN VỮNG
                </div>
                <div class="flex items-center justify-end gap-5 xl:w-[35%]">
                    <a-input v-model:value="searchStore.searchValue"
                             class="xl:w-[60%] md:w-[200px] w-full rounded-[20px] bg-transparent header-search-input border-white"
                             placeholder="TÌM KIẾM"
                             @pressEnter="onSearch">
                        <template #prefix>
                            <SearchOutlined class="text-white"/>
                        </template>
                    </a-input>
                    <div v-if="!userInfo.token && !userInfo.fullName"
                         class="flex items-center md:space-x-5 space-x-2 text-[10px]/[28px] tracking-widest">
                        <router-link class="w-fit whitespace-nowrap" to="/register">ĐĂNG KÝ</router-link>
                        <router-link class="w-fit whitespace-nowrap" to="/login">ĐĂNG NHẬP</router-link>
                    </div>
                    <a-dropdown v-else trigger="['click']">
                        <a-avatar class="bg-[#d1d5db] flex justify-center items-center hover:cursor-pointer"
                                  size="default">
                            <template #icon>
                                <UserOutlined/>
                            </template>
                        </a-avatar>
                        <template #overlay>
                            <div class="bg-[#072608] text-white min-w-[250px]">
                                <div class="border-b min-h-[80px] p-5">
                                    <div class="text-base">TÀI KHOẢN</div>
                                    <div class="flex items-center gap-2.5">
                                        <a-avatar class="bg-[#d1d5db] flex justify-center items-center" size="default">
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
            </div>
        </div>

        <div class="flex justify-center md:h-[115px] h-[100px] bg-[#f4fbff]">
            <div class="w-full px-5 max-w-[1440px] flex items-center justify-between">
                <div class="xl:w-[250px] lg:w-[150px] w-[200px]">
                    <router-link to="/">
                        <div class="flex items-center xl:gap-1.5 gap-3">
                            <img alt="MPI_logo" class="xl:h-[80px] h-[65px]" src="../assets/MPI_logo.png"/>
                            <img alt="NED_logo" class="xl:h-[60px] h-[45px]" src="../assets/ned_vertical_logo.png">
                        </div>
                    </router-link>
                </div>

                <MenuOutlined v-if="!open"
                              class="absolute xl:hidden md:right-6 right-3 md:top-[110px] top-[130px] cursor-pointer text-3xl text-gray-600"
                              @click.prevent="handleClickMenu"/>
                <CloseOutlined v-else
                               class="absolute xl:hidden md:right-6 right-3 md:top-[110px] top-[130px] cursor-pointer text-3xl text-gray-600"
                               @click.prevent="handleClickMenu"/>

                <ul :class="[open ? 'left-0' : 'left-[-100%]']"
                    class="xl:transition-none transition-all ease-linear duration-500 xl:flex xl:gap-10 xl:justify-center
                xl:static m-0 absolute md:top-[192px] top-[201px] xl:w-auto w-full z-10 xl:h-full xl:bg-transparent bg-white">
                    <li v-for="link in links"
                        class="m-0 flex xl:px-0 xl:py-8 py-4 px-5 text-[#5E6C92] text-sm/[20px] font-semibold tracking-wider hover:cursor-pointer hover:border-b-[3px]
                    hover:border-[#0E7AB7] transition-all ease-in-out duration-300"
                        :class="link.name.includes(router.currentRoute.value.name) ? 'activated' : ''">
                        <a-dropdown v-if="link.children" :trigger="['hover']" @click.prevent>
                            <router-link :to="link.to"
                                         class="text-center py-0 xl:whitespace-pre-wrap"
                                         @click.prevent="handleChangeRoute">
                                {{ link.label.toUpperCase() }}
                            </router-link>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item v-for="child in link.children" :key="child.key">
                                        <router-link :to="child.to"
                                                     class="!text-[#5E6C92] !tracking-[.01em]"
                                                     target="_blank">
                                            {{ child.label.toUpperCase() }}
                                        </router-link>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                        <router-link v-else
                                     :to="link.to"
                                     class="text-center py-0 xl:whitespace-pre-wrap align-top"
                                     @click.prevent="handleChangeRoute">
                            {{ link.label.toUpperCase() }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.activated {
    border-bottom: 3px solid #0E7AB7;
}

.activated a {
    color: #0E7AB7;
}

:deep(.header-search-input.ant-input-affix-wrapper >input.ant-input) {
    background: transparent !important;
    color: #fff;
}

:deep(.header-search-input.ant-input-affix-wrapper >input.ant-input)::placeholder {
    color: #fff;
    opacity: 0.5;
}
</style>
