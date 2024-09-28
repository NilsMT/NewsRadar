<script setup>
import { RouterLink } from 'vue-router'

import { ref } from 'vue'
import LimitNews from '@/components/LimitSearchNewsComponent.vue'
import LimitPlaces from '@/components/LimitSearchPlaceComponent.vue'

const a = ref(10)
const b = ref(125)

function dos() {
  a.value--
  b.value--
}
</script>

<template>
  <section id="content">
    <h1 class="flou">Navigation temporaire Search</h1>

    <div class="section_test flou" id="nav_temporaire">
      <RouterLink class="flou" to="/Comp">Composants</RouterLink>
      <RouterLink class="flou" to="/Compte">Compte</RouterLink>
      <RouterLink class="flou" to="/Inscription">Inscription</RouterLink>
      <RouterLink class="flou" to="/Connexion">Connexion</RouterLink>
      <RouterLink class="flou" to="/ResultatRecherche">Resultat de Recherche</RouterLink>
      <RouterLink class="flou" to="/Favoris">Favoris (Mes articles)</RouterLink>
      <RouterLink class="flou" to="/404">Erreur 404</RouterLink>
      <RouterLink class="flou" to="/">Accueil</RouterLink>
    </div>
    <div>
      <LimitNews :count="a" />
      <LimitPlaces :count="b" />

      <button v-on:click="dos">slfjkw</button>
    </div>
  </section>
</template>

<style scoped>
#content {
  padding: 50px; /* tout sauf top */

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--padding);
}

#content > * {
  width: fit-content;
}

.section_test {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: var(--gap);
}

/* style spécifique à une section */

#nav_temporaire > * {
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

#nav_temporaire > *:hover {
  transform: scale(1.1);
  background-color: var(--text_trans);
  color: var(--text_black);
}
</style>
