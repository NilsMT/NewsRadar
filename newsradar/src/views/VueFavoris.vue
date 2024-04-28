<script setup>
import HeaderComp from '@/components/HeaderComponent.vue'
import FooterComp from '@/components/FooterComponent.vue'
import ArticleComp from '@/components/ArticleComponent.vue'
import { ref } from 'vue'
import axios from 'axios'

const arts = ref([])

const fetchData = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/externalAPI/NewsByCountry/fr/Nantes`)
    arts.value = res.data.news
    console.log(arts.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

fetchData()
</script>

<template>
  <HeaderComp selection="favoris"></HeaderComp>
  <section id="content">
    <ArticleComp v-for="(art, index) in arts" :key="index" :articleprops="art" :fav="true" />
  </section>
  <FooterComp />
</template>

<style scoped>
#content {
  width: 100vw;
  padding-left: 0;
  padding-right: 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#content > * {
  width: 35vw;

  align-self: stretch;
  align-content: center;
}
</style>
