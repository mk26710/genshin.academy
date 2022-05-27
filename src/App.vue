<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <div class="app-container">
    <Navigation />

    <Suspense>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
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
