import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import les fonctions "publiques"

const app = createApp(App)

app.provide('router', router)

app.use(createPinia())
app.use(router)

app.mount('#app')
