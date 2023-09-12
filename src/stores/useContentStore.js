import {defineStore} from "pinia";
import {reactive} from "vue";

export const useContentStore = defineStore('content', () => {
    const state = reactive({
        pageId: 'lib',
        title: null,
        content: null,
        image: '',
        source: '',
        releaseDate: ''
    })

    const update = newState => Object.assign(state, newState)

    return {state, update}
})
