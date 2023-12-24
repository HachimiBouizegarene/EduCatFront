import { createApp } from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'

const Vue = createApp(App)
Vue.use(router).use(VueCookies).mount('#app')



