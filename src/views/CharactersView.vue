<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";

import characters from "@/data/characters";
import { Rarity } from "@/data/types/genshin";
import { characterIcon } from "@/lib/helpers";

const bgColor = (rarity: Rarity) => {
  if (rarity === Rarity.FIVE_STAR) {
    return "bg-orange-300";
  } else if (rarity === Rarity.FOUR_STAR) {
    return "bg-purple-300";
  }

  return "bg-neutral-400";
};
</script>

<template>
  <main-container>
    <div v-for="character in characters" :key="character.id" class="flex flex-row">
      <div :class="bgColor(character.rarity)" class="flex flex-col">
        <div>
          <img :src="characterIcon(character.id)" />
        </div>
        <div class="self-center">
          {{ character.name }}
        </div>
      </div>
    </div>
  </main-container>
</template>
