<script setup lang="ts">
import Card from "@/components/Card.vue";

const ayakaAvatarHeader = new URL(
  "../assets/characters/kamisato_ayaka/avatar_header.png",
  import.meta.url,
);
</script>

<template>
  <main-container>
    <h1 class="font-bold text-4xl text-center mb-4">some good guides</h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2"
    >
      <Card
        v-for="i in 50"
        :key="i"
        to="/guides/kamisato_ayaka"
        title="Kamisato Ayaka"
        :thumbnail="ayakaAvatarHeader.href"
        :published-at="new Date()"
        description="The true archon of Eternity. The embodiment of an absolute beauty and elegance. She is all you need for your entire adventure."
      />
    </div>
  </main-container>
</template>
