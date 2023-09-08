<script setup>
import {defineAsyncComponent} from "vue";
import {useStepStore} from "../stores/useStepStore.js";

const stepStore = useStepStore()

const stepItems = [
    {key: 'first', title: 'Hồ sơ tổ chức'},
    {key: 'second', title: 'E (Môi trường)'},
    {key: 'third', title: 'S (Xã hội)'},
    {key: 'forth', title: 'G (Quản trị)'},
    {key: 'fifth', title: 'Tổng điểm ESG'}
];

const steps = [
    {title: 'Hồ sơ tổ chức', content: 'OrganizationProfileESGForm'},
    {title: 'E (Môi trường)', content: 'EvaluatedForm'},
    {title: 'S (Xã hội)', content: 'EvaluatedForm'},
    {title: 'G (Quản trị)', content: 'EvaluatedForm'},
    {title: 'Tổng điểm ESG', content: 'ResultEvaluated'}
];

</script>

<template>
    <div class="flex gap-10 flex-col py-10">
        <div class="text-center font-bold md:text-2xl lg:text-3xl xl:text-4xl text-xl">CÔNG CỤ ĐÁNH GIÁ ESG</div>

        <div class="md:px-10 lg:px-[50px] xl:px-[200px] px-5 space-y-5">
            <a-steps :current="stepStore.currentStepState" :items="stepItems"/>
            <div class="steps-content">
                <component
                        :is="defineAsyncComponent(() => import(`../components/${steps[stepStore.currentStepState].content}.vue`))"/>
            </div>
        </div>
    </div>
</template>
