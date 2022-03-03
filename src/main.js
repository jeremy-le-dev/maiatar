import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import '../node_modules/tailwindcss/dist/tailwind.min.css'
import '../node_modules/tailwindcss/dist/tailwind-dark.min.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

/* Firebase */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAmnx-hA_MDObW5o9hs-5XZUgnU17jb11Y",
  authDomain: "maiatar.firebaseapp.com",
  databaseURL: "https://maiatar-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "maiatar",
  storageBucket: "maiatar.appspot.com",
  messagingSenderId: "634402699765",
  appId: "1:634402699765:web:c10b547e66ded7442088bc"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

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
