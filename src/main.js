import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import '../node_modules/tailwindcss/dist/tailwind.min.css'
import '../node_modules/tailwindcss/dist/tailwind-dark.min.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: []
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
