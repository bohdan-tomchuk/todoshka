<template>
  <div class="home">
   <h1>Welcome to Todoshka</h1>
   <h3>Make some todoshki</h3>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style lang="scss" scooped>
   .home {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 80px;
      font-family: sans-serif;
      
      h1 {
         font-weight: bolder;
      }
   }
</style>
