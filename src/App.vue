<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import MainContainer from "./components/MainContainer.vue";
import Footer from "@/components/Footer.vue";
import Navigation from "@/components/Navigation.vue";
import SuspenseFallback from "@/components/SuspenseFallback.vue";

const route = useRoute();

const viewKey = computed(() =>
  route.meta?.dynamicKey === true ? route.fullPath : "non-dynamic-route",
);
</script>

<template>
  <div class="app-container">
    <Navigation />

    <RouterView v-slot="{ Component }" :key="viewKey">
      <template v-if="Component">
        <!-- transitions cause weird exception when spamming mouse navigation buttons -->
        <!-- <Transition name="fade" mode="out-in"> -->
        <Suspense timeout="100">
          <template #default>
            <component :is="Component" />
          </template>

          <template #fallback>
            <MainContainer>
              <SuspenseFallback />
            </MainContainer>
          </template>
        </Suspense>
        <!-- </Transition> -->

        <Footer />
      </template>
    </RouterView>
  </div>
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
