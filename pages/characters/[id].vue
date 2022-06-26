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
import { useRoute } from "vue-router";
import { isNil } from "lodash-es";

import { avatarPath } from "@/lib/helpers";
import { getCharacterById } from "@/data/characters";

const route = useRoute();

const id = route.params.id.toString();
const character = getCharacterById(id);

useZenlessMeta(() => {
  if (character == null) {
    return {};
  }

  return {
    title: `${character.name} Guide`,
    description: `${character.description}`,
    color: `${character.accentColor}`,
    iconURL: `https://genshin.zenless.club/img/characters/${character.id}/icon.png`,
  };
});
</script>
