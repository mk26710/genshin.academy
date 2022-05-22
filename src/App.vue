<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="app-container">
    <Navigation />

    <Suspense>
      <router-view />
    </Suspense>

    <Footer />
  </div>
</template>
