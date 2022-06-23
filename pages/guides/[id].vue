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


<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { isNil } from "lodash-es";

import { useGuideStore } from "@/stores/guide";
import { getCharacterById } from "~~/data/characters";

const route = useRoute();
const id = route.params.id.toString();

const { getGuideById } = useGuideStore();

const character = getCharacterById(id);
const guide = getGuideById(id);

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