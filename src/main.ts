import './assets/main.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'
import Icon from './components/Icon.vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

const pinia = createPinia()


const app = createApp(App)

app.use(router)
app.use(pinia)
app.component('Icon', Icon)
app.use(VueApexCharts)

app.mount('#app')
