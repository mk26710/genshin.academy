<script setup lang="ts">
  import Footer from "@/components/Navigation/Footer.vue";
  import Navbar from "@/components/Navigation/Navbar.vue";
  import Sidebar from "@/components/Navigation/Sidebar.vue";
</script>

<!-- 
  Grid Layout - grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr]

  +---+------+
  |   |      |
  +---+------+
  |   |      |
  +---+------+
  |   |      |
  +---+------+
 -->

<template>
  <div class="grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr] min-h-screen">
    <Navbar />
    <Sidebar />

    <Suspense>
      <router-view />
    </Suspense>

    <Footer />
  </div>
</template>
