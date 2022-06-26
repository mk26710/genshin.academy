<template>
  <MainContainer :vertical-center="true">
    <div class="flex flex-col items-center">
      <h1 class="font-bold text-4xl">Hello, user!</h1>
      <p>Welcome to genshin.zenless.club!</p>
    </div>
  </MainContainer>
</template>

<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/outline";

definePageMeta({
  name: `Home`,
  icon: HomeIcon,
  navbar: true,
});

useZenlessMeta({
  title: `Home`,
  description: `A place for Genshin Impact character guides, calculators and other utilities`,
});
</script>
