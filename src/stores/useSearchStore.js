import {defineStore} from "pinia";
import {ref} from "vue";

export const useSearchStore = defineStore('searchStore', () => {
    const searchValue = ref('')

    const update = newSearchValue => searchValue.value = newSearchValue

    return {searchValue, update}
})
