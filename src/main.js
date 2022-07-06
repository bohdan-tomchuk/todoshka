import { createApp, h } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD674mNHF8Gw-LnFv3SVG0F7Cq1UGKfKP0",
  authDomain: "todoshka-18fdf.firebaseapp.com",
  projectId: "todoshka-18fdf",
  storageBucket: "todoshka-18fdf.appspot.com",
  messagingSenderId: "380440446454",
  appId: "1:380440446454:web:577ea514c104af87e8f3d7"
};

initializeApp(firebaseConfig);

createApp({
   created() {
      onAuthStateChanged(getAuth(), (user) => {
         if (user) {
            this.$store.dispatch('loggedUser', user)
            this.$store.dispatch('getTodos', user.uid)
          } else {

          }
      })
    },
    render: () => h(App),
}).use(store).use(router).mount('#app')
