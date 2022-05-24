<script setup lang="ts">
import { onMounted, ref } from "vue";

import Card from "@/components/Card.vue";
import MainContainer from "@/components/MainContainer.vue";

import { useGuidesStore } from "@/stores/guides";

const query = ref("");
const store = useGuidesStore();

const characterAvatar = (id: string) =>
  new URL(`../assets/characters/${id}/avatar_header.png`, import.meta.url).href;

const search = (name: string) =>
  store.multipliedPublished
    .filter((c) => c.title.toLowerCase().includes(name.toLowerCase()))
    .sort((a, b) => b.publishedAt - a.publishedAt);

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
      class="w-full mb-4 lg:mb-8 leading-6 accent-pink-300 rounded-md ring-1 ring-neutral-900/10 shadow-sm py-1.5 pl-2 pr-3"
    />

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2"
    >
      <Card
        v-for="character in search(query)"
        :key="character.id"
        :to="`/guides/${character.id}`"
        :title="character.title"
        :thumbnail="characterAvatar(character.id)"
        :published-at="new Date(character.publishedAt * 1000)"
        :description="character.brief"
      />
    </div>
  </MainContainer>
</template>
