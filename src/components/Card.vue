<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  publishedAt?: Date;
  thumbnail?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="flex flex-col border rounded-xl">
    <div>
      <img v-if="!!thumbnail" :src="thumbnail" class="object-fill object-top" />
    </div>
    <div class="p-6 space-y-2">
      <div v-if="!!publishedAt" class="font-medium text-sm leading-6 text-pink-500">
        {{ $dayjs(publishedAt).format("HH:mm on DD.MM.YYYY") }}
      </div>
      <a href="#" class="block font-semibold text-base text-slate-900 leading-6 hover:underline">
        {{ title }}
      </a>
      <p v-if="!!description" class="text-sm text-justify text-slate-600 leading-6">
        {{ description }}
      </p>
    </div>
  </div>
</template>
