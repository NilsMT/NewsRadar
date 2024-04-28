<script setup>
import HeaderComp from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'
</script>

<template>
  <HeaderComp></HeaderComp>
  <section id="content">
    <div id="box" class="flou">
      <div>Oh non ! La page que vous avez demandé n'a pas pu être trouvée</div>
      <div>404</div>
      <RouterLink to="/" id="back404" class="flou"
        >Retour à l'accueil
        <i class="fa-solid fa-reply"></i>
      </RouterLink>
    </div>
  </section>
  <Footer></Footer>
</template>

<style scoped>
#content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88vh;
}

#box {
  width: fit-content;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: var(--padding);
}

#box > div:nth-child(1) {
  font-size: 150%;
}

#box > div:nth-child(2) {
  font-size: 1000%;

  font-family: 'Faster One', system-ui;
  font-weight: 400;
  font-style: normal;
}

#back404 {
  border-radius: var(--border_radius);

  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

#back404:hover {
  background-color: var(--text_trans);
  color: var(--text_black);
}

#back404 > i {
  transition: color 0.2s ease;
}

#back404:hover > i {
  color: var(--text_black);
}
</style>
