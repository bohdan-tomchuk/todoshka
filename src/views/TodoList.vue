<template>
   <div class="todo">
      <div class="todo__create-todo">
         <h3>Todooooo</h3>
         <form>
            <textarea id="todo-input" rows="4" v-model="state.newTodoContent"></textarea>
            <button @click="addTodo">&#10003;</button>
         </form>
      </div>
      <div class="todo__list">
         <TodoItem 
            v-for="todo in todos"
            :key="todo.id"
            :todo = "todo"
            @click="removeTodo(todo)"
         />
      </div>
   </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import TodoItem from '../components/TodoItem'

export default {
   name: 'TodoList',
   components: {
      TodoItem
   },
   setup() {
      const route = useRoute()
      const store = useStore()
      const userId = computed( () => route.params.userId )
      const todos = store.state.user.user.todos

      const state = reactive({
         newTodoContent: ''
      })

      function addTodo() {
         
         store.dispatch('newTodo', state.newTodoContent)
         state.newTodoContent = ''
      }

      function removeTodo(todo) {
         todos.splice(todos.indexOf(todo), 1)
      }

      return {
         state,
         addTodo,
         removeTodo,
         todos
      }
   }
}

</script>

<style lang="scss" scooped>
   .todo {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 700px;
      padding-top: 60px;

      &__create-todo {
         padding: 30px;
         border-radius: 10px;
         background-color: rgb(134, 134, 134);
         width: 100%;
         margin-bottom: 40px;

         h3 {
            margin: 0;
            margin-bottom: 14px;
            font-size: 20px;
            font-family: sans-serif;
         }

         form {
            width: 100%;
            display: flex;

            textarea {
               flex: 1;
            }

            button {
               width: 66px;
               font-size: 32px;
               font-weight: bold;
               color: #333;
            }
         }
      }

      &__list {
         width: 100%;
         display: flex;
         flex-direction: column;

         &>*:not(:last-child) {
            margin-bottom: 20px;
         }
      }
   }

   .todoshka {
      width: 100%;
      border: 2px solid rgb(134, 134, 134);
      border-radius: 10px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
         margin: 0;
         margin-right: 32px;
         font-size: 20px;
         font-family: sans-serif;
      }

      .delete {
         font-size: 32px;
         color: crimson;
         font-weight: bold;
         width: 60px;
         height: 60px;
      }
   }
</style>