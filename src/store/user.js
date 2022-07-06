import firebase from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set, child, push as pushFire, update, get } from "firebase/database";

export default {
   state: {
      user: {
         id: "",
         todos: [
         ]
      },
   },
   getters: {
   },
   mutations: {
      setUser(state, payload) {
         state.user.id = payload.uid         
      },
      newTodo(state, payload) {
         const newTodo = {content: payload}
         state.user.todos.unshift(newTodo)
      },
      
   },
   actions: {
      async registerUser({commit, state}, {email, password}) {
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
      async loginUser({commit, state, dispatch}, {email, password}) {
         await signInWithEmailAndPassword(getAuth(), email, password)
            .then( (userCredential) => {
               const user = userCredential.user;

               commit('setUser', user)
            })
            .catch( (error) => {
               console.log(error.code);
               alert(error.message);
            })
      },
      loggedUser({commit, state}, payload) {
         commit('setUser', payload)
      },
      getTodos({state}, payload) {
         const dbRef = ref(getDatabase());
         get(child(dbRef, `todos/${payload}/todos`)).then((snapshot) => {
            if (snapshot.exists()) {
               const todos = Object.values(snapshot.val())
               state.user.todos.unshift(...todos);
            } else {
               console.log("No data available");
            }
         }).catch((error) => {
            console.error(error);
         });
      },
      async newTodo({state, commit}, task) {
         const db = getDatabase();

         const postData = {
            content: task
          };

         const newPostKey = pushFire(child(ref(db), 'todos')).key;

         const updates = {};
         updates['/todos/' + state.user.id + '/todos/' + newPostKey] = postData

         update(ref(db), updates)
         commit('newTodo', task)
      }
   },
 }