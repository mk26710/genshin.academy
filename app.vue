<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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
