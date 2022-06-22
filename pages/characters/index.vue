<template>
  <MainContainer>
    <h1 class="font-semibold text-4xl mb-4 mt-6">Characters</h1>

    <div class="flex flex-row flex-wrap gap-2 justify-evenly md:justify-start">
      <CardsCharacter
        v-for="character in charactersArray"
        :key="character.id"
        :id="character.id"
        :name="character.name"
        :rarity="character.rarity"
      />
    </div>
  </MainContainer>
</template>

<script setup lang="ts">
import { charactersArray } from "@/data/characters";
import { StarIcon } from "@heroicons/vue/outline";

definePageMeta({
  name: "Characters",
  icon: StarIcon,
  navbar: true,
});
</script>
