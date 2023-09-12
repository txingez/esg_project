<script setup>
import Banner from "../components/Banner.vue";
import {onMounted, ref} from "vue";
import {getPosts} from "../services/posts.js";
import {useContentStore} from "../stores/useContentStore.js";
import {useRouter} from "vue-router";

const router = useRouter()
const contentStore = useContentStore()

const documentToShow = ref([])
const currentOffset = ref(0)
const isAll = ref(false)

onMounted(() => {
    getData(currentOffset.value)
})

const showMore = () => {
    getData(currentOffset.value + 8)
    currentOffset.value += 8
}

const getData = (offset, limit = 8) => {
    getPosts('lib', limit, offset)
        .then((response) => {
            documentToShow.value = [...documentToShow.value, ...response.data]
            if (response.data.length < limit) isAll.value = true
        })
        .catch((err) => {
            console.log(err)
        })
}

const handleSeeDetail = document => {
    const newState = {
        pageId: 'lib',
        title: document.title,
        content: document.content,
        image: document.image,
        source: document.source,
        releaseDate: document.release_date
    }
    contentStore.update(newState)
    router.push(`/library/detail/${document.id}`)
}
</script>

<template>
    <Banner label="thư viện"
            img-src="https://lh3.googleusercontent.com/pw/AIL4fc88PIP0GuT7kw638LKoUw-qza5KB0I7qcSGtPxO9-R-z5ZvzCW8Mbp8kXxZdYec3IEL2Oyt1sdILpMln1cENehsxQptyRbSnRx4vm4qMYCglDgGqMaCs9hZo0Kd0sZy8ddCEEPprk16Sn0DC4_poJNP=w2762-h1842-s-no?authuser=0"/>

    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10 space-y-5">
        <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
            <a-card v-for="document in documentToShow">
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
        <div v-else class="text-center italic">Đã xem hết các tài liệu</div>
    </div>
</template>
