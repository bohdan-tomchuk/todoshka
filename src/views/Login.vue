<template>
   <h1>Log In</h1>
   <p><input type="text" placeholder="Email" v-model="state.user.email"></p>
   <p><input type="password" placeholder="Password" v-model="state.user.password"></p>
   <p><button @click="login">Submit</button></p>
</template>>

<script>
import { ref, reactive } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
   setup() {
      const state = reactive({
         user: {
            email: "",
            password: ""
         }
      })

      const router = useRouter()
      const store = useStore()

      const login = async () => {
         await store.dispatch('loginUser', state.user)
         router.push(`/todo-list/${store.state.user.user.id}`)
      };

      return {
         state,
         login
      }
   }
}
</script>