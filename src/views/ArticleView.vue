<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

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
  <main-container>
    <div class="space-y-2 text-justify">
      <h1 class="font-bold text-4xl text-center capitalize">
        {{ article.name }}
      </h1>
      <p>{{ article.text }}</p>
    </div>
  </main-container>
</template>
