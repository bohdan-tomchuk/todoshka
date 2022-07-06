<template>
   <div class="todoshka">
      <p>{{ todo.content }}</p>
      <button class="delete">&#x1F5D1;</button>
   </div>
</template>

<script>
export default {
   name: 'TodoItem',
   props: {
      todo: {
         type: Object,
         required: true
      }
   },
}
</script>

<style lang="scss" scoped>

</style>