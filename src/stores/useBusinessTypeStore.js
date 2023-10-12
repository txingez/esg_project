import { defineStore } from "pinia";
import { ref } from "vue";

export const useBusinessTypeStore = defineStore('businessType', () => {
	const businessType = ref('')

	const update = newBusinessType => {
		businessType.value = newBusinessType
	}

	const reset = () => businessType.value = ''

	return {businessType, update, reset}
})
