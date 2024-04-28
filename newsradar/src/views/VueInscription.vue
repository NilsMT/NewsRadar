<script setup>
import HeaderComp from '@/components/HeaderComponent.vue'
import FooterComp from '@/components/FooterComponent.vue'
import AuthComp from '@/components/AuthComponent.vue'
</script>

<template>
  <HeaderComp></HeaderComp>
  <section id="content">
    <AuthComp />
  </section>
  <FooterComp />
</template>
