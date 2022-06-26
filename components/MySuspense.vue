<script setup lang="ts">
interface Props {
  value: boolean;
}

defineProps<Props>();
</script>

<template>
  <slot v-if="value" />
  <SuspenseFallback v-else />
</template>
