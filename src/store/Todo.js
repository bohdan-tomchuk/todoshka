import firebase from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set, child, push as pushFire, update, get, remove } from "firebase/database";

export default {
   state: {
      todos: {

      }
   },
   getters: {
   },
   mutations: {
      newTodo(state, payload) {
         const newTodo = {content: payload}
         state.todos.unshift(newTodo)
      },

      removeTodo(state, payload) {
         state.todos.splice(state.todos.indexOf(payload), 1)
      }
   },
   actions: {
      getTodos({ state }, payload) {
         const dbRef = ref(getDatabase());
         get(child(dbRef, `todos/${payload}/todos`)).then((snapshot) => {
            if (snapshot.exists()) {
               const todos = snapshot.val()
               state.todos = {...todos};
            } else {
               console.log("No data available");
            }
         }).catch((error) => {
            console.error(error);
         });
      },
      async newTodo({ state, commit, rootState }, task) {
         const db = getDatabase();

         const postData = {
            content: task
         };

         const newPostKey = pushFire(child(ref(db), 'todos')).key;

         const updates = {};
         updates['/todos/' + rootState.user.id + '/todos/' + newPostKey] = postData
      
         update(ref(db), updates)
         commit('newTodo', task)
      },
      async removeTodo({ commit, rootState }, todoKey) {
         const db = getDatabase();

         remove(ref(db), `/todos/${rootState.user.id}/todos/${todoKey}`);

         commit('removeTodo', todoKey)
      }
   },
 }