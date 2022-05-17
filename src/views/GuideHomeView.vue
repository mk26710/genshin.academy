<script setup lang="ts">
import { ref } from "vue";

import Card from "@/components/Card.vue";

import { data as publishedCharacters } from "@/data/guides/.published.json";

const query = ref("");

const characterAvatar = (id: string) =>
  new URL(`../assets/characters/${id}/avatar_header.png`, import.meta.url).href;

const search = (name: string) =>
  publishedCharacters
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .filter((c) => c.title.toLowerCase().includes(name.toLowerCase()));
</script>

<template>
  <main-container>
    <input
      placeholder="Search by title"
      v-model="query"
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
  </main-container>
</template>
