<script setup lang="ts">
import CharacterCard from "../../components/Cards/CharacterCard.vue";
import MainContainer from "@/components/MainContainer.vue";

import { charactersArray } from "@/data/characters";
</script>

<template>
  <MainContainer>
    <h1 class="font-semibold text-4xl mb-4 mt-6">Characters</h1>

    <div class="flex flex-row flex-wrap gap-2 justify-evenly md:justify-start">
      <CharacterCard
        v-for="character in charactersArray"
        :key="character.id"
        :id="character.id"
        :name="character.name"
        :rarity="character.rarity"
      />
    </div>
  </MainContainer>
</template>
