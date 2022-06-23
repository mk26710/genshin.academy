<template>
  <MainContainer>
    <template v-if="!isNil(character)">
      <h1 class="font-semibold text-4xl mb-4 mt-6">{{ character.name }}</h1>
      <p>{{ character.description }}</p>

      <Image :src="avatarPath(character.id)" />
    </template>
    <ErrorDisplay
      v-else
      button-href="/characters"
      button-title="Back to all characters"
      title="Character data not found"
    />
  </MainContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { isNil } from "lodash-es";

import { avatarPath } from "@/lib/helpers";
import { getCharacterById } from "@/data/characters";

const route = useRoute();

const id = route.params.id.toString();
const character = ref(getCharacterById(id));

useHead(() => {
  if (character.value == null) {
    return {};
  }

  return {
    title: character.value.name,
    meta: [
      { property: "og:title", content: character.value.name },
      { name: "description", content: character.value.description },
      { property: "og:description", content: character.value.description },
      {
        property: "og:image",
        content: `https://genshin.zenless.club/img/characters/${character.value.id}/icon.png`,
      },
    ],
  };
});
</script>
