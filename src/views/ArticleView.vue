<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import { reactive, watchEffect } from "vue";

  const route = useRoute();
  const router = useRouter();

  let article = reactive({
    id: "",
    name: "",
    text: "",
  });

  async function fetchData() {
    if (route.params?.id === undefined) {
      return;
    }

    try {
      const data = await import(`../data/articles/${route.params.id}.json`);

      article.id = data.id;
      article.name = data.name;
      article.text = data.text;

      console.log(`[DYN IMPORT] Reactive data was set ${route.params.id}`);
    } catch (_err) {
      router.push("/404");
    }
  }

  watchEffect(fetchData);
</script>

<template>
  <main class="grow">
    <div class="container mx-auto px-2 max-w-4xl space-y-2">
      <h1 class="dark:text-white font-bold text-4xl text-center capitalize">
        {{ article.name }}
      </h1>
      <p>{{ article.text }}</p>
    </div>
  </main>
</template>
