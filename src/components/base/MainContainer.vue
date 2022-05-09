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
      ...(props.verticalCenter ? ["flex-col", "items-center"] : []),
    ];
  };
</script>

<template>
  <main class="flex justify-center lg:ml-48 px-4 sm:px-10 lg:px-0" :class="boundClasses()">
    <div class="container max-w-6xl">
      <slot></slot>
    </div>
  </main>
</template>
