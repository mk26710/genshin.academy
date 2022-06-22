<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { isNil } from "lodash-es";

import MainContainer from "@/components/MainContainer.vue";
import ErrorDisplay from "@/components/ErrorDisplay.vue";
import Image from "@/components/Image.vue";

import { avatarPath } from "@/lib/helpers";
import { getCharacterById } from "@/data/characters";
import type { Character } from "@/data/character";

const route = useRoute();

const id = route.params.id.toString();
const character = ref<Character | undefined>(getCharacterById(id));
</script>

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
