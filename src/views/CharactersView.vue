<script setup lang="ts">
import CharacterCard from "../components/Cards/CharacterCard.vue";
import MainContainer from "@/components/MainContainer.vue";

import characters from "@/data/characters";
</script>

<template>
  <main-container>
    <CharacterCard v-for="character in characters" :key="character.id" v-bind="character" />
  </main-container>
</template>
