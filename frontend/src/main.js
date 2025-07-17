import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from "./routeur";

// Import Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// (Optionnel) Icônes Material Design
import '@mdi/font/css/materialdesignicons.css'

// Création instance Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

// Création app Vue
createApp(App)
  .use(vuetify)
  .mount('#app')

