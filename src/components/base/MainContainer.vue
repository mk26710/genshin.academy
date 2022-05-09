<script setup lang="ts">
  interface Props {
    verticalCenter?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    verticalCenter: false,
  });

  const boundClasses = () => {
    return [...(props.verticalCenter ? ["place-content-center"] : [])];
  };
</script>

<template>
  <main class="main px-4 pt-0 lg:pt-4 grid" :class="boundClasses()">
    <div id="content">
      <slot></slot>
    </div>
  </main>
</template>
