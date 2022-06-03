<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import ErrorComponent from "@/components/Error.vue";
import MainContainer from "@/components/MainContainer.vue";

import { useGuidesStore } from "@/stores/guides";

const route = useRoute();
const store = useGuidesStore();

const { importGuide } = store;
const { selected } = storeToRefs(store);

// We have to go with this approach to trigger Suspense fallback if needed
window.scrollTo({ top: 0 });
await importGuide(`${route.params.id}`);
</script>

<template>
  <MainContainer>
    <section v-if="selected.html !== null" v-html="selected.html" />
    <ErrorComponent
      v-if="selected.error !== null"
      title="Hey, this guide doesn't exist!"
      :description="selected.error.message"
      button-title="Back to Guides"
      button-href="/guides"
    />
  </MainContainer>
</template>
