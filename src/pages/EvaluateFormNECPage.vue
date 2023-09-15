<script setup>
import {defineAsyncComponent} from "vue";
import {useStepStore} from "../stores/useStepStore.js";

const stepStore = useStepStore()

const stepItems = [
    {key: 'first', title: 'Hồ sơ doanh nghiệp'},
    {key: 'second', title: 'Tầm nhìn của doanh nghiệp'},
    {key: 'third', title: 'Sản xuất và tiền sản xuất'},
    {key: 'forth', title: 'Sau sản xuất'},
    {key: 'fifth', title: 'Kết quả và đánh giá'}
];

const steps = [
    {title: 'Hồ sơ doanh nghiệp', content: 'OrganizationProfileNECForm'},
    {title: 'Tầm nhìn của doanh nghiệp', content: 'EvaluatedForm'},
    {title: 'Sản xuất và tiền sản xuất', content: 'EvaluatedForm'},
    {title: 'Sau sản xuất', content: 'EvaluatedForm'},
    {title: 'Kết quả và đánh giá', content: 'ResultEvaluated'}
];

</script>

<template>
    <div class="flex gap-10 flex-col py-10">
        <div class="result-container">
            <div class="text-center font-bold md:text-2xl lg:text-3xl xl:text-4xl text-xl">
                CÔNG CỤ ĐÁNH GIÁ MỨC ĐỘ ÁP DỤNG NGUYÊN TẮC KINH TẾ TUẦN HOÀN CỦA DOANH NGHIỆP TẠI VIỆT NAM
            </div>

            <div class="md:px-10 lg:px-[50px] xl:px-[200px] px-5 space-y-5">
                <a-steps :current="stepStore.currentStepState" :items="stepItems"/>
                <div class="steps-content">
                    <component
                            :is="defineAsyncComponent(() => import(`../components/${steps[stepStore.currentStepState].content}.vue`))"/>
                </div>
            </div>
        </div>
    </div>
</template>
