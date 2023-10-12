import { defineStore } from "pinia";
import { ref } from "vue";

export const useStepStore = defineStore('step', () => {
	const currentStepState = ref(0)

	const updateCurrentStep = newValue => currentStepState.value = newValue

	const reset = () => currentStepState.value = 0

	return {currentStepState, updateCurrentStep, reset}
})
