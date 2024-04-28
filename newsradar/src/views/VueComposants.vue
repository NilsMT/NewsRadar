<script setup>
import LimitSearchNews from '@/components/LimitSearchNewsComponent.vue'
import LimitSearchPlace from '@/components/LimitSearchPlaceComponent.vue'
import HeaderComp from '@/components/HeaderComponent.vue'
import SaveButton from '@/components/SaveButtonComponent.vue'
import FooterComp from '@/components/FooterComponent.vue'
import AuthComp from '@/components/AuthComponent.vue'
import ArticleComp from '@/components/ArticleComponent.vue'
</script>

<template>
  <section id="content">
    <h1 class="titre_comp">HeaderComp</h1>

    <div class="content_comp" id="head_foot_comp">
      <HeaderComp selection="" />
      <HeaderComp selection="favoris" />
      <HeaderComp selection="compte" />
    </div>

    <h1 class="titre_comp">LimitSearchNews</h1>

    <div class="flou content_comp">
      <LimitSearchNews :count="0" />
      <LimitSearchNews :count="1" />
      <LimitSearchNews :count="2" />
      <LimitSearchNews :count="3" />
      <LimitSearchNews :count="4" />
      <LimitSearchNews :count="5" />
      <LimitSearchNews :count="6" />
      <LimitSearchNews :count="7" />
      <LimitSearchNews :count="8" />
      <LimitSearchNews :count="9" />
      <LimitSearchNews :count="10" />
    </div>

    <h1 class="titre_comp">LimitSearchPlace</h1>

    <div class="flou content_comp">
      <LimitSearchPlace :count="0" />
      <LimitSearchPlace :count="12" />
      <LimitSearchPlace :count="25" />
      <LimitSearchPlace :count="37" />
      <LimitSearchPlace :count="50" />
      <LimitSearchPlace :count="62" />
      <LimitSearchPlace :count="75" />
      <LimitSearchPlace :count="87" />
      <LimitSearchPlace :count="100" />
      <LimitSearchPlace :count="112" />
      <LimitSearchPlace :count="125" />
    </div>

    <h1 class="titre_comp">SaveButton</h1>

    <div class="flou content_comp">
      <SaveButton :alreadySaved="false" />
      <SaveButton :alreadySaved="true" />
    </div>

    <h1 class="titre_comp">Article</h1>

    <div style="display: flex; width: calc(38%)">
      <ArticleComp articleprops=""></ArticleComp>
    </div>

    <h1 class="titre_comp">Formulaire d'inscription</h1>

    <AuthComp />

    <h1 class="titre_comp">Formulaire de connexion</h1>

    <AuthComp selection="connexion" />

    <h1 class="titre_comp">footer</h1>

    <FooterComp />
  </section>
</template>

<style scoped>
#content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content_comp {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: var(--gap);

  border-radius: 10px;
}

.titre_comp {
  font-size: 300%;

  font-family: 'Faster One', system-ui;
  font-weight: 400;
  font-style: normal;

  margin-top: 50px;
  margin-bottom: 50px;

  padding: var(--padding);
  backdrop-filter: blur(var(--background_blur));
  border-radius: var(--border_radius);
  background-color: var(--bg_trans);

  width: fit-content;

  border: 5px var(--text_white) solid;
}

#head_foot_comp {
  width: 100%;
}
</style>
