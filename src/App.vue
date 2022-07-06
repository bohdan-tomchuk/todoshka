<template>
  <Navigation/>
  <router-view/>
</template>

<script>
import Navigation from './components/Navigation'

export default {
   components: {
      Navigation
   }
}
</script>

<style>
body {
   margin: 0;
   background-color: #f4f4f4;
}

* {
   box-sizing: border-box;
}
</style>
