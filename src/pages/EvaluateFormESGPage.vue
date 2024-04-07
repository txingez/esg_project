<script setup>
import { computed, defineAsyncComponent, onMounted, ref, watch } from "vue";
import { useStepStore } from "../stores/useStepStore.js";
import { ModalWarning } from "../components/ModalWarning.js";
import { useRouter } from "vue-router";
import { exportHTMLToPDF } from "../utils/exportHTMLToPDF.js";
import { ENUM } from "../constants/enumValues.js";
import { PrinterOutlined } from "@ant-design/icons-vue";
import { useModalStore } from "../stores/useModalStore.js";
import HistoryAnswersModal from "../components/HistoryAnswersModal.vue";
import { useI18n } from "vue-i18n";

const router = useRouter()
const {t, locale} = useI18n()
const stepStore = useStepStore()
const modalStore = useModalStore()

const screenWidth = ref(0)

const isAuth = computed(() => {
  const token = localStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
  return !!token
})

const stepItems = ref([
  {key: 'first', title: t("esg_form_page.step_1"), disabled: true},
  {key: 'second', title: t("esg_form_page.step_2"), disabled: true},
  {key: 'third', title: t("esg_form_page.step_3"), disabled: true},
  {key: 'forth', title: t("esg_form_page.step_4"), disabled: true},
  {key: 'fifth', title: t("esg_form_page.step_5"), disabled: true}
]);

watch(locale, () => {
  stepItems.value = [
    {key: 'first', title: t("esg_form_page.step_1"), disabled: true},
    {key: 'second', title: t("esg_form_page.step_2"), disabled: true},
    {key: 'third', title: t("esg_form_page.step_3"), disabled: true},
    {key: 'forth', title: t("esg_form_page.step_4"), disabled: true},
    {key: 'fifth', title: t("esg_form_page.step_5"), disabled: true}
  ]
})

const steps = [
  {title: 'Hồ sơ tổ chức', content: 'OrganizationProfileESGForm'},
  {title: 'E (Môi trường)', content: 'EvaluatedForm'},
  {title: 'S (Xã hội)', content: 'EvaluatedForm'},
  {title: 'G (Quản trị)', content: 'EvaluatedForm'},
  {title: 'Tổng điểm ESG', content: 'ResultEvaluated'}
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
  const callbackOk = () => {
    console.log("here")
    localStorage.clear()
    router.push('/login')
  }
  const callbackCancel = () => router.push('/')

  if (!isAuth.value) {
    ModalWarning(
        t("modal.check_login_failed_title"),
        t("modal.check_login_failed_description"),
        t("modal.check_login_failed_btn"), callbackOk, callbackCancel)
  }
})

const openYourAnswers = () => {
  modalStore.openAnswerChosen()
}
</script>

<template>
  <div v-if="isAuth" class="flex gap-10 flex-col py-5">
    <div class="result-container">
      <div class="text-center font-bold md:text-xl lg:text-2xl xl:text-3xl text-base mb-5 text-gray-600">
        <div v-if="screenWidth <= 430">
          <div>{{ $t("esg_form_page.mobile_title_1") }}</div>
          <div>{{ $t("esg_form_page.mobile_title_2") }}</div>
          <div>{{ $t("esg_form_page.mobile_title_3") }}</div>
          <div>{{ $t("esg_form_page.mobile_title_4") }}</div>
        </div>
        <div v-else>
          <div>{{ $t("esg_form_page.title_1") }}</div>
          <div>{{ $t("esg_form_page.title_2") }}</div>
        </div>
      </div>

      <div class="md:px-10 lg:px-[50px] xl:px-[100px] px-5 space-y-5">
        <a-steps :current="stepStore.currentStepState" :items="stepItems"/>
        <div class="steps-content">
          <component
              :is="defineAsyncComponent(() => import(`../components/${steps[stepStore.currentStepState].content}.vue`))"/>
        </div>
      </div>
    </div>

    <div v-if="stepStore.currentStepState === stepItems.length - 1"
         class="md:px-10 lg:px-[50px] xl:px-[100px] px-5 space-y-2.5">
      <div class="text-gray-600">
        {{ $t("form_page.review_question") }}
        <span class="text-blue-500 hover:text-blue-400 hover:cursor-pointer"
              @click.prevent="openYourAnswers">{{ $t("form_page.here") }}</span>.
      </div>
      <a-button class="bg-[#1677ff] h-[50px] w-[150px] flex items-center justify-center"
                type="primary"
                @click.prevent="exportHTMLToPDF(ENUM.FORM_NAME.EvaluateESGForm, 'result-container')">
        <PrinterOutlined/>
        {{ $t("form_page.print_result_btn") }}
      </a-button>
    </div>

    <HistoryAnswersModal/>
  </div>
</template>
