<script setup lang="ts">
import { RouterLink } from "vue-router";

import { Rarity } from "@/data/types/genshin";
import { characterIcon } from "@/lib/helpers";
import { computed } from "vue";

interface Props {
  id: string;
  name: string;
  rarity: Rarity;
}

const props = defineProps<Props>();

const icon = characterIcon(props.id);

const iconBg = computed(() => {
  if (props.rarity === Rarity.FIVE_STAR) {
    return "from-[#945C2C] to-[#B27330]";
  } else if (props.rarity === Rarity.FOUR_STAR) {
    return "from-[#5E5789] to-[#9C75B7]";
  }

  return "from-[#6A6D74] to-[#868586]";
});
</script>

<template>
  <RouterLink
    :to="`/character/${id}`"
    :class="iconBg"
    class="w-[calc(33.33%-0.75rem)] md:w-32 rounded-lg bg-neutral-100 dark:bg-dark-850 border border-neutral-200 dark:border-dark-200/10"
  >
    <div class="w-full aspect-square rounded-t-lg bg-gradient-to-b">
      <img
        class="aspect-square w-full text-transparent select-none"
        :src="icon"
        :alt="`${id} icon`"
      />
    </div>
    <div class="w-full">
      <p class="p-1 text-sm text-center">{{ name }}</p>
    </div>
  </RouterLink>
</template>
