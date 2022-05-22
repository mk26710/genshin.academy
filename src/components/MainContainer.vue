<script setup lang="ts">
interface Props {
  verticalCenter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  verticalCenter: false,
});
</script>

<template>
  <main class="main p-4 xl:p-8 grid" :class="props.verticalCenter ? 'place-content-center' : ''">
    <div id="content">
      <slot></slot>
    </div>
  </main>
</template>
