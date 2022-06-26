<script setup lang="ts">
interface Props {
  verticalCenter?: boolean;
}
withDefaults(defineProps<Props>(), {
  verticalCenter: false,
});
</script>

<template>
  <main class="main p-4 lg:p-6 grid" :class="verticalCenter ? 'place-content-center' : ''">
    <div id="content">
      <slot></slot>
    </div>
  </main>
</template>