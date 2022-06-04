<script setup lang="ts">
import CharacterCard from "../components/Cards/CharacterCard.vue";
import MainContainer from "@/components/MainContainer.vue";

import { charactersArray } from "@/data/characters";
</script>

<template>
  <MainContainer>
    <div class="w-full mb-4">
      <h1 class="w-fit pb-2 text-4xl font-bold border-b border-neutral-200 dark:border-dark-200/10">
        Characters
      </h1>
    </div>
    <div class="flex flex-row flex-wrap gap-4 justify-evenly md:justify-start">
      <CharacterCard v-for="character in charactersArray" :key="character.id" v-bind="character" />
    </div>
  </MainContainer>
</template>
