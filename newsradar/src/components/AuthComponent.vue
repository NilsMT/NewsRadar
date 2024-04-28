<script setup>
import { RouterLink } from 'vue-router'
import { defineProps, ref } from 'vue'
import * as expressHandler from '../../utils/expressHandler.js'

import { inject } from 'vue'
const router = inject('router')

defineProps({
  selection: {
    type: String,
    validator: (value) => value == '' || value == 'connexion'
  }
})

/* gestion formulaire de connexion */

const MSG = ref('')

var mail = ''
var psw = ''
var confpsw = ''

function updateVal() {
  mail = document.getElementById('email').value
  psw = document.getElementById('password').value
  try {
    confpsw = document.getElementById('confirmPassword').value
  } catch (e) {
    confpsw = ''
  }
}

function clearVal() {
  mail = ''
  psw = ''
  confpsw = ''
}

function displayMSG(msg, error) {
  MSG.value = msg
  if (error == true) {
    document.getElementById('msg').setAttribute('type', 'error')
  } else {
    document.getElementById('msg').setAttribute('type', 'ok')
  }
}

/* bouton connexion cliqué */
async function handleConnexion() {
  console.log('tentative de connexion')
  updateVal()

  if (mail != '' && mail != null && psw != '' && psw != null) {
    const res = await expressHandler.tryAndLogin(mail, psw)

    console.log(res)

    clearVal()
    //affiche un message perso selon l'erreur
    if (res.code != 200) {
      if (res.code == 400) {
        displayMSG('Erreur ' + res.code + ' : Informations incorrectes', true)
      } else {
        displayMSG('Erreur ' + res.code + ' : ' + res.message, true)
      }
    } else {
      displayMSG(res.message, false)

      router.push('/')
    }
  } else {
    displayMSG('Veuillez remplir les champs', true)
  }
}

/* bouton inscription cliqué */
async function handleInscription() {
  console.log('tentative de création de compte')
  updateVal()

  document.getElementById('msg').setAttribute('type', '')

  if (mail != '' && mail != null && psw != '' && psw != null && confpsw != '' && confpsw != null) {
    if (psw === confpsw) {
      const res = await expressHandler.createAccount(mail, psw)

      console.log(res)

      clearVal()

      //affiche un message perso selon l'erreur
      if (res.code != 200) {
        displayMSG('Erreur ' + res.code + ' : ' + res.message, true)
      } else {
        /* document.getElementById('msg').setAttribute('type', '') */

        displayMSG(res.message)
        router.push('/')
      }
    } else {
      displayMSG('Les mots de passe ne sont pas identiques', true)
    }
  } else {
    displayMSG('Veuillez remplir les champs', true)
  }
}
</script>

<template>
  <div id="blocinscr">
    <h1 v-if="selection == 'connexion'">Connexion</h1>
    <h1 v-else>Inscription</h1>
    <div class="form">
      <div class="msg" id="msg">
        {{ MSG }}
      </div>
      <div>
        <label for="email">Adresse mail : </label>
        <input type="email" id="email" required />
      </div>
      <div>
        <label for="password">Mot de passe : </label>
        <input type="password" id="password" required />
      </div>
      <div v-if="selection != 'connexion'">
        <label for="confirmPassword">Confirmation du mot de passe : </label>
        <input type="password" id="confirmPassword" required />
      </div>

      <div id="redirection">
        <div v-if="selection == 'connexion'">Vous n'avez pas de compte ?</div>
        <div v-else>Avez vous déjà un compte ?</div>

        <div id="buttoncontainer">
          <RouterLink
            to="/Inscription"
            class="bouton flou redirect"
            v-if="selection == 'connexion'"
          >
            <p>Créer mon compte</p>
            <i class="fa-regular fa-user"></i>
          </RouterLink>
          <RouterLink to="/Connexion" class="bouton flou redirect" v-else>
            <p>Se connecter</p>
            <i class="fa-solid fa-right-to-bracket"></i>
          </RouterLink>

          <button class="bouton flou" v-on:click="handleConnexion" v-if="selection == 'connexion'">
            <p>Se connecter</p>
            <i class="fa-solid fa-right-to-bracket"></i>
          </button>
          <button class="bouton flou" v-on:click="handleInscription" v-else>
            <p>Créer mon compte</p>
            <i class="fa-regular fa-user"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
#blocinscr {
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(var(--background_blur));
  border-radius: var(--border_radius);
  background-color: var(--bg_trans);
  padding: 50px;
  width: 50%;
  gap: 50px;
  border: 1px solid;
}
h1 {
  font-size: 2.8vw;
  margin: 0;
  text-align: center;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
}
.form > *:not(.msg) {
  display: flex;
  width: 100%;
}
.form > * > label {
  display: flex;
  font-size: larger;
}
.form > * > input {
  display: flex;
  width: auto;
  background-color: transparent;
  border: 1px solid;
  border-left: 0;
  border-top: 0;
  border-right: 0;
  margin-left: 5px;
  margin-right: 5px;
  flex: 1;
}
.form > * > input:hover {
  border: 1px solid var(--search_10);
  border-left: 0;
  border-top: 0;
  border-right: 0;
}

#redirection {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 10px;
}

#buttoncontainer {
  display: flex;
  justify-content: space-between;
}

.bouton {
  background-color: var(--search_10);
  border-radius: var(--border_radius);

  flex: 1;
  max-height: 50px;
  max-width: 250px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: var(--gap);
  box-sizing: border-box;
}

.redirect {
  background-color: var(--search_0);
}
</style>
