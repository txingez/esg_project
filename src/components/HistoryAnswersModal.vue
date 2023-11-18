<script setup>
import { useModalStore } from "../stores/useModalStore.js";
import { useRouter } from "vue-router";
import YourESGAnswers from "./YourESGAnswers.vue";
import { ENUM } from "../constants/enumValues.js";
import YourNECAnswers from "./YourNECAnswers.vue";

const modalStore = useModalStore()
const router = useRouter()
const routeName = router.currentRoute.value.name

</script>

<template>
    <a-modal v-model:open="modalStore.answersChosenOpen"
             :footer="null"
             style="top: 20px; width: 95%"
             title="CÂU TRẢ LỜI CỦA BẠN">
        <YourESGAnswers v-if="routeName === ENUM.FORM_NAME.EvaluateESGForm"/>
        <YourNECAnswers v-else-if="routeName === ENUM.FORM_NAME.EvaluateNECForm"/>
    </a-modal>
</template>
