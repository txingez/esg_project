<script setup>
import { useBusinessTypeStore } from "../stores/useBusinessTypeStore.js";
import { useStepStore } from "../stores/useStepStore.js";
import { useEvaluatedFormStore } from "../stores/useEvaluatedFormStore.js";
import { useEvaluatedResultStore } from "../stores/useEvaluatedResultStore.js";
import { MaxPoint } from "../constants/maxPoint.js";
import { computed, ref } from "vue";
import { EnvironmentQuestions } from "../constants/environmentQuestions.js";
import { SocialQuestions } from "../constants/socialQuestions.js";
import { GovernanceQuestions } from "../constants/governanceQuestions.js";
import { useRouter } from "vue-router";
import { FirstCriteria } from "../constants/firstCriteria.js";
import { SecondCriteria } from "../constants/secondCriteria.js";
import { ThirdCriteria } from "../constants/thirdCriteria.js";
import { useModalStore } from "../stores/useModalStore.js";
import ProhibitedChemicalsModal from "./ProhibitedChemicalsModal.vue";
import RareMaterialsModal from "./RareMaterialsModal.vue";
import { useProfileESGStore } from "../stores/useProfileESGStore.js";
import { useProfileNECStore } from "../stores/useProfileNECStore.js";
import { saveResult } from "../services/evaluatedForm.js";
import { ENUM } from "../constants/enumValues.js";
import { ModalWarning } from "./ModalWarning.js";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";

const businessTypeStore = useBusinessTypeStore()
const stepStore = useStepStore()
const evaluatedFormStore = useEvaluatedFormStore()
const evaluatedResultStore = useEvaluatedResultStore()
const profileESGStore = useProfileESGStore()
const profileNECStore = useProfileNECStore()
const modalStore = useModalStore()
const router = useRouter()
const routeName = router.currentRoute.value.name

const loading = ref(false)

const questions = computed(() => {
	return (() => {
		switch (true) {
			case (routeName === ENUM.FORM_NAME.EvaluateESGForm && stepStore.currentStepState === 1):
				return EnvironmentQuestions
			case (routeName === ENUM.FORM_NAME.EvaluateESGForm && stepStore.currentStepState === 2):
				return SocialQuestions
			case (routeName === ENUM.FORM_NAME.EvaluateESGForm && stepStore.currentStepState === 3):
				return GovernanceQuestions
			case (routeName === ENUM.FORM_NAME.EvaluateNECForm && stepStore.currentStepState === 1):
				return FirstCriteria
			case(routeName === ENUM.FORM_NAME.EvaluateNECForm && stepStore.currentStepState === 2):
				return SecondCriteria
			case(routeName === ENUM.FORM_NAME.EvaluateNECForm && stepStore.currentStepState === 3):
				return ThirdCriteria
			default:
				return []
		}
	})()
})
// const finalQuestions = businessTypeStore.businessType === 'Doanh nghiệp niêm yết' ? questions.value : questions.value.filter(q => q.forListingCompany === undefined || !q.forListingCompany)
const finalQuestions = questions.value
const questionKeys = finalQuestions.map(q => q.key)

const rules = [{required: true, message: 'Hãy chọn 1 đáp án'}]
const mapStepAndName = {
	EvaluateESGForm: {
		1: 'environment',
		2: 'social',
		3: 'governance'
	},
	EvaluateNECForm: {
		1: 'firstCriteria',
		2: 'secondCriteria',
		3: 'thirdCriteria'
	}
}

const previousStep = () => {
	let currentStep = stepStore.currentStepState
	stepStore.updateCurrentStep(--currentStep)
}

const handleChooseAnswer = (answerValue, questionKey) => {
	evaluatedFormStore.update(questionKey, answerValue)
}

const finishEvaluated = async () => {
	loading.value = true
	let currentStep = stepStore.currentStepState

	const resultPoint = questionKeys.reduce((accumulator, currentQuestionKey) => {
		const answer = evaluatedFormStore.evaluatedFormState[currentQuestionKey]
		const answerSplit = answer.split('-')
		const point = answerSplit[1]
		const maxPoint = MaxPoint[currentQuestionKey]
		if (point !== 'N/A') {
			accumulator.sum += Number(point)
			accumulator.max += maxPoint
			accumulator.point = ((accumulator.sum / accumulator.max) * 100).toFixed(2)
		}
		return accumulator
	}, {max: 0, sum: 0, point: 0})
	evaluatedResultStore.update(mapStepAndName[routeName][currentStep], resultPoint)

	if (currentStep === 3) {
		const body = {
			user_id: localStorage.getItem(import.meta.env.ENV_USER_ID_KEY),
			form_id: formId(),
			data: {
				organizationProfile: getProfile(),
				answers: Object.keys(evaluatedFormStore.evaluatedFormState).map(k => {
					return {question: k, answer: evaluatedFormStore.evaluatedFormState[k].split('-')[0]}
				}),
				result: {
					...(routeName === ENUM.FORM_NAME.EvaluateESGForm && {
						environment: {
							point: evaluatedResultStore.resultPoint.environment.point,
							distribution: evaluatedResultStore.getIndustryWeighting().E
						},
						social: {
							point: evaluatedResultStore.resultPoint.social.point,
							distribution: evaluatedResultStore.getIndustryWeighting().S
						},
						governance: {
							point: evaluatedResultStore.resultPoint.governance.point,
							distribution: evaluatedResultStore.getIndustryWeighting().G
						},
						total: evaluatedResultStore.getSummaryESG(),
						rate: evaluatedResultStore.getRateInfoESG().rate
					}),
					...(routeName === ENUM.FORM_NAME.EvaluateNECForm && {
						first_criteria: {
							max: evaluatedResultStore.resultPoint.firstCriteria.max,
							sum: evaluatedResultStore.resultPoint.firstCriteria.sum,
							point: evaluatedResultStore.resultPoint.firstCriteria.point
						},
						second_criteria: {
							max: evaluatedResultStore.resultPoint.secondCriteria.max,
							sum: evaluatedResultStore.resultPoint.secondCriteria.sum,
							point: evaluatedResultStore.resultPoint.secondCriteria.point
						},
						third_criteria: {
							max: evaluatedResultStore.resultPoint.thirdCriteria.max,
							sum: evaluatedResultStore.resultPoint.thirdCriteria.sum,
							point: evaluatedResultStore.resultPoint.thirdCriteria.point
						},
						total: evaluatedResultStore.getSummaryNEC(),
						rate: evaluatedResultStore.getRateInfoNEC().rate
					})
				}
			}
		}

		saveResult(body).then((res) => {
			console.log(res)
			loading.value = false
		}).catch((err) => {
			console.log(err)
			loading.value = false
			const callback = () => {
				router.push('/login')
			}
			ModalWarning('Hết phiên đăng nhập', 'Phiên đăng nhập của bạn đã hết, vui lòng đăng nhập lại', 'Đăng nhập', callback)
		})
	}

	loading.value = false
	stepStore.updateCurrentStep(++currentStep)
}

const formId = () => {
	switch (routeName) {
		case ENUM.FORM_NAME.EvaluateESGForm:
			return 'ESG'
		case ENUM.FORM_NAME.EvaluateNECForm:
			return 'NEC'
		default:
			return 'other'
	}
}

const getProfile = () => {
	switch (routeName) {
		case ENUM.FORM_NAME.EvaluateESGForm:
			return profileESGStore.formData
		case ENUM.FORM_NAME.EvaluateNECForm:
			return profileNECStore.formData
	}
}

const openAppendix3 = () => {
	modalStore.openProhibitedChemicals()
}

const openAppendix4 = () => {
	modalStore.openRareMaterials()
}
</script>

<template>
    <div v-if="routeName === ENUM.FORM_NAME.EvaluateNECForm && stepStore.currentStepState === 2"
         class="text-right space-x-2.5 mb-2.5">
        <a-button @click="openAppendix3">Phụ lục 3</a-button>
        <a-button @click="openAppendix4">Phụ lục 4</a-button>
    </div>
    <a-form v-model:model="evaluatedFormStore.evaluatedFormState"
            :colon="false"
            :labelWrap="true"
            label-align="left"
            layout="vertical"
            @finish="finishEvaluated">
        <a-form-item v-for="(question, index) in finalQuestions"
                     :key="question.key"
                     :name="question.key"
                     :rules="rules">
            <template #label>
                <div class="flex justify-center items-center gap-1 text-lg">
                    <span>{{ `Câu ${question.label}: ${question.question}` }}</span>
                    <a-tooltip v-if="question.tooltip">
                        <template #title>
                            <span>{{ question.tooltip }}</span>
                        </template>
                        <QuestionCircleOutlined/>
                    </a-tooltip>
                </div>
            </template>
            <a-select v-model:value="evaluatedFormStore.evaluatedFormState[question.key]"
                      placeholder="Hãy chọn 1 đáp án"
                      size="large"
                      @change="e => handleChooseAnswer(e, question.key)">
                <a-select-option v-for="answer in question.answers" :key="answer.key"
                                 :value="`${answer.key}-${answer.point}`">
                    {{ `${answer.key}. ${answer.answer}` }}
                </a-select-option>
            </a-select>
        </a-form-item>

        <div class="flex gap-5">
            <a-form-item v-if="stepStore.currentStepState === 2 || stepStore.currentStepState === 3">
                <a-button class="min-h-[50px]" @click.prevent="previousStep">Trở lại</a-button>
            </a-form-item>
            <a-form-item>
                <a-button :loading="loading" class="bg-[#1677ff] min-h-[50px]" html-type="submit" type="primary">
                    {{
                    stepStore.currentStepState === 1 || stepStore.currentStepState === 2 ? 'Đánh giá tiếp' : 'Hoàn thành'
                    }}
                </a-button>
            </a-form-item>
        </div>
    </a-form>

    <ProhibitedChemicalsModal/>
    <RareMaterialsModal/>
</template>

<style scoped>
:deep(label.ant-form-item-no-colon) {
    height: fit-content;
}
</style>
