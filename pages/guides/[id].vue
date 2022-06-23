<template>
  <MainContainer>
    <section class="md-body" v-if="!isNil(guide)" v-html="guide.html" />
    <SuspenseFallback v-else-if="isNil(guide) && !isUpdated" />
    <ErrorDisplay
      v-else
      title="Hey, this guide doesn't exist!"
      :description="`Guide for ${id} was not found.`"
      button-title="Back to Guides"
      button-href="/guides"
    />
  </MainContainer>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { isNil } from "lodash-es";

import { useGuideStore } from "@/stores/guide";
import { getCharacterById } from "~~/data/characters";
import { storeToRefs } from "pinia";

const route = useRoute();
const id = route.params.id.toString();

const store = useGuideStore();
const { all, isUpdated } = storeToRefs(store);

const character = getCharacterById(id);
const guide = computed(() => all.value.find((g) => g.id === id))

onBeforeMount(() => {
  window.scrollTo({ top: 0 });
});

useHead(() => {
  if (character == null) {
    return {};
  }

  return {
    title: `${character.name} Guide`,
    meta: [
      { property: "og:title", content: character.name },
      { name: "description", content: character.description },
      { property: "og:description", content: character.description },
      {
        property: "og:image",
        content: `https://genshin.zenless.club/img/characters/${character.id}/icon.png`,
      },
    ],
  };
});
</script>
