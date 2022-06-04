<script setup lang="ts">
import { RouterLink } from "vue-router";

import type { Rarity } from "@/data/types/genshin";
import { characterIcon } from "@/lib/helpers";

interface Props {
  id: string;
  name: string;
  rarity: Rarity;
}

const props = defineProps<Props>();

const icon = characterIcon(props.id);
</script>

<template>
  <RouterLink :to="`/character/${id}`">
    <div>
      <img :src="icon" :alt="`${id} icon`" />
    </div>
    <div>{{ name }}</div>
  </RouterLink>
</template>
