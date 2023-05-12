<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import NavBar from './components/layout/NavBar.vue'
import Footer from './components/layout/Footer.vue'

/* permite ocultar o mostrar navbar */
var navbar = ref(true);

</script>

<template>
  <NavBar v-if="navbar"/>
  <RouterView />
  <Footer />
</template>

<style>
  #app{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: #ffffff;
    min-height: 100vh;
  }
  body{
    margin: 0; 
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: #ffffff;
    min-height: 100vh;
  }

</style>
