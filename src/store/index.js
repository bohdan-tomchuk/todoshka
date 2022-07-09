import { createStore } from 'vuex'
import user from './User'
import todo from './Todo'

export default createStore({
  modules: {
   user,
   todo
  }
})
