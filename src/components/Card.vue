<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import DivOrLink from "./DivOrLink.vue";

interface Props {
  title: string;
  description?: string;
  publishedAt?: Date;
  thumbnail?: string;
  to?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div-or-link :to="to" class="flex flex-col border rounded-md">
    <div class="min-h-[10rem] lg:min-h-[20rem] bg-neutral-200">
      <img v-if="!!thumbnail" :src="thumbnail" loading="lazy" class="object-fill object-top" />
    </div>
    <div class="px-6 py-4 space-y-2">
      <div v-if="!!publishedAt" class="font-medium text-sm leading-6 text-pink-500">
        {{ $dayjs(publishedAt).format("HH:mm on DD.MM.YYYY") }}
      </div>
      <p class="block font-semibold text-base text-slate-900 leading-6">
        {{ title }}
      </p>
      <p v-if="!!description" class="text-sm text-justify text-slate-600 leading-6">
        {{ description }}
      </p>
    </div>
  </div-or-link>
</template>
