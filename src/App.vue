<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <div class="app-container">
    <Navigation />

    <Suspense>
      <router-view v-slot="{ Component }">
        <!-- We want to preserve guides home page state -->
        <KeepAlive include="guide-home-view">
          <component :is="Component" />
        </KeepAlive>
      </router-view>
    </Suspense>

    <Footer />
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
