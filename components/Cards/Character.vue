<script setup lang="ts">
import { computed } from "vue";

import { Rarity } from "~/data/types/genshin";

interface Props {
  id: string;
  name: string;
  rarity: Rarity;
}

const props = defineProps<Props>();

const icon = computed(() => `/img/characters/${props.id}/icon.png`);

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
  <NuxtLink
    :to="{ name: 'character', params: { id: id } }"
    class="card card-vertical w-[calc(33.33%-0.75rem)] md:w-28"
  >
    <div class="w-full aspect-square rounded-t-lg bg-gradient-to-b" :class="iconBg">
      <Image class="card-thumbnail" :src="icon" :alt="`${name} icon`" lazy />
    </div>

    <div class="w-full h-8 flex items-center justify-center font-semibold">
      <p class="p-1 text-[.9rem] text-center" :class="fontSize">{{ name }}</p>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.long-title {
  word-spacing: 600px;
  line-height: 1;
  font-size: 0.8125rem;
}
</style>
