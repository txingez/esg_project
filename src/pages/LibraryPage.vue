<script setup>
import Banner from "../components/Banner.vue";
import {onMounted, ref} from "vue";
import {getPosts} from "../services/posts.js";
import {useRouter} from "vue-router";
import BreadCrumb from "../components/BreadCrumb.vue";

const router = useRouter()

const documentToShow = ref([])
const currentOffset = ref(0)
const isAll = ref(false)
const spinning = ref(false)

const routes = [
    {name: 'Home', to: '/'},
    {name: 'Thư viện', to: '/library'},
]

onMounted(() => {
    getData(currentOffset.value)
})

const showMore = () => {
    getData(currentOffset.value + 8)
    currentOffset.value += 8
}

const getData = (offset, limit = 8) => {
    spinning.value = true
    getPosts('lib', limit, offset)
        .then((response) => {
            spinning.value = false
            documentToShow.value = [...documentToShow.value, ...response.data]
            if (response.data.length < limit) isAll.value = true
        })
        .catch((err) => {
            spinning.value = false
            console.log(err)
        })
}

const handleSeeDetail = document => {
    router.push(`/library/detail/${document.id}`)
}
</script>

<template>
    <Banner label="thư viện"
            img-src="https://lh3.googleusercontent.com/pw/AIL4fc-oqkvJWEb4WgEDyAobLkR6yB0L5cAStpAty8JqS6J1FI3ODOm7EUg68vsyVfEuN6FYs149-E-W5v4IeW1hlmFkooz1rKzpOxRZ4E8UQr7Fg--xOo5q90g3B76yKIderS_n0ZsClhvd0arKq0wOuDRb=w1800-h1201-s-no?authuser=0"/>

    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 mt-2.5">
        <BreadCrumb :routes="routes"/>
    </div>

    <a-spin :spinning="spinning">
        <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10 space-y-5">
            <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
                <a-card hoverable v-for="document in documentToShow">
                    <template #cover>
                        <a v-if="document.content_type === 'LINK'" :href="document.content" target="_blank">
                            <img class="lg:h-[200px] md:h-[150px] h-[200px] w-full" :src="document.image" alt=""></a>
                        <a v-else @click.prevent="handleSeeDetail(document)">
                            <img class="lg:h-[200px] md:h-[150px] h-[200px] w-full" :src="document.image" alt="">
                        </a>
                    </template>
                    <div class="space-y-2">
                        <a v-if="document.content_type === 'LINK'" :href="document.content" target="_blank"
                           class="font-bold line-clamp-2 text-ellipsis text-base">
                            {{ document.title }}
                        </a>
                        <a v-else
                           class="font-bold line-clamp-2 text-ellipsis text-base"
                           @click.prevent="handleSeeDetail(document)">
                            {{ document.title }}
                        </a>
                        <div>
                            <div>Nguồn: <span>{{ document.source }}</span></div>
                            <div>Ngày phát hành: <span>{{ document.release_date }}</span></div>
                        </div>
                    </div>
                </a-card>
            </div>
            <div class="text-center" v-if="!isAll">
                <a-button @click.prevent="showMore" class="min-h-[50px] min-w-[150px]">Xem thêm</a-button>
            </div>
            <div v-else class="text-center italic">Đã xem hết tài liệu</div>
        </div>
    </a-spin>
</template>
