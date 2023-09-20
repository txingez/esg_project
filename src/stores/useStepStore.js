import {defineStore} from "pinia";
import {ref} from "vue";

export const useStepStore = defineStore('step', () => {
    const currentStepState = ref(4)

    const updateCurrentStep = newValue => currentStepState.value = newValue

    const reset = () => currentStepState.value = 4

    return {currentStepState, updateCurrentStep, reset}
})
