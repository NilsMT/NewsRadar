<template>
  <button class="saveButton bouton flou" v-on:click="handleClick" v-if="dynamicSaved">
    <span>Article sauvegardé</span>
    <i class="fa-solid fa-bookmark"></i>
  </button>

  <button class="saveButton bouton flou" v-on:click="handleClick" v-else>
    <span>Sauvegarder l'article</span>
    <i class="fa-regular fa-bookmark"></i>
  </button>
</template>

<script setup>
import { ref, defineProps, toRefs } from 'vue'

const props = defineProps({
  alreadySaved: {
    type: Boolean,
    required: true
  }
})

//solution au scotch pour faire la dynamicité, la props change JAMAIS, elle initialise juste saved
const { alreadySaved } = toRefs(props)
const dynamicSaved = ref(alreadySaved.value)

function handleClick() {
  dynamicSaved.value = !dynamicSaved.value

  // Retire/Ajoute article à la BD
  console.log(dynamicSaved.value)
}
</script>

<style scoped>
.saveButton {
  padding: 10px;

  display: flex;
  flex-direction: row;
  gap: var(--gap);
}
</style>
