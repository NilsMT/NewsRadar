<script setup>
import { RouterLink } from 'vue-router'
import { defineProps } from 'vue'

defineProps({
  selection: {
    type: String,
    required: true,
    validator: (value) => value == '' || value == 'compte' || value == 'favoris'
  }
})
</script>

<template>
  <header>
    <span class="vide"></span>
    <span class="vide"></span>
    <span class="vide"></span>

    <RouterLink class="page_link_item" to="/" id="head_home">
      <div>
        <img src="/img/logo_newsradar.png" />
        <div>NewsRadar</div>
      </div>
      <span class="hover_bar"></span>
    </RouterLink>

    <span class="vide"></span>

    <div class="page_link_container">
      <RouterLink class="page_link_item" to="/Compte" id="head_compte">
        <i class="fa-solid fa-user"></i>

        <div>Mon compte</div>

        <span class="hover_bar" v-if="selection == 'compte'" selected></span>
        <span class="hover_bar" v-else></span>
      </RouterLink>

      <RouterLink class="page_link_item" to="/Favoris" id="head_favoris">
        <i class="fa-solid fa-newspaper"></i>

        <div>Mes articles</div>

        <span class="hover_bar" v-if="selection == 'favoris'" selected></span>
        <span class="hover_bar" v-else></span>
      </RouterLink>
    </div>
  </header>
</template>

<!-- VVV TT V PP -->

<script></script>

<style scoped>
header {
  background-color: var(--bg);

  display: flex;
  align-items: end;

  padding-top: 10px;

  padding-bottom: 0px;

  width: 100%;

  z-index: 999;
  position: sticky;
  top: 0px;
}

header > * {
  flex: 1;
}

/* title link to home */

#head_home {
  flex: 2;
}

#head_home > div > div {
  font-size: 300%;

  font-family: 'Faster One', system-ui;
  font-weight: 400;
  font-style: normal;
}

#head_home > div > img {
  aspect-ratio: 1 / 1;
  width: 3vw;
}

#head_home > div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
}

/* hover bar */

.hover_bar {
  height: 7px;
  width: 0px;

  transition: width 0.2s ease;

  background-color: var(--text_white);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.hover_bar[selected] {
  width: 100%;
}

.page_link_item:hover > .hover_bar {
  width: 100%;
}

/* page link (right) */
.page_link_container {
  display: flex;
  flex-direction: row;
  gap: var(--padding);

  justify-content: center;
  align-items: center;

  flex: 2;
}

.page_link_item {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
}

.page_link_item > i {
  aspect-ratio: 1 / 1;
  font-size: 40px;
}
</style>
