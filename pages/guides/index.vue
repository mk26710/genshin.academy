<template>
  <MainContainer>
    <input
      v-model="search"
      type="text"
      placeholder="Search by title"
      class="w-full mb-4 lg:mb-8 leading-6 dark:text-neutral-300 placeholder:text-neutral-600 accent-primary-500 rounded-md ring-1 bg-white dark:bg-neutral-800 ring-neutral-900/10 dark:ring-neutral-50/10 shadow-sm py-1.5 pl-2 pr-3"
    />

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
    >
      <CardsGuide
        v-for="c in publishedCharacters"
        :id="c.id"
        v-show="isShown(c.name)"
        :key="c.id"
        :to="`/guides/${c.id}`"
        :title="c.name"
        :thumbnail="`/img/characters/${c.id}/avatar_header.webp`"
        :description="c.description"
      />
    </div>
  </MainContainer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { debouncedRef } from "@vueuse/core";

import { charactersArray } from "@/data/characters";
import published from "@/data/guides/compiled/characters/published.json";
import { BeakerIcon } from "@heroicons/vue/outline";

definePageMeta({
  name: "Guides",
  icon: BeakerIcon,
  navbar: true,
});

const router = useRouter();
const route = useRoute();

const publishedCharacters = computed(() => {
  return charactersArray.filter(({ id }) => published.includes(id));
});

const search = ref(route.query.q?.toString() ?? "");
const debouncedSearch = debouncedRef(search, 300);

watch(debouncedSearch, () => {
  router.push({ query: { q: search.value } });
});

const isShown = (title: string) => {
  return title.toLowerCase().includes(debouncedSearch.value.toLowerCase());
};
</script>
