<script setup>
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer>
    <div id="topfooter">
      <div class="info">
        <h2>À PROPOS</h2>
        <ul>
          <RouterLink to="/404">
            <li>Conditions générales d'utilisation du compte</li>
            <li>Données personnelles</li>
            <li>Mentions légales</li>
            <li>Notifier un article illicite</li>
            <li>Cookies</li>
            <li>Conditions de publication des avis</li>
            <li>Avis NewsRadar</li>
          </RouterLink>
        </ul>
      </div>
      <div class="info">
        <h2>AIDE, SAV & SERVICES</h2>
        <ul>
          <RouterLink to="/404">
            <li>Une question ?</li>
            <li>Contactez-nous !</li>
            <li>Service NewsRadar</li>
            <li>Devenez franchisé NewsRadar</li>
            <li>Publicité</li>
            <li>Sécurité</li>
            <li>Google assistant</li>
          </RouterLink>
        </ul>
      </div>
      <div class="info">
        <h2>NEWSRADAR</h2>
        <ul>
          <RouterLink to="/404">
            <li>Qui sommes nous ?</li>
            <li>Recrutement</li>
            <li>Groupe NewsRadar</li>
          </RouterLink>
        </ul>
      </div>
    </div>
    <div id="botfooter">
      <div id="titrefooter">NewsRadar</div>
      <span class="hover_bar"></span>
      <div>Copyright © {{ currentYear }} | NewsRadar - Tous droits reservés</div>
    </div>
  </footer>
</template>

<script></script>

<style scoped>
footer {
  display: flex;
  align-items: center;

  width: 100%;
  flex-direction: column;
}
#topfooter {
  width: 90%;
  display: flex;
  background-color: #141727;
  padding-left: 5%;
  padding-right: 5%;
}
h2 {
  font-size: 30px;
}
.info {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul {
  padding-left: 30px;
}
li:hover {
  text-decoration: underline;
}
#botfooter {
  display: flex;
  width: 100%;
  background-color: #0b0d15;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
}
#titrefooter {
  font-size: 200%;

  font-family: 'Faster One', system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>
