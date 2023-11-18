import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal', () => {
	const initialState = false

	const prohibitedChemicalsOpen = ref(initialState)
	const rareMaterialsOpen = ref(initialState)
	const answersChosenOpen = ref(initialState)

	const openProhibitedChemicals = () => prohibitedChemicalsOpen.value = true

	const openRareMaterials = () => rareMaterialsOpen.value = true

	const openAnswerChosen = () => answersChosenOpen.value = true

	return {prohibitedChemicalsOpen, rareMaterialsOpen, answersChosenOpen, openProhibitedChemicals, openRareMaterials, openAnswerChosen}
})
