<script setup>
import HeaderComp from '@/components/HeaderComponent.vue'
import FooterComp from '@/components/FooterComponent.vue'
import ArticleComp from '@/components/ArticleComponent.vue'
import LimitNews from '@/components/LimitSearchNewsComponent.vue'
import { onMounted, ref } from 'vue'

import axios from 'axios'
import { inject } from 'vue'
const router = inject('router')

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const country = JSON.parse(urlParams.get('country'))

const arts = ref([])
const MSG = ref('')

const limitNews = ref(0)

async function fetchData() {
  try {
    const res = await axios.get(
      `http://localhost:3000/externalAPI/NewsByCountry/${country.country_code}/${country.city ? country.city : ''}`
    )
    return res.data.news
  } catch (error) {
    console.error('Error fetching data:', error)

    return []
  }
}

function displayMSG(msg, error) {
  MSG.value = msg
  if (error == true) {
    document.getElementById('msg').setAttribute('type', 'error')
  } else {
    document.getElementById('msg').setAttribute('type', 'ok')
  }
}

// prevent refreshing

window.addEventListener('beforeunload', function (event) {
  localStorage.setItem('isRefreshing', 'true')
})

function handleLeavePage() {
  localStorage.setItem('isRefreshing', 'false')
}

const allLinks = document.querySelectorAll('a')

allLinks.forEach((link) => {
  link.addEventListener('click', function (event) {
    handleLeavePage()
  })
})

if (localStorage.getItem('isRefreshing') === 'true') {
  router.push('/')
}

onMounted(async () => {
  let v = localStorage.getItem('userNewsLimit')
  limitNews.value = Number(v)

  let lst = []

  if (limitNews.value > 0) {
    lst = await fetchData()
  } else {
    displayMSG("Limite de recherche d'article quotidienne atteinte, revenez demain :)", true)
  }

  if (lst == []) {
    displayMSG('Aucun article trouvé pour ce lieu', true)
  } else {
    arts.value = lst
  }
})
</script>

<template>
  <HeaderComp selection=""></HeaderComp>
  <section id="content">
    <div class="msg" id="msg">
      {{ MSG }}
    </div>
    <LimitNews :count="limitNews"></LimitNews>
    <p class="flou" id="warn">Rafraichir la page vous redirigera vers l'accueil</p>
    <p class="flou">Les résultats peuvent être dédoublés</p>
    <div id="news_container">
      <ArticleComp v-for="(art, index) in arts" :key="index" :articleprops="art" :fav="false" />
    </div>
  </section>
  <FooterComp />
</template>

<style scoped>
#content {
  width: 100vw;
  padding-left: 0;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: var(--gap);
}

#warn {
  background-color: var(--search_4);
}

#news_container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  gap: var(--gap);
}

#news_container > * {
  width: 28vw;

  align-self: stretch;
  align-content: center;
}
</style>
