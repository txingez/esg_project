<script setup>
import { RouterView } from 'vue-router'
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";

const {locale} = useI18n()

onMounted(() => {
  const userLocale = localStorage.getItem("user_locale")
  if (userLocale) {
    locale.value = userLocale
  }
})
</script>

<template>
    <RouterView/>
</template>
