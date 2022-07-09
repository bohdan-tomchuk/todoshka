import firebase from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set, child, push as pushFire, update, get } from "firebase/database";

export default {
   state: {
      user: {
         id: "",
      },
   },
   getters: {
   },
   mutations: {
      setUser(state, payload) {
         state.user.id = payload.uid;
      }
   },
   actions: {

      async registerUser({ commit, state }, { email, password }) {
         await createUserWithEmailAndPassword(getAuth(), email, password)
            .then((userCredential) => {
               const user = userCredential.user;
               const db = getDatabase();

               set(ref(db, '/todos/' + user.uid), {
                  todos: ''
               });
               commit('setUser', user)
            })
            .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
               console.log(errorMessage, errorCode)
            });
      },

      async loginUser({ commit, state, dispatch }, { email, password }) {
         await signInWithEmailAndPassword(getAuth(), email, password)
            .then((userCredential) => {
               const user = userCredential.user;

               commit('setUser', user)
            })
            .catch((error) => {
               console.log(error.code);
               alert(error.message);
            })
      },

      loggedUser({ commit, state }, payload) {
         commit('setUser', payload);
      },
   }
 }