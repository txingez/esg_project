import {defineStore} from "pinia";
import {ref} from "vue";

export const useSearchStore = defineStore('searchStore', () => {
    const searchValue = ref('')

    const update = newSearchValue => searchValue.value = newSearchValue

    const reset = () => searchValue.value = ''

    return {searchValue, update, reset}
})
