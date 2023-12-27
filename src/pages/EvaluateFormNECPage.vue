<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import { useStepStore } from "../stores/useStepStore.js";
import { ModalWarning } from "../components/ModalWarning.js";
import { useRouter } from "vue-router";
import { exportHTMLToPDF } from "../utils/exportHTMLToPDF.js";
import { ENUM } from "../constants/enumValues.js";
import { PrinterOutlined } from "@ant-design/icons-vue"
import HistoryAnswersModal from "../components/HistoryAnswersModal.vue";
import { useModalStore } from "../stores/useModalStore.js";

const router = useRouter()
const stepStore = useStepStore()
const modalStore = useModalStore()

const isAuth = computed(() => {
	const token = localStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
	return !!token
})

const screenWidth = ref(0)

const stepItems = [
	{key: 'first', title: 'Thông tin doanh nghiệp', disabled: true},
	{key: 'second', title: 'Tầm nhìn của doanh nghiệp', disabled: true},
	{key: 'third', title: 'Sản xuất và tiền sản xuất', disabled: true},
	{key: 'forth', title: 'Sau bán hàng', disabled: true},
	{key: 'fifth', title: 'Kết quả đánh giá', disabled: true}
];

const steps = [
	{title: 'Hồ sơ doanh nghiệp', content: 'OrganizationProfileNECForm'},
	{title: 'Tầm nhìn của doanh nghiệp', content: 'EvaluatedForm'},
	{title: 'Sản xuất và tiền sản xuất', content: 'EvaluatedForm'},
	{title: 'Sau sản xuất', content: 'EvaluatedForm'},
	{title: 'Kết quả và đánh giá', content: 'ResultEvaluated'}
];

const updateScreenWidth = () => {
	screenWidth.value = window.innerWidth;
}
const onScreenResize = () => {
	window.addEventListener("resize", () => {
		updateScreenWidth();
	});
}

onMounted(() => {
	updateScreenWidth()
	onScreenResize()
	if (!isAuth.value) {
		const callbackOk = () => {
			localStorage.clear()
			router.push('/login')
		}
		const callbackCancel = () => router.push('/')
		ModalWarning('Bạn chưa đăng nhập', 'Vui lòng đăng nhập để sử dụng tính năng này', 'Đăng nhập', callbackOk, callbackCancel)
	}
})

const openYourAnswers = () => {
    modalStore.openAnswerChosen()
}
</script>

<template>
    <div v-if="isAuth" class="flex gap-10 flex-col py-5">
        <div class="result-container">
            <div class="text-center font-bold md:text-xl lg:text-2xl xl:text-3xl text-sm mb-5 text-gray-600">
                <div>CÔNG CỤ ĐÁNH GIÁ MỨC ĐỘ THỰC HÀNH</div>
                <div>KINH DOANH BỀN VỮNG CỦA DOANH NGHIỆP THEO NGUYÊN TẮC KINH TẾ TUẦN HOÀN</div>
            </div>

            <div class="md:px-10 lg:px-[50px] xl:px-[100px] px-5 space-y-5">
                <a-steps :current="stepStore.currentStepState"
                         :direction="screenWidth <= 1024 ? 'vertical' : 'horizontal'"
                         :items="stepItems"/>
                <div class="steps-content">
                    <component
                            :is="defineAsyncComponent(() => import(`../components/${steps[stepStore.currentStepState].content}.vue`))"/>
                </div>
            </div>
        </div>

        <div v-if="stepStore.currentStepState === stepItems.length - 1"
             class="md:px-10 lg:px-[50px] xl:px-[100px] px-5 space-y-2.5">
            <div class="text-gray-600">
                Doanh nghiệp có thể xem lại câu trả lời của doanh nghiệp cho từng tiêu chí
                <span class="text-blue-500 hover:text-blue-400 hover:cursor-pointer" @click.prevent="openYourAnswers">tại đây</span>.
            </div>
            <a-button class="bg-[#1677ff] h-[50px] w-[150px] flex items-center justify-center"
                      type="primary"
                      @click.prevent="exportHTMLToPDF(ENUM.FORM_NAME.EvaluateNECForm)">
                <PrinterOutlined/>
                In kết quả
            </a-button>
        </div>

        <HistoryAnswersModal />
    </div>
</template>

<style scoped>
:deep(.ant-steps-item-title) {
    font-size: 14px;
}
</style>
