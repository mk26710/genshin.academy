<script setup lang="ts">
  interface Props {
    grow?: boolean;
    verticalCenter?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    grow: true,
    verticalCenter: false,
  });
</script>

<!-- not really sure if this approach for condtional classes is correct, but it works lol -->
<template>
  <main
    class="container max-w-4xl self-center px-4 sm:px-10 lg:px-0"
    :class="[grow && ['grow'], verticalCenter && ['flex', 'flex-col', 'justify-center']]"
  >
    <slot></slot>
  </main>
</template>
