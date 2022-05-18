<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { CodeIcon } from "@heroicons/vue/solid";
</script>

<template>
  <footer class="footer grid place-content-center py-4">
    <span
      class="transition-all duration-300 ease-in-out opacity-30 hover:text-pink-300 hover:opacity-100"
    >
      <a href="https://github.com/kitsune-guuji/trying-vue" target="_blank">
        <CodeIcon class="h-5 w-5 inline" />
        <span class="font-bold">&nbsp;source code</span>
      </a>
    </span>
  </footer>
</template>
