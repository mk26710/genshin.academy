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

const description = `Genshin Impact chracters, calculators, guides and more!`;

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - GVP` : "GENSHIN.ZENLESS.CLUB";
  },
  meta: [
    { property: "og:title", content: "GENSHIN.ZENLESS.CLUB" },
    { property: "og:type", content: "website" },
    { name: "description", content: description },
    { property: "og:description", content: description },
  ],
});

const guide = useGuideStore();

onBeforeMount(async () => {
  if (!guide.isUpdated) {
    await guide.update();
  }
});
</script>
