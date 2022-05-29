<script setup lang="ts">
import SuspenseFallback from "./SuspenseFallback.vue";

interface Props {
  value: boolean;
}

defineProps<Props>();
</script>

<template>
  <slot v-if="value" />
  <SuspenseFallback v-else />
</template>
