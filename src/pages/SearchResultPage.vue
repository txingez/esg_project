<script setup>

import BreadCrumb from "../components/BreadCrumb.vue";
import { useRouter } from "vue-router";
import { useSearchStore } from "../stores/useSearchStore.js";
import { onMounted, ref, watch } from "vue";
import { searchPosts } from "../services/posts.js";

const router = useRouter()
const searchStore = useSearchStore()

const searchValue = ref('')
const searchValueInResult = ref('')

const routes = [
	{name: 'Home', to: '/'},
	{name: 'Tìm kiếm', to: '/search-result/'}
]

const routeParam = router.currentRoute.value.params.searchValue

const resultsToShow = ref([])
const currentOffset = ref(0)
const isAll = ref(false)
const spinning = ref(false)

onMounted(() => {
	searchValue.value = routeParam
	searchValueInResult.value = routeParam
	getData(routeParam, currentOffset.value)
})

watch(router.currentRoute, (route) => {
	const searchParam = route.params.searchValue
	searchValue.value = searchParam
	searchValueInResult.value = searchParam
	getData(searchParam, currentOffset.value)
})

const getData = (query, offset, limit = 8) => {
	spinning.value = true
	const body = {
		query: query,
		limit: limit,
		offset: offset
	}
	searchPosts(body)
		.then((response) => {
			resultsToShow.value = [...resultsToShow.value, ...response.data]
			if (response.data.length < limit) isAll.value = true
		})
		.catch((err) => {
			console.log(err)
		})
		.finally(() => {
			spinning.value = false
		})
}

const handleSeeDetail = document => {
	router.push(`/library/detail/${document.id}`)
}

const showMore = () => {
	getData(searchValue.value, currentOffset.value + 8)
	currentOffset.value += 8
}

const handleCategory = category => {
	switch (category) {
		case 'NEWS':
			return 'Tin tức'
		case 'EVENT':
			return 'Sự kiện'
		case 'LIBRARY':
			return 'Thư viện'
	}
}

const onSearch = value => {
	isAll.value = false
	resultsToShow.value = []
	searchValueInResult.value = value
	searchStore.update(value)
	router.push(`/search-result/${value}`)
}

</script>

<template>
    <div class="md:px-10 lg:px-[150px] xl:px-[200px] px-5 py-5">
        <BreadCrumb :routes="routes"/>
    </div>
    <div class="bg-[#072608] h-[150px] flex justify-center items-center p-5">
        <a-input-search v-model:value="searchValue"
                        class="md:w-2/3 w-full"
                        placeholder="Tìm kiếm ..."
                        size="large"
                        @search="onSearch"/>
    </div>
    <div class="md:px-10 lg:px-[150px] xl:px-[200px] px-5 py-5 space-y-5">
        <div class="xl:text-3xl md:text-2xl text-xl text-[#9ca3af]">Kết quả cho từ khoá "<span
                class="text-[#1677ff]">{{ searchValueInResult }}</span>"
        </div>
        <a-spin :spinning="spinning">
            <div class="space-y-5">
                <div v-for="result in resultsToShow"
                     class="flex gap-5 md:flex-row flex-col">
                    <div class="xl:basis-1/3 md:basis-1/2">
                        <a v-if="result.content_type === 'LINK'" :href="result.content"
                           target="_blank">
                            <img :src="result.image" alt="" class="lg:h-[200px] md:h-[150px] h-[200px] w-full">
                        </a>
                        <a v-else @click.prevent="handleSeeDetail(result)">
                            <img :src="result.image" alt="" class="lg:h-[200px] md:h-[150px] h-[200px] w-full">
                        </a>
                    </div>
                    <div class="xl:basis-2/3 md:basis-1/2">
                        <a v-if="result.content_type === 'LINK'"
                           :href="result.content"
                           class="xl:text-2xl md:text-base hover:text-[#2563eb] text-[#60a5fa]"
                           target="_blank">
                            {{ result.title }}
                        </a>
                        <a v-else
                           class="xl:text-2xl md:text-base hover:text-[#2563eb] text-[#60a5fa]"
                           @click.prevent="handleSeeDetail(result)">
                            {{ result.title }}
                        </a>
                        <div class="italic text-[#9ca3af]">
                            <div>Chuyên mục: <span>{{ handleCategory(result.category) }}</span></div>
                            <div>Nguồn: <span>{{ result.source }}</span></div>
                            <div>Ngày phát hành: <span>{{ result.release_date }}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </a-spin>
        <div v-if="!isAll" class="text-center">
            <a-button class="min-h-[50px] min-w-[150px]" @click.prevent="showMore">Xem tiếp</a-button>
        </div>
        <div v-else class="text-center italic">Đã xem hết các tài liệu</div>
    </div>
</template>

<style scoped>
:deep(.ant-input-group-addon) {
    background: #15B9A0;
}

:deep(.ant-input-search-button) {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
