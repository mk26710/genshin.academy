<template>
  <div class="flex flex-grow">
    <div class="container mx-auto px-2 max-w-4xl space-y-2">
      <h1 class="dark:text-white font-bold text-4xl text-center capitalize">{{ article.name }}</h1>
      <p>{{ article.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { reactive, watchEffect } from "vue";

const route = useRoute();

let article = reactive({
  id: "",
  name: "",
  text: "",
});

async function fetchData() {
  if (!Object.hasOwn(route.params, "id")) {
    return;
  }

  if (route.params?.id === undefined) {
    return;
  }

  const data = await import(`../data/articles/${route.params.id}.json`);

  article.id = data.id;
  article.name = data.name;
  article.text = data.text;

  console.log(`[FETCH] Reactive data was set ${route.params.id}`);
}

watchEffect(fetchData);

</script>
