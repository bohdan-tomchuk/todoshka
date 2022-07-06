import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
   history: createWebHashHistory(),
   routes: [
      {
         path: '/',
         component: () => import('../views/HomeView.vue')
      },
      {
         path: '/todo-list/:userId',
         component: () => import('../views/TodoList.vue'),
         meta: {
            requiresAuth: true,
         }
      },
      {
         path: '/register',
         component: () => import('../views/Register.vue')
      },
      {
         path: '/login',
         component: () => import('../views/Login.vue')
      }
   ]
})

const getCurrentUser = () => {
   return new Promise( (resolve, reject) => {
      const removeListener = onAuthStateChanged(
         getAuth(),
         (user) => {
            removeListener();
            resolve(user)
         },
         reject
      )
   })
}

router.beforeEach(async (to, from, next) => {
   if(to.matched.some( (record) => record.meta.requiresAuth) ) {
      if(await getCurrentUser()) {
         next();
      } else {
         alert('you dont have access')
         next('/')
      }
   } else {
      next()
   }
})

export default router
