<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { isNil } from "lodash-es";

import MainContainer from "@/components/MainContainer.vue";
import ErrorDisplay from "@/components/ErrorDisplay.vue";

import { useGuideStore } from "@/stores/guide";

const route = useRoute();
const id = route.params.id.toString();

const { getGuideById } = useGuideStore();
const guide = getGuideById(id);

// We have to go with this approach to trigger Suspense fallback if needed
onBeforeMount(() => {
  window.scrollTo({ top: 0 });
});
</script>

<template>
  <MainContainer>
    <section class="md-body" v-if="!isNil(guide)" v-html="guide.html" />
    <ErrorDisplay
      v-else
      title="Hey, this guide doesn't exist!"
      :description="`Guide for ${id} was not found.`"
      button-title="Back to Guides"
      button-href="/guides"
    />
  </MainContainer>
</template>
