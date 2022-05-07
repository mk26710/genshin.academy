<script setup lang="ts">
  interface Props {
    grow?: boolean;
    verticalCenter?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    grow: true,
    verticalCenter: false,
  });

  const boundClasses = () => {
    return [
      ...(props.grow ? ["grow"] : []),
      ...(props.verticalCenter ? ["flex", "flex-col", "justify-center", "items-center"] : []),
    ];
  };
</script>

<template>
  <main class="container max-w-4xl self-center px-4 sm:px-10 lg:px-0" :class="boundClasses()">
    <slot></slot>
  </main>
</template>
