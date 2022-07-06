<template>
   <h1>Create an Account</h1>
   <p><input type="text" placeholder="Email" v-model="state.user.email"></p>
   <p><input type="password" placeholder="Password" v-model="state.user.password"></p>
   <p><button @click="register">Submit</button></p>
</template>>

<script>
import { ref, computed, reactive } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
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

      const register = async () => {
         await store.dispatch('registerUser', state.user)
         router.push(`/todo-list/${store.state.user.user.id}`)
      };

      return {
         register,
         state,
      }
   }
}
</script>