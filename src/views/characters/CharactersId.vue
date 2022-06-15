<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { isNil } from "lodash-es";

import MainContainer from "@/components/MainContainer.vue";

import { avatarPath } from "@/lib/helpers";
import { charactersMap } from "@/data/characters";

const router = useRouter();
const route = useRoute();

const character = charactersMap.get(`${route.params.id}`);
if (isNil(character)) {
  router.push("/404");
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
