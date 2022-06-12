<script setup lang="ts">
import { computed, ref } from "vue";

import GuideCard from "@/components/Cards/GuideCard.vue";
import MainContainer from "@/components/MainContainer.vue";

import jsonData from "@/data/guides/published.json";
import { avatarHeaderPath } from "@/lib/helpers";
import { useRoute, useRouter } from "vue-router";

const published = jsonData.data;

const router = useRouter();
const route = useRoute();

const searchValue = ref(route.query.q?.toString() ?? "");

const query = computed({
  get() {
    return searchValue.value;
  },

  set(value: string) {
    searchValue.value = value;
    router.push({ query: { q: value } });
  },
});

const isShown = (title: string) => {
  return title.toLowerCase().includes(searchValue.value.toLowerCase());
};
</script>

<template>
  <MainContainer>
    <input
      v-model="query"
      type="text"
      placeholder="Search by title"
      class="w-full mb-4 lg:mb-8 leading-6 dark:text-neutral-300 placeholder:text-neutral-600 accent-primary-500 rounded-md ring-1 bg-white dark:bg-neutral-800 ring-neutral-900/10 dark:ring-neutral-50/10 shadow-sm py-1.5 pl-2 pr-3"
    />

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
    >
      <GuideCard
        v-for="character in published"
        :id="character.id"
        v-show="isShown(character.title)"
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
