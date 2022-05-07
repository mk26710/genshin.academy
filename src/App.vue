<script setup lang="ts">
  import Nav from "@/components/Navigation/Navbar.vue";
  import Footer from "@/components/Navigation/Footer.vue";
</script>

<template>
  <div class="flex flex-col h-screen gap-2">
    <Nav />

    <Suspense>
      <router-view />
    </Suspense>

    <Footer />
  </div>
</template>
