<script setup>
import HeaderComp from '@/components/HeaderComponent.vue'
import FooterComp from '@/components/FooterComponent.vue'

import LimitNews from '@/components/LimitSearchNewsComponent.vue'
import LimitPlaces from '@/components/LimitSearchPlaceComponent.vue'

import { onMounted, ref } from 'vue'
import * as expressHandler from '../../utils/expressHandler.js'

import { inject } from 'vue'
const router = inject('router')

var map = {}

const limitNews = ref(10)
const limitPlace = ref(125)

const email = localStorage.getItem('userEmail')

async function updateLimits() {
  let lmN = 0
  let lmP = 0

  if (expressHandler.isLoggedIn() == true) {
    const email = localStorage.getItem('userEmail')

    const res1 = await expressHandler.getNewsLimit(email)
    console.log(res1.limite)
    if (res1.code === 200) {
      lmN = res1.limite
    }

    const res2 = await expressHandler.getPlaceLimit(email)
    console.log(res2.limite)
    if (res2.code === 200) {
      lmP = res2.limite
    }
  } else {
    lmN = 0
    lmP = 0
  }

  console.log('limites trouver et assigner : News ' + lmN + ' Place ' + lmP)

  limitPlace.value = lmP
  limitNews.value = lmN

  localStorage.setItem('userNewsLimit', lmN)

  console.log('news ' + limitNews.value + ' place ' + limitPlace.value)
}

function displayErrorMSG(msg) {
  const resultsList = document.getElementById('searchResult')
  resultsList.innerHTML = ''
  resultsList.textContent = msg

  resultsList.style.display = 'flex'
  resultsList.setAttribute('type', 'error')
  resultsList.classList.add('msg')
}

// Load la map
onMounted(() => {
  localStorage.setItem('isRefreshing', 'false')

  // Load script map (créer une balise script)
  const leafletScript = document.createElement('script')
  // leafletScript.src = 'https://unpkg.com/leaflet/dist/leaflet.js'  ancien script qui marche pas
  leafletScript.src = '../../utils/leaflet/leaflet.js' // remplacement

  leafletScript.onload = () => {
    console.log('Leaflet loaded')

    // Init leaflet
    map = L.map('map').setView([0, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      className: 'map-tiles'
    }).addTo(map)
  }

  document.head.appendChild(leafletScript)

  //barre entré
  document.getElementById('searchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      // Avoid the default behavior
      event.preventDefault()

      handleSearch()
    }
  })
  //update limits
  updateLimits()
})

//la redirection news
async function handleNewsRedirection(country) {
  let nlm = limitNews.value - 1

  await expressHandler.setNewsLimit(email, nlm)

  localStorage.setItem('userNewsLimit', nlm)
  updateLimits()

  router.push('/ResultatRecherche?country=' + encodeURIComponent(JSON.stringify(country)))
}

//la recherche OpenCage
async function handleSearch() {
  const query = document.getElementById('searchInput').value

  if (expressHandler.isLoggedIn() == true) {
    const res = await expressHandler.getPlaceLimit(email)

    if (res.code == 200) {
      const lm = res.limite

      if (lm > 0) {
        let resP = await expressHandler.getPlaces(email, query)

        if (resP.code == 200) {
          const results = resP.data

          console.log(resP)

          displayResultsList(results)
          displayMarkers(results)
        } else {
          displayErrorMSG(resP.message)
        }
      } else {
        displayErrorMSG('Limite de recherche de lieu quotidienne atteinte, revenez demain :)')
      }
    } else {
      displayErrorMSG(res.message)
    }

    updateLimits()
  } else {
    //display err msg
    router.push('/Connexion')
  }
}

//affiche les résultat OpenCage ==> liste
function displayResultsList(results) {
  const resultsList = document.getElementById('searchResult')

  resultsList.classList.remove('msg')
  resultsList.innerHTML = '' // Clear previous result

  results.forEach(function (result, index) {
    const item = document.createElement('div')
    item.className = 'result-item bouton'
    item.textContent = result.adress

    item.onclick = function () {
      var lat = result.latitude
      var lng = result.longitude

      // Get the index of the clicked result item ==> to get json
      var clickedIndex = Array.from(item.parentNode.children).indexOf(item)

      // After zooming to the marker, confirmation dialog
      setTimeout(function () {
        var json = results[clickedIndex]
        var confirmSelection = confirm('Voulez-vous sélectionner cet endroit ?')
        if (confirmSelection) {
          // Redirect to search result page + pass json as param
          if (json.city != null && json.city != undefined) {
            handleNewsRedirection(json)
          } else {
            handleNewsRedirection(json)
          }
        }
      }, 500)

      map.setView([lat, lng], 12)
    }

    resultsList.appendChild(item)
    resultsList.style.display = 'flex'
  })
}

//affiche les markers ==> map
function displayMarkers(results) {
  results.forEach(function (result) {
    var lat = result.latitude
    var lng = result.longitude
    L.marker([lat, lng]).addTo(map).bindPopup(result.adress).openPopup()
  })
}
</script>

<template>
  <link rel="stylesheet" href="../../utils/leaflet/leaflet.css" />
  <HeaderComp></HeaderComp>
  <section id="content">
    <div id="searchZone">
      <div id="overlay">
        <div id="searchContent">
          <div id="searchBar">
            <input
              id="searchInput"
              type="text"
              class="flou"
              placeholder="Rechercher un pays, une ville, une adresse..."
            />
            <div v-on:click="handleSearch()" class="flou bouton">
              Rechercher <i class="fas fa-search"></i>
            </div>
          </div>
          <div id="searchResult" class="flou"></div>
        </div>
        <LimitPlaces :count="limitPlace"></LimitPlaces>
        <LimitNews :count="limitNews"></LimitNews>
      </div>
      <div id="map"></div>
    </div>
  </section>
  <FooterComp></FooterComp>
</template>

<style scoped>
#content {
  height: 88vh;
  position: relative;
}
/* overlaying */
#map {
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  width: 100%;
  z-index: 1;
}

#overlay {
  position: absolute;
  top: 0;
  left: 0;

  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;

  gap: var(--gap);
  padding: var(--padding);
}

/* search bar style */

#searchContent {
  gap: var(--gap);
  display: flex;
  flex-direction: column;
}

#searchBar {
  display: flex;
  flex-direction: row;
  gap: var(--gap);
}

#searchBar > *,
#searchResult {
  text-align: left;
}

#searchBar > * {
  padding: 10px;
}

#searchResult {
  display: none;
  flex-direction: column;
  justify-content: left;

  max-height: 270px;
  overflow-y: scroll;

  width: 400px;

  border-radius: var(--border_radius) 0 0 var(--border_radius);
}
</style>

<!-- /////////////////// Dark mode de la carte-->
<style>
.map-tiles {
  filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
}

#map {
  background: #303030;
}

.leaflet-control {
  display: none;
}

/* txt of marker desc */
.leaflet-popup * {
  color: var(--text_black);
}
</style>
