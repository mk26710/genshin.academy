<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  publishedAt?: Date;
  thumbnail?: string;
  to?:
    | string
    | {
        name: string;
        params: {
          id: string;
        };
      };
}

withDefaults(defineProps<Props>(), {});

const { $dayjs } = useNuxtApp();
</script>

<template>
  <NuxtLink :to="to ?? '#'" as="div" class="card card-vertical">
    <img
      v-if="!!thumbnail"
      :src="thumbnail"
      loading="lazy"
      class="card-thumbnail min-h-[10rem] lg:min-h-[20rem] aspect-[9/16]"
    />

    <div class="card-text-container">
      <div
        v-if="!!publishedAt"
        class="card-text-container-item font-medium text-sm leading-6 text-primary-500"
      >
        {{ $dayjs(publishedAt).format("lll") }}
      </div>

      <p class="card-text-container-item block font-semibold text-base leading-6">
        {{ title }}
      </p>

      <p v-if="!!description" class="card-text-container-item text-sm text-justify leading-6">
        {{ description }}
      </p>
    </div>
  </NuxtLink>
</template>
