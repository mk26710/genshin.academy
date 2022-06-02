<script setup lang="ts">
import { onMounted, ref } from "vue";

import Card from "@/components/Card.vue";
import MainContainer from "@/components/MainContainer.vue";

import { avatarHeaderPath } from "@/lib/helpers";
import { useGuidesStore } from "@/stores/guides";

const query = ref("");
const store = useGuidesStore();

const search = (name: string) => {
  if (store.published.isImported !== true) {
    return [];
  }

  return store.published.data
    .filter((c) => c.title.toLowerCase().includes(name.toLowerCase()))
    .sort((a, b) => b.publishedAt - a.publishedAt);
};

onMounted(async () => {
  if (store.published.isImported === false) {
    await store.lazyPublished();
  }
});
</script>

<template>
  <MainContainer>
    <input
      :disabled="store.published.isImported === false"
      v-model="query"
      type="text"
      placeholder="Search by title"
      class="w-full mb-4 lg:mb-8 leading-6 dark:text-neutral-300 placeholder:text-neutral-600 accent-primary-500 rounded-md ring-1 bg-neutral-100 dark:bg-dark-850 ring-neutral-900/10 dark:ring-neutral-50/10 shadow-sm py-1.5 pl-2 pr-3"
    />

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2"
    >
      <Card
        v-for="character in search(query)"
        :key="character.id"
        :to="`/guides/${character.id}`"
        :title="character.title"
        :thumbnail="avatarHeaderPath(character.id)"
        :published-at="new Date(character.publishedAt * 1000)"
        :description="character.brief"
      />
    </div>
  </MainContainer>
</template>
