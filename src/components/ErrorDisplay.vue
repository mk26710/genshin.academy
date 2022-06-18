<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { isString } from "lodash-es";
import { RouterLink } from "vue-router";

import { ChevronDoubleLeftIcon } from "@heroicons/vue/solid";

interface Props {
  title: string;
  description?: string;
  buttonTitle: string;
  buttonHref: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <div class="flex flex-col gap-y-3">
      <h1 class="text-xl font-bold">{{ title }}</h1>

      <p v-if="isString(description)">{{ description }}</p>

      <RouterLink
        :to="buttonHref"
        class="mt-8 px-3 py-2 bg-primary-600 shadow-lg text-white text-lg font-bold rounded-lg flex flex-row justify-center items-center gap-x-2"
      >
        <ChevronDoubleLeftIcon class="w-5 h-5" />
        <span>{{ buttonTitle }}</span>
      </RouterLink>
    </div>
  </div>
</template>
