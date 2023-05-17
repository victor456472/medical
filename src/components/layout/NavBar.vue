<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { auth } from '@/services/firebase';
  import loginModal from "@/components/layout/login/loginModal.vue"
  import signupModal from "@/components/layout/signup/signupModal.vue"
  import {useFirebaseAuth} from "@/composables/useFirebaseAuth"
  
  const {onAuthStateChanged, logOutFunc} = useFirebaseAuth()

  let isModalLogOpen = ref(false)
  let isModalSignupOpen = ref(false)
  const loggedFlag = ref(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      loggedFlag.value = true;
      //console.log(loggedFlag.value)
      // ...
    } else {
      loggedFlag.value = false;
      //console.log(loggedFlag.value)
      // User is signed out
      // ...
    }
  });

/*   let loggedFlag = ref(loginListener())
  console.log(loggedFlag.value)
  const handleSubmit = async() => {
    loggedFlag.value = loginListener()
    console.log(loggedFlag.value)
  } */
/*   if (user){
    loggedFlag = ref(true)
    console.log("true")
  }else{
    loggedFlag = ref(false)
    console.log("false")

  }
 */
/*   const handleSubmit = async(logResponse: boolean) => {
    loggedFlag.value = logResponse
    if (loggedFlag.value === true){
      console.log("habilitar botones")
    }
  } */
  
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
        <a v-if="loggedFlag" class="navbar-item" href="/ordenes-medicas"> <RouterLink to="/ordenes-medicas"> Órdenes Médicas </RouterLink></a>
        <a v-if="loggedFlag" class="navbar-item" href="/medicamentos"> <RouterLink to="/medicamentos"> Medicamentos </RouterLink> </a>
      </div>
      <div class="navbar-end">
        <a v-if="!loggedFlag" class="navbar-item" @click="isModalLogOpen=true"> Login </a>
        <a v-if="loggedFlag" class="navbar-item" @click="logOutFunc()" href="/"><RouterLink to="/">Logout</RouterLink></a>
        <a v-if="!loggedFlag" class="navbar-item" @click="isModalSignupOpen=true"> Signup </a>
      </div>
    </div>
  </nav>
  <loginModal :is-open="isModalLogOpen" @hide="isModalLogOpen=false" /> <!-- @save="handleSubmit" -->
  <signupModal :is-open="isModalSignupOpen" @hide="isModalSignupOpen=false"/>
</template>


