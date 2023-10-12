import { defineStore } from "pinia";
import { reactive } from "vue";

export const useEvaluatedFormStore = defineStore('evaluatedForm', () => {
	const evaluatedFormState = reactive({})

	const update = (key, newValue) => evaluatedFormState[key] = newValue

	const reset = () => Object.assign(evaluatedFormState, {});

	return {evaluatedFormState, update, reset}
})
