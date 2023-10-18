<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
    <a-layout class="bg-[#F4F4F4] lg:text-sm text-xs">
        <Header/>
        <router-view/>
        <Footer/>
    </a-layout>
</template>
