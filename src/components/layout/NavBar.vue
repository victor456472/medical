<script setup lang="ts">
  import { computed, ref } from 'vue';
  import loginModal from "@/components/layout/login/loginModal.vue"
  import signupModal from "@/components/layout/signup/signupModal.vue"
  let isModalLogOpen = ref(false)
  let isModalSignupOpen = ref(false)
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item"> <RouterLink to="/"> Home </RouterLink></a>
        <a class="navbar-item"> <RouterLink to="/ordenes-medicas"> Órdenes Médicas </RouterLink></a>
        <a class="navbar-item"> <RouterLink to="/medicamentos"> Medicamentos </RouterLink> </a>
      </div>
      <div class="navbar-end">
        <a class="navbar-item" @click="isModalLogOpen=true"> Login </a>
        <a class="navbar-item"> <RouterLink to="/medicamentos"> Logout </RouterLink> </a>
        <a class="navbar-item" @click="isModalSignupOpen=true"> Signup </a>
      </div>
    </div>
  </nav>
  <loginModal :is-open="isModalLogOpen" @hide="isModalLogOpen=false"/>
  <signupModal :is-open="isModalSignupOpen" @hide="isModalSignupOpen=false"/>
</template>
