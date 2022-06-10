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

const fontSize = computed(() => {
  if (/\s+/.test(props.name) && props.name.length > 10) {
    return "long-title";
  }

  return null;
});
</script>

<template>
  <RouterLink
    :to="`/characters/${id}`"
    :class="iconBg"
    class="w-[calc(33.33%-0.75rem)] md:w-28 rounded-lg bg-neutral-100 dark:bg-dark-850 border border-neutral-200 dark:border-dark-200/10"
  >
    <div class="w-full aspect-square rounded-t-lg bg-gradient-to-b">
      <img
        class="aspect-square w-full text-transparent select-none"
        :src="icon"
        :alt="`${id} icon`"
      />
    </div>
    <div class="w-full h-8 flex items-center justify-center">
      <p class="p-1 text-[.9rem] text-center" :class="fontSize">{{ name }}</p>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.long-title {
  word-spacing: 600px;
  line-height: 1;
  font-size: 0.8125rem;
}
</style>
