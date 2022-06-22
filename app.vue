<template>
  <Body class="antialiased bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-100">
    <div class="app-container">
      <Navigation />
      <NuxtPage />
      <Footer />
    </div>
  </Body>
</template>

<script setup lang="ts">
import { useGuideStore } from "~/stores/guide";

const guide = useGuideStore();

onBeforeMount(async () => {
  if (!guide.isUpdated) {
    await guide.update();
  }
});
</script>
