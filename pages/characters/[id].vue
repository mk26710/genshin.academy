<template>
  <MainContainer>
    <template v-if="character != null">
      <h1 class="font-semibold text-4xl mb-4 mt-6">{{ character.name }}</h1>
      <p>{{ character.description }}</p>

      <Image :src="avatarPath(character.id)" />
    </template>
  </MainContainer>
</template>

<script setup lang="ts">
import { avatarPath } from "@/lib/helpers";
import { getCharacterById } from "@/data/characters";

const route = useRoute();

const id = route.params.id.toString();
const character = getCharacterById(id);

if (character == null) {
  await navigateTo(`/404`);
}

useZenlessMeta(() => {
  if (character == null) {
    return {};
  }

  return {
    title: `${character.name}`,
    description: `${character.description}`,
    color: `${character.accentColor}`,
    iconURL: `https://genshin.zenless.club/img/characters/${character.id}/icon.png`,
  };
});
</script>
