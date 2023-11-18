<script setup>
import { useEvaluatedFormStore } from "../stores/useEvaluatedFormStore.js";
import { EnvironmentQuestions } from "../constants/environmentQuestions.js";
import { computed, ref } from "vue";
import { SocialQuestions } from "../constants/socialQuestions.js";
import { GovernanceQuestions } from "../constants/governanceQuestions.js";
import Vue3Html2pdf from 'vue3-html2pdf'
import { PrinterOutlined } from "@ant-design/icons-vue";
import { OPTIONS } from "../constants/options.js";

const evaluatedFormStore = useEvaluatedFormStore()
const environmentAnswers = computed(() => {
	return EnvironmentQuestions.map(questionObj => {
		const answerObj = getAnswerObj(questionObj)
		return {
			key: questionObj.key,
			question: questionObj.question,
			answer: `${answerObj.key} - ${answerObj.answer}`
		}
	})
})

const socialAnswers = computed(() => {
	return SocialQuestions.map(questionObj => {
		const answerObj = getAnswerObj(questionObj)
		return {
			key: questionObj.key,
			question: questionObj.question,
			answer: `${answerObj.key} - ${answerObj.answer}`
		}
	})
})

const governanceAnswers = computed(() => {
	return GovernanceQuestions.map(questionObj => {
		const answerObj = getAnswerObj(questionObj)
		return {
			key: questionObj.key,
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
            :preview-modal="false"
            :pdf-quality="2"
            :manual-pagination="true"
            pdf-content-width="100%"
            :html-to-pdf-options="OPTIONS.OPTION_JS_PDF"
            ref="html2Pdf">
        <template v-slot:pdf-content>
            <div class="py-5">
                <div class="font-bold">1. Nhóm tiêu chí về Môi trường</div>
                <div v-for="environmentObject in environmentAnswers">
                    <div>
                        <span class="font-semibold">Câu {{ environmentObject.key }}</span>:
                        {{ environmentObject.question }}
                    </div>
                    <div>{{ environmentObject.answer }}</div>
                </div>
                <div class="html2pdf__page-break"/>
                <div class="font-bold">2. Nhóm tiêu chí về Xã hội</div>
                <div v-for="socialObject in socialAnswers">
                    <div>
                        <span class="font-semibold">Câu {{ socialObject.key }}</span>: {{ socialObject.question }}
                    </div>
                    <div>{{ socialObject.answer }}</div>
                </div>
                <div class="html2pdf__page-break"/>
                <div class="font-bold">3. Nhóm tiêu chí về Quản trị</div>
                <div v-for="governanceObject in governanceAnswers">
                    <div>
                        <span class="font-semibold">Câu {{ governanceObject.key }}</span>: {{
                        governanceObject.question
                        }}
                    </div>
                    <div>{{ governanceObject.answer }}</div>
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
