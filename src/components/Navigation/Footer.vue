<script setup lang="ts">
import { CodeIcon } from "@heroicons/vue/solid";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <footer class="footer grid place-content-center py-4">
    <span class="transition-all duration-300 ease-in-out opacity-30 hover:text-pink-300 hover:opacity-100">
      <a href="https://github.com/kitsune-guuji/trying-vue" target="_blank">
        <CodeIcon class="h-5 w-5 inline" />
        <span class="font-bold">&nbsp;{{ t("generic.sourceCode") }}</span>
      </a>
    </span>
  </footer>
</template>
