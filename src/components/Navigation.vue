<template>
  <nav class="navigation">
      <router-link to="/">
         Todoshka
      </router-link>
      <div class="btns">
         <router-link to="/register" class="go" v-if="!isLoggedIn">
         Register
         </router-link>
         <button class="go" @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
         <router-link v-else to="/login" class="go">
            Log In
         </router-link>
      </div>
  </nav>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Navigation',
  
  setup() {
   const router = useRouter()
   const store = useStore()
   const isLoggedIn = ref(false)

   onMounted( () => {
      onAuthStateChanged(getAuth(), (user) => {
         if(user) {
            isLoggedIn.value = true
         } else {
            isLoggedIn.value = false
         }
      })
   })

   const handleSignOut = () => {
      signOut(getAuth()).then( () => {
         store.state.user.user.id = ''
         store.state.user.user.todos = []
         router.push('/')
      })
   }

   return {
      isLoggedIn,
      handleSignOut
   }
  }
}
</script>

<style lang="scss" scoped>
nav {
   max-width: 100%;
   background-color: #333;
   padding: 20px 100px;
   display: flex;
   align-items: center;
   justify-content: space-between;
}

a {
   color: #f4f4f4;
   text-decoration: none;
   font-family: sans-serif;
   font-weight: bold;
   font-size: 32px;
}

.go {
   padding: 10px 18px;
   font-size: 16px;
   background-color: #f4f4f4;
   color: #333;
   border-radius: 5px;
}

.btns {
   &>*:not(:last-child) {
      margin-right: 10px;
   }
}
</style>
