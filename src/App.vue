<script setup>
  import { RouterView } from 'vue-router'
  import Footer from '/src/components/Footer.vue'
  import Header from '/src/components/Header.vue'
</script>

<template>
  <div id="app">
    <Header></Header>
    <RouterView/>
    <Footer></Footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>