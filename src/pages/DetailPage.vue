<script setup>

import Banner from "../components/Banner.vue";
import {computed} from "vue";
import {useRouter} from "vue-router";
import {ContentsNews} from "../constants/contentsNews.js";

const router = useRouter();
const detail = computed(() => {
    const id = router.currentRoute.value.params.id
    return ContentsNews[id]
})

</script>

<template>
    <div v-if="detail">
        <Banner :img-src="detail.image" label=""/>

        <div class="md:px-10 lg:px-[150px] xl:px-[200px] px-5 py-10">
            <div v-html="detail.content"/>
        </div>
    </div>
    <div v-else>Không có dữ liệu</div>
</template>
