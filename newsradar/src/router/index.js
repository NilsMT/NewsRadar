import { createRouter, createWebHistory } from 'vue-router'
import * as expressHandler from '../../utils/expressHandler.js'

import Composants from '../views/VueComposants.vue'
import Test from '../views/VueTest.vue'

import Erreur404 from '../views/VueErreur404.vue'

import Accueil from '../views/VueAccueil.vue'

import Favoris from '../views/VueFavoris.vue'
import Compte from '../views/VueCompte.vue'

import Connexion from '../views/VueConnexion.vue'
import Inscription from '../views/VueInscription.vue'

import ResultatRecherche from '../views/VueResultatRecherche.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Test',
      name: 'Test',
      component: Test,
      meta: {
        title: 'Test',
        accountRestricted: false
      }
    },
    {
      path: '/Comp',
      name: 'Liste des composants',
      component: Composants,
      meta: {
        title: 'Liste des composants',
        accountRestricted: false
      }
    },
    {
      path: '/',
      name: 'Accueil',
      component: Accueil,
      meta: {
        title: 'Accueil',
        accountRestricted: false
      }
    },
    {
      path: '/ResultatRecherche',
      name: 'Résultat de recherche',
      component: ResultatRecherche,
      meta: {
        title: 'Résultat de recherche',
        accountRestricted: true
      }
    },
    {
      path: '/Favoris',
      name: 'Mes articles',
      component: Favoris,
      meta: {
        title: 'Mes articles',
        accountRestricted: true
      }
    },
    {
      path: '/Compte',
      name: 'Compte',
      component: Compte,
      meta: {
        title: 'Compte',
        accountRestricted: true
      }
    },
    {
      path: '/Connexion',
      name: 'Connexion',
      component: Connexion,
      meta: {
        title: 'Connexion',
        accountRestricted: false
      }
    },
    {
      path: '/Inscription',
      name: 'Inscription',
      component: Inscription,
      meta: {
        title: 'Inscription',
        accountRestricted: false
      }
    },
    {
      path: '/:Erreur404',
      name: 'Erreur 404',
      component: Erreur404,
      meta: {
        title: 'Erreur 404',
        accountRestricted: false
      }
    }
  ]
})

//changement de titre de page
router.beforeEach((to, _, next) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  document.title = to.meta.title || 'NewsRadar'
  if (to.meta.accountRestricted) {
    if (!expressHandler.isLoggedIn()) {
      next('/Connexion')
      return
    }
  }
  next()
})

export default router
