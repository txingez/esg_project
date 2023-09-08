<script setup>

import Banner from "../components/Banner.vue";

const hotNews = [
    {
        id: 1,
        img: 'news_1.jpeg',
        title: 'Lorem lorem 1'
    },
    {
        id: 2,
        img: 'news_2.jpeg',
        title: 'Lorem lorem 2'
    },
    {
        id: 3,
        img: 'news_3.jpeg',
        title: 'Lorem lorem 3'
    },
    {
        id: 4,
        img: 'news_4.jpeg',
        title: 'Lorem lorem 4'
    },
    {
        id: 5,
        img: 'news_5.jpeg',
        title: 'Lorem lorem 5'
    }
]

const policyNews = [
    {
        id: 1,
        img: 'news_1.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.'
    },
    {
        id: 2,
        img: 'news_2.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.'
    },
    {
        id: 3,
        img: 'news_3.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.'
    },
    {
        id: 4,
        img: 'news_4.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.'
    }
]

const companyNews = [
    {
        id: 1,
        img: 'news_1.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.'
    },
    {
        id: 2,
        img: 'news_2.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.'
    },
    {
        id: 3,
        img: 'news_3.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.'
    },
    {
        id: 4,
        img: 'news_4.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.'
    }
]
</script>

<template>
    <Banner label="tin tức" img-name="banner.jpeg"/>

    <div class="flex gap-5 flex-col">
        <div class="font-bold md:text-4xl xl:text-5xl text-3xl md:px-10 lg:px-[150px] xl:px-[200px] px-5 py-5">
            TIN TỨC CẬP NHẬT
        </div>
        <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 xl:py-10 pb-10">
            <div class="grid grid-cols-4 grid-rows-4 xl:min-h-[500px]">
                <div v-for="(hn,index) in hotNews" :key="hn.id"
                     class="relative"
                     :class="[index === 0 ? 'xl:col-span-2 col-span-4 row-span-4' : 'xl:col-span-1 col-span-2 row-span-2']">
                    <div class="absolute text-white z-50 bg-black h-full w-full bg-opacity-25 flex items-end">
                        <div class="md:text-base text-sm md:p-5 p-2 font-semibold">{{ hn.title }}</div>
                    </div>
                    <div class="h-full">
                        <img class="h-full"
                             :alt="`hot_news_${hn.id}`">
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="md:px-10 lg:px-[150px] xl:px-[200px] px-5 py-10">
        <div class="flex flex-col gap-5">
            <div class="font-bold md:text-4xl xl:text-5xl text-3xl">
                Chính sách - Tài chính
            </div>
            <div class="flex md:flex-row flex-col flex-wrap gap-5">
                <div v-for="pn in policyNews" :key="pn.id"
                     class="flex flex-col gap-2 md:basis-[48%] basis-1">
                    <div class="flex">
                        <img class="rounded-[10px] w-full md:h-[200px] lg:h-[230px] xl:h-[300px]"
                             :alt="`policy_news_${pn.id}`">
                    </div>
                    <div>
                        {{ pn.description }}
                    </div>
                </div>
            </div>
            <div class="text-center">
                <a-button type="primary" class="bg-[#1677ff] h-[50px] w-[150px]">Xem thêm</a-button>
            </div>
        </div>
    </div>

    <div class="md:px-10 lg:px-[150px] xl:px-[200px] px-5 py-10">
        <div class="flex flex-col gap-5">
            <div class="font-bold md:text-4xl xl:text-5xl text-3xl">
                Doanh nghiệp - Tài chính
            </div>
            <div class="flex md:flex-row flex-col flex-wrap gap-5">
                <div v-for="cn in companyNews" :key="cn.id"
                     class="flex flex-col gap-2 md:basis-[48%] basis-1">
                    <div class="flex">
                        <img class="rounded-[10px] w-full md:h-[200px] lg:h-[230px] xl:h-[300px]"
                             :alt="`policy_news_${cn.id}`">
                    </div>
                    <div>
                        {{ cn.description }}
                    </div>
                </div>
            </div>
            <div class="text-center">
                <a-button type="primary" class="bg-[#1677ff] h-[50px] w-[150px]">Xem thêm</a-button>
            </div>
        </div>
    </div>
</template>
