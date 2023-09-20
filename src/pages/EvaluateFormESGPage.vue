<script setup>
import {computed, defineAsyncComponent, onMounted} from "vue";
import {useStepStore} from "../stores/useStepStore.js";
import {ModalWarning} from "../components/ModalWarning.js";
import {useRouter} from "vue-router";

const router = useRouter()
const stepStore = useStepStore()

const isAuth = computed(() => {
    const token = localStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
    return !!token
})

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

onMounted(() => {
    const callbackOk = () => router.push('/login')
    const callbackCancel = () => router.push('/')

    if (!isAuth.value) {
        ModalWarning('Bạn chưa đăng nhập', 'Vui lòng đăng nhập để sử dụng tính năng này', 'Đăng nhập', callbackOk, callbackCancel)
    }
})

</script>

<template>
    <div v-if="isAuth" class="flex gap-10 flex-col py-5">
        <div class="result-container">
            <div class="text-center font-bold md:text-xl lg:text-2xl xl:text-3xl text-xs mb-5">
                <div>CÔNG CỤ ĐÁNH GIÁ MỨC ĐỘ THỰC HÀNH KINH DOANH BỀN VỮNG</div>
                <div>CỦA DOANH NGHIỆP THEO KHUNG MÔI TRƯỜNG-XÃ HỘI-QUẢN TRỊ (ESG)</div>
            </div>

            <div class="md:px-10 lg:px-[50px] xl:px-[100px] px-5 space-y-5">
                <a-steps :current="stepStore.currentStepState" :items="stepItems"/>
                <div class="steps-content">
                    <component
                            :is="defineAsyncComponent(() => import(`../components/${steps[stepStore.currentStepState].content}.vue`))"/>
                </div>
            </div>
        </div>

    </div>
</template>
