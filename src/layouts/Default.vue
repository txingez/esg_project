<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
    <a-layout class="bg-white xl:text-lg md:text-base text-sm">
        <Header/>
        <router-view/>
        <Footer/>
    </a-layout>
</template>
