<script setup>
import { RouterLink } from 'vue-router'
import { defineProps } from 'vue'
import SaveButton from '@/components/SaveButtonComponent.vue'

// Define props using defineProps
const props = defineProps({
  articleprops: {
    type: Object,
    required: false
  },
  fav: {
    type: Boolean,
    required: false
  }
})

// Define the changefav function
function changefav() {
  // To be implemented: edit the favorites of the account using the article's ID and the account's ID
}

// Initialize the variable auteurs with a default value
let auteurs = 'auteur indisponible'

// Update the value of auteurs if props.articleprops.creator exists
if (props.articleprops && props.articleprops.creator) {
  auteurs = props.articleprops.creator.join(', ')
}
</script>

<template>
  <div class="article flou">
    <img :src="articleprops.image_url" :alt="' '" />
    <h2 class="articletitre">{{ articleprops.title || "Titre d'article indisponible" }}</h2>
    <p class="articledate">
      publié le {{ articleprops.date || 'date indisponible' }} <br />
      par
      {{ auteurs }}
    </p>
    <p class="articledesc">{{ articleprops.description || 'description indisponible' }}</p>
    <div class="grpbouton">
      <a class="bouton flou" :href="articleprops.link" target="_blank"
        >Lire l'article <i class="fas fa-external-link-alt"></i
      ></a>
      <SaveButton :alreadySaved="fav" id="savebutton" onclick="changefav()" />
    </div>
  </div>
</template>

<style scoped>
.article {
  display: flex;
  flex-direction: column;
  /* box-shadow: 0px 0px 5px rgb(160, 160, 160); */
  transition: all 0.2s;

  padding: 15px;
}

img {
  display: flex;
  border-radius: var(--border_radius);
  aspect-ratio: 16/9;
  background-image: url('./src/assets/img/notfound.png');
  background-position: center;
  background-size: cover;
  justify-content: center;
}
.articledate {
  color: var(--text_trans);
}

.articletitre {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.articledesc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.grpbouton {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: auto;
}

.grpbouton > a {
  padding: 10px;
}
</style>
