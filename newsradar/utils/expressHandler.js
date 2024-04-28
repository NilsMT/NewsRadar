//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//          LA GESTION DE LA CONNEXION À UN COMPTE

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

import CryptoJS from 'crypto-js';
import * as Configuration from './conf.js'

async function hash_password(password) {
    return CryptoJS.SHA256(password).toString()
}

/**
 * Vérifie si l'utilisateur est connecté
 * @returns True s'il est connecté, sinon False
 */
export function isLoggedIn() {
  const userEmail = localStorage.getItem('userEmail')
  return !!userEmail
}

/**
 * Déconnecte l'utilisateur
 * @description supprime la variable de session associé (email)
 */

export function disconnectUser() {
  localStorage.removeItem('userEmail')
}

/**
 * Essaye de connecter l'utilisateur au compte saisi
 * @param {string} email l'adresse mail du compte
 * @param {string} password_not_hashed le mot de passe du compte, non-haché
 * @returns code: Le code de la réponse (200,400,404)   
 * message: message de la base de données
 */
export async function tryAndLogin(email, password_not_hashed) {
  let hashed_password = await hash_password(password_not_hashed)

  let opt = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: email,
        password: hashed_password
    })
  };

  let res = await fetch(Configuration.userAPI_URL+"/tryLogin",opt)
  let data = await res.json()
  let code = res.status

  if (code==200) {
    //si succès ==> connexion
    localStorage.setItem('userEmail', email)
  }
  return {code: code,message: data.message}
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//          LA GESTION D'UTILISATEURS

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Créer un compte selon la saisi et connecte l'utilisateur
 * @param {string} email l'adresse mail du nouveau compte
 * @param {string} password_not_hashed le mot de passe du nouveau compte
 * @returns code: Le code de la réponse (200,409)   
 * message: message de la base de données
 */
export async function createAccount(email, password_not_hashed) {

  let hashed_password = await hash_password(password_not_hashed)

  let opt = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: email,
        password: hashed_password
    })
  };
  let res = await fetch(Configuration.userAPI_URL+"/create/user",opt)
  let data = await res.json()
  let code = res.status
  //

  if (code==200) {
    //si succès ==> connexion
    console.log
    localStorage.setItem('userEmail', email)
  }
  return {code: code,message: data.message}
}

/**
 * Change le mot de passe du compte connecté
 * @param {string} email l'adresse mail du compte
 * @param {string} current_password le mot de passe du compte
 * @param {string} new_password le nouveau mot de passe du compte
 * @returns code: Le code de la réponse (200,400,404)   
 * message: message de la base de données
 */
export async function updatePassword(email, current_password, new_password) {
  const hashed_password = await hash_password(current_password)
  const hashed_newpassword = await hash_password(new_password)

  let opt = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: email,
        password: hashed_password,
        new_password: hashed_newpassword
    })
  }

  let res = await fetch(Configuration.userAPI_URL+"/update/password",opt)
  let data = await res.json()
  let code = res.status

  return {code: code,message: data.message}
}

/**
 * Supprime le compte connecté et déconnecte l'utilisateur
 * @param {string} email l'adresse mail du compte
 * @returns code: Le code de la réponse (200)   
 * message: message de la base de données
 */
export async function deleteAccount(email) {
  let opt = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: email
    })
  }
  let res = await fetch(Configuration.userAPI_URL+"/delete/user",opt)
  let data = await res.json()
  let code = res.status

  disconnectUser()

  return {code: code,message: data.message}
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//          LES ARTICLES SAUVEGARDÉS

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Retire un article identifié par son _id de la liste des articles sauvegardés du compte connecté
 * @param {string} email l'email du compte connecté
 * @param {string} id_article l'identifiant de l'article sauvegardé
 * @returns code: Le code de la réponse (200,404)   
 * message: message de la base de données
 */

//TODO: à utiliser /!\ l'id s'appelle id_news /!\ check si recup id depuis composant OK

export async function removeSavedArticle(email, id_article) { 
  let opt = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: email,
        id_article: id_article
    })
  };
  let res = await fetch(Configuration.userAPI_URL+"/delete/savedArticle",opt)
  let data = await res.json()
  let code = res.status

  return {code: code,message: data.message}
}

/**
 * Ajoute un article identifié par son _id de la liste des articles sauvegardés du compte connecté
 * @param {string} email l'email du compte connecté
 * @param {string} article l'article a ajoutée
 * @returns code: Le code de la réponse (200,404,500)   
 * message: message de la base de données
 * Si code 200 articles : la liste des articles sauvegardés du compte connecté
 */
export async function addSavedArticle(email, article) {
  let opt = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: email,
        article: article
    })
  };

  let res = await fetch(Configuration.userAPI_URL+"/create/savedArticle",opt)
  let data = await res.json()
  let code = res.status

  if (code==200) {
    return {code: code,message: data.message, articles: data.savedArticles}
  }
  return {code: res.code,message: data.message}
}

/**
 * Récupère la liste des articles sauvegardés du compte connecté
 * @param {string} email l'email du compte connecté
 * @returns code: Le code de la réponse (200,404)   
 * message: message de la base de données
 * Si code 200 articles : la liste des articles sauvegardés du compte connecté 
 */
export async function getAllSavedArticles(email) {
  let opt = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: email,
    })
  };

  let res = await fetch(Configuration.userAPI_URL+"/get/savedArticle",opt)
  let data = await res.json()
  let code = res.status

  if (code==200) {
    return {code: code,message: data.message, articles: data.savedArticles}
  }
  return {code: res.code,message: data.message}
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//          LES LIMITES D'API

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Récupère la limite d'appel à l'API OpenCage restants pour le compte connecté
 * @param {string} email l'email du compte connecté
 * @returns {int} code: Le code de la réponse (200,404, autre)   
 * message: message de la base de données
 * Si code 200 articles : le nombre d'appel à l'API OpenCage restants pour le compte connecté
 */
export async function getPlaceLimit(email) {

  let res = await fetch(Configuration.userAPI_URL+"/get/remainingPlacesSearch/"+email) //TODO : retiré le s à place
  let data = await res.json()
  let code = res.status

  if (code==200) {
    let limit = data.limit

    return {code: code,message: data.message, limite: limit}
  }
  
  return {code: code,message: data.message}
}
/**
 * Modifie la limite d'appel à l'API OpenCage restants pour le compte connecté
 * @param {string} email l'email du compte connecté
 * @param {int} new_limit la nouvelle valeur de la limite
 * @returns code: Le code de la réponse (200,404,500)   
 * message: message de la base de données
 */
export async function setPlaceLimit(email, new_limit) {
  let opt = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: email,
        remainingSearchPlace: new_limit
    })
  };

  let res = await fetch(Configuration.userAPI_URL+"/update/remainingPlacesSearch",opt)
  let data = await res.json()
  let code = res.status
  
  return {code: code,message: data.message}
}

/**
 * @param {string} email l'email du compte connecté
 * @returns {int} code: Le code de la réponse (200,404)   
 * message: message de la base de données
 * Si code 200 limite : le nombre d'appel à l'API NewsData restants pour le compte
 */
export async function getNewsLimit(email) {

  let res = await fetch(Configuration.userAPI_URL+"/get/remainingNewsSearch/"+email)
  let data = await res.json()
  let code = res.status

  console.log(data)

  if (code==200) {
    let limit = data.limit

    return {code: code,message: data.message, limite: limit}
  }
  
  return {code: code,message: data.message}
}

/**
 * Modifie la limite d'appel à l'API NewsData restants pour le compte connecté
 * @param {string} email l'email du compte connecté
 * @param {int} new_limit la nouvelle valeur de la limite
 * @returns code: Le code de la réponse (200,404,500)   
 * message: message de la base de données
 */
export async function setNewsLimit(email, new_limit) {
  let opt = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: email,
        remainingSearchNews: new_limit
    })
  };

  let res = await fetch(Configuration.userAPI_URL+"/update/remainingNewsSearch",opt)
  let data = await res.json()
  let code = res.status
  
  return {code: code,message: data.message}
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//          LA GESTION d'APPEL AUX API

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Appel l'API OpenCage via express pour le compte connecté
 * @param {string} email l'email du compte connecté
 * @param {string} query le sujet de la recherche
 * @returns code: Le code de la réponse (200, autre)   
 * Si pas code 200 message: message de la base de données
 * Si code 200 data : la liste des pays résultant de la recherche
 */
export async function getPlaces(email, query) { //TODO: à faire et utiliser + revoir return pour transmettre message
  // call express
  let res = await fetch(Configuration.externalAPI_URL+"/CountriesByPlace/"+query)
  let data = await res.json()
  let code = res.status

  const resl = await getPlaceLimit(email)
  let lm = resl.limite
  lm -= 1

  console.log(lm)

  await setPlaceLimit(email, lm)

  if (code==200) {
    return {code: code,data: data.countries}
  }
  
  return {code: code,message: data.error_message}
}

/**
 * Appel l'API NewsData via express pour le compte connecté
 * @param {string} email l'email du compte connecté
 * @param {string} country code du pays (comme fr pour France)
 * @param {string} city ville, nullable
 * @returns code: Le code de la réponse (200, autre)   
 * Si pas code 200 message: message de la base de données
 * Si code 200 data : la liste des articles résultant de la recherche
 */
export async function getNews(email, country) { //TODO: à check pour error_message (si c'est bon et ça existe)

  console.log("express")

  // call express
  let reqURL = `${Configuration.externalAPI_URL}/NewsByCountry/${country.country_code}/${country.city ? country.city : ''}`

  console.log(reqURL)

  let res = await fetch(reqURL)
  let data = await res.json()
  let code = res.status

  const resl = await getNewsLimit(email)
  let lm = resl.limite
  lm -= 1

  console.log(lm)
  await setNewsLimit(email, lm)

  if (code==200) {
    return {code: code,data: data.news}
  }

  return {code: code,message: data.error_message}
}