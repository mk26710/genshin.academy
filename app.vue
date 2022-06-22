<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useGuideStore } from "@/stores/guide";

import "~/assets/main.scss";

const route = useRoute();
const store = useGuideStore();

onBeforeMount(async () => {
  if (store.isUpdated !== true) {
    await store.update();
  }
});
</script>

<template>
  <Body class="antialiased bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-100">
    <div class="app-container">
      <Navigation />

      <NuxtPage />
      <!-- <RouterView v-slot="{ Component }" :key="viewKey">
      <template v-if="Component">>
        <Suspense timeout="200">
          <template #default>
            <component :is="Component" />
          </template>

          <template #fallback>
            <MainContainer>
              <SuspenseFallback />
            </MainContainer>
          </template>
        </Suspense>
        <Footer />
      </template>
    </RouterView> -->
      <Footer />
    </div>
  </Body>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
