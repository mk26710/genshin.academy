<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from "vue";

const CONVERTABLE_REGEXP = /\.(gif|jpe?g|tiff?|png|bmp)$/i;

interface Props {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  decoding?: "async" | "auto" | "sync";
  lazy?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  alt: "",
  decoding: "async",
  lazy: true,
});

const convertableToWebp = computed(() => CONVERTABLE_REGEXP.test(props.src));

const source = computed(() => {
  if (import.meta.env.PROD && convertableToWebp) {
    return props.src.replace(CONVERTABLE_REGEXP, ".webp");
  }

  return props.src;
});
</script>

<template>
  <img
    :src="source"
    :alt="alt"
    :width="width"
    :height="height"
    :decoding="decoding"
    :loading="lazy ? 'lazy' : 'eager'"
  />
</template>
