<script setup lang="ts">
interface Props {
  to?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <router-link v-if="!!to" :to="to">
    <slot />
  </router-link>

  <div v-else>
    <slot />
  </div>
</template>
