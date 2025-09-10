import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

// app.component('CButton', Button)

app.mount('#app')
