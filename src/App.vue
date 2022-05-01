<script setup>
import Nav from "./components/Navigation/Navbar.vue";
import Footer from "./components/Navigation/Footer.vue";
</script>

<template>
  <div class="flex flex-col h-screen">
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>
