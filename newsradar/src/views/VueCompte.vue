<script setup>
import HeaderComp from '@/components/HeaderComponent.vue'
import FooterComp from '@/components/FooterComponent.vue'
import { ref } from 'vue'
import * as expressHandler from '../../utils/expressHandler.js'

import { inject } from 'vue'
const router = inject('router')

const MSG = ref('')

var mail = ''
var psw = ''
var new_psw = ''

var current_mail = localStorage.getItem('userEmail')

function updateVal() {
  mail = document.getElementById('email').value
  psw = document.getElementById('current_password').value
  new_psw = document.getElementById('new_password').value
}

function clearVal() {
  mail = ''
  psw = ''
  new_psw = ''
}

function displayMSG(msg, error) {
  MSG.value = msg
  if (error == true) {
    document.getElementById('msg').setAttribute('type', 'error')
  } else {
    document.getElementById('msg').setAttribute('type', 'ok')
  }
}

async function handleDeletion() {
  console.log('tentative de supression du compte')
  updateVal()

  document.getElementById('msg').setAttribute('type', '')

  var result = confirm('Voulez-vous supprimer votre compte, cette action est irréversible ?')

  if (result) {
    let res = await expressHandler.deleteAccount(mail)

    if (res.code != 200) {
      displayMSG('Erreur ' + res.code + ' : ' + res.message, true)
    } else {
      displayMSG(res.message, false)

      router.push('/')
    }
  }

  clearVal()
}

async function handleUpdatePass() {
  console.log('tentative de modification du mdp de compte')
  updateVal()

  document.getElementById('msg').setAttribute('type', '')

  console.log(mail + ', ' + psw + ', ' + new_psw)
  if (mail != '' && mail != null && psw != '' && psw != null && new_psw != '' && new_psw != null) {
    const res = await expressHandler.updatePassword(mail, psw, new_psw)

    console.log(res)

    //affiche un message perso selon l'erreur
    if (res.code != 200) {
      displayMSG('Erreur ' + res.code + ' : ' + res.message, true)
    } else {
      displayMSG(res.message, false)
    }
  } else {
    displayMSG('Veuillez remplir les champs correctements', true)
  }

  clearVal()
}

async function handleDisconnect() {
  console.log('tentative de déconnection du compte')
  expressHandler.disconnectUser()

  router.push('/')
}
</script>

<template>
  <HeaderComp selection="compte"></HeaderComp>
  <section id="content">
    <div id="blocinscr">
      <h1>Mon Compte</h1>
      <div class="form">
        <div class="msg" id="msg">
          {{ MSG }}
        </div>
        <div>
          <label for="email">Adresse mail : </label>
          <input type="email" readonly id="email" required :value="current_mail" />
        </div>
        <div>
          <label for="current_password">Mot de passe actuel : </label>
          <input type="password" id="current_password" required />
        </div>
        <div>
          <label for="new_password">Nouveau mot de passe : </label>
          <input type="password" id="new_password" required />
        </div>
        <div id="redirection">
          <div id="buttoncontainer">
            <button class="bouton flou update" id="bt_mod" v-on:click="handleUpdatePass">
              <p>Enregistrer les modifications</p>
              <i class="fa-regular fa-floppy-disk"></i>
            </button>

            <button class="bouton flou" id="bt_deco" v-on:click="handleDisconnect">
              <p>Se déconnecter</p>
              <i class="fa-solid fa-right-from-bracket"></i>
            </button>

            <button class="bouton flou" id="bt_suppr" v-on:click="handleDeletion">
              <p>Supprimer mon compte</p>
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <FooterComp />
</template>

<style scoped>
#blocinscr {
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(var(--background_blur));
  border-radius: var(--border_radius);
  background-color: var(--bg_trans);
  padding: var(--gap);
  width: fit-content;
  gap: var(--gap);
  border: 1px solid;
}
h1 {
  font-size: 2.8vw;
  margin: 0;
  text-align: center;
  margin-bottom: 64px;
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
#mail {
  border-bottom: 1px solid var(--search_0);
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
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
  margin-top: 10px;
  gap: 10px;
}

#buttoncontainer {
  display: flex;
  justify-content: space-between;

  gap: var(--gap);
}
.bouton {
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

#bt_mod {
  background-color: #287fe38f;
}

#bt_suppr {
  background-color: var(--search_1);
}

#bt_deco {
  background-color: var(--search_3);
}
</style>
