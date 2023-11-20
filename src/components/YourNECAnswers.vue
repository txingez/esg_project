<script setup>
import { useEvaluatedFormStore } from "../stores/useEvaluatedFormStore.js";
import { computed, ref } from "vue";
import Vue3Html2pdf from 'vue3-html2pdf'
import { PrinterOutlined } from "@ant-design/icons-vue";
import { OPTIONS } from "../constants/options.js";
import { FirstCriteria } from "../constants/firstCriteria.js";
import { ThirdCriteria } from "../constants/thirdCriteria.js";
import { SecondCriteria } from "../constants/secondCriteria.js";

const evaluatedFormStore = useEvaluatedFormStore()
const firstCriteriaAnswers = computed(() => {
  return FirstCriteria.map(questionObj => {
    const answerObj = getAnswerObj(questionObj)
    return {
      key: questionObj.key,
      label: questionObj.label,
      question: questionObj.question,
      answer: `${answerObj.key} - ${answerObj.answer}`
    }
  })
})

const secondCriteriaAnswers = computed(() => {
  return SecondCriteria.map(questionObj => {
    const answerObj = getAnswerObj(questionObj)
    return {
      key: questionObj.key,
      label: questionObj.label,
      question: questionObj.question,
      answer: `${answerObj.key} - ${answerObj.answer}`
    }
  })
})

const thirdCriteriaAnswers = computed(() => {
  return ThirdCriteria.map(questionObj => {
    const answerObj = getAnswerObj(questionObj)
    return {
      key: questionObj.key,
      label: questionObj.label,
      question: questionObj.question,
      answer: `${answerObj.key} - ${answerObj.answer}`
    }
  })
})

const getAnswerObj = (questionObject) => {
  return questionObject.answers.find(a => a.key === evaluatedFormStore.evaluatedFormState[questionObject.key].split('-')[0])
}

const html2Pdf = ref(null)
const generateReport = () => {
  html2Pdf.value.generatePdf()
}
</script>

<template>
  <vue3-html2pdf
      :show-layout="true"
      :float-layout="false"
      :enable-download="true"
      :preview-modal="true"
      :pdf-quality="2"
      :manual-pagination="true"
      pdf-content-width="100%"
      :html-to-pdf-options="{...OPTIONS.OPTION_JS_PDF, ...{jsPDF: {unit: 'px', format: [1300, 1000], orientation: 'p'}}}"
      ref="html2Pdf">
    <template v-slot:pdf-content>
      <div class="py-5">
        <div class="font-bold">
          1. Nhóm câu hỏi về tầm nhìn và chiến lược áp dụng nguyên tắc Kinh tế tuần hoàn (KTTH) của doanh nghiệp
        </div>
        <div v-for="firstCriteriaQuestionObject in firstCriteriaAnswers">
          <div>
            <span class="font-semibold">Câu {{ firstCriteriaQuestionObject.label }}</span>:
            {{ firstCriteriaQuestionObject.question }}
          </div>
          <div>{{ firstCriteriaQuestionObject.answer }}</div>
        </div>
        <div class="html2pdf__page-break"/>
        <div class="font-bold">2. Nhóm câu hỏi về áp dụng nguyên tắc KTTH trong sản xuất và tiền sản xuất</div>
        <div v-for="secondCriteriaQuestionObject in secondCriteriaAnswers">
          <div>
            <span class="font-semibold">Câu {{ secondCriteriaQuestionObject.label }}</span>:
            {{ secondCriteriaQuestionObject.question }}
          </div>
          <div>{{ secondCriteriaQuestionObject.answer }}</div>
        </div>
        <div class="html2pdf__page-break"/>
        <div class="font-bold">3. Nhóm câu hỏi về áp dụng nguyên tắc KTTH trong công đoạn sau bán hàng</div>
        <div v-for="thirdCriteriaQuestionObject in thirdCriteriaAnswers">
          <div>
            <span class="font-semibold">Câu {{ thirdCriteriaQuestionObject.label }}</span>:
            {{ thirdCriteriaQuestionObject.question }}
          </div>
          <div>{{ thirdCriteriaQuestionObject.answer }}</div>
        </div>
      </div>
    </template>
  </vue3-html2pdf>
  <a-button class="bg-[#1677ff] h-[50px] w-[120px] flex items-center justify-center"
            type="primary"
            @click.prevent="generateReport">
    <PrinterOutlined/>
    In đáp án
  </a-button>
</template>
