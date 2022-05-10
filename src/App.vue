<script setup lang="ts">
import Footer from "@/components/Navigation/Footer.vue";
import Navbar from "@/components/Navigation/Navbar.vue";
import Sidebar from "@/components/Navigation/Sidebar.vue";
</script>

<template>
  <div class="app-container">
    <Navbar />
    <Sidebar />

    <Suspense>
      <router-view />
    </Suspense>

    <Footer />
  </div>
</template>
