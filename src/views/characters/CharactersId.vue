<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { isNil } from "lodash-es";

import MainContainer from "@/components/MainContainer.vue";

import { avatarPath } from "@/lib/helpers";
import { getCharacterById } from "@/data/characters";
import type { Character } from "@/data/character";

const router = useRouter();
const route = useRoute();

const id = route.params.id.toString();
const character = ref<Character | undefined>(getCharacterById(id));

if (isNil(character.value)) {
  console.warn(`Could not find a character with id ${id}`);
  router.replace({ name: "NotFound" });
}
</script>

<template>
  <MainContainer>
    <template v-if="!isNil(character)">
      <h1 class="font-semibold text-4xl mb-4 mt-6">{{ character.name }}</h1>
      <p>{{ character.description }}</p>
      <img :src="avatarPath(character.id, 'webp')" />
    </template>
  </MainContainer>
</template>
