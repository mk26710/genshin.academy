<script setup lang="ts">
  import Footer from "@/components/Navigation/Footer.vue";
  import Nav from "@/components/Navigation/Navbar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Nav />

    <Suspense>
      <router-view />
    </Suspense>

    <Footer />
  </div>
</template>
