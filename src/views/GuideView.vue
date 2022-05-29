<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import ErrorComponent from "@/components/Error.vue";
import MainContainer from "@/components/MainContainer.vue";

import { injectStrict } from "@/lib/utils";
import { markedKey } from "@/plugins/symbols";
import { useGuidesStore } from "@/stores/guides";

const md = injectStrict(markedKey);

const route = useRoute();
const store = useGuidesStore();

const { setSelected, resetSelected, setSelectedError } = store;
const { selected } = storeToRefs(store);

const fetchData = async () => {
  if (route.params?.id === undefined) {
    return;
  }

  if (route.params.id === selected.value.id) {
    console.info(`${route.params.id} was selected already, no need to refetch`);
    return;
  }

  resetSelected();

  const resp = await fetch(`/articles/guides/characters/${route.params.id}.md`, {
    cache: "no-store",
  });

  if (resp.ok) {
    const data = await resp.text();
    setSelected({ id: route.params.id.toString(), html: md.parse(data) });
    console.info(`Selected guide was set to - ${route.params.id}`);
  } else {
    const err = new Error(`Not found ${resp.url}`);
    setSelectedError(err);
  }
};

// We have to go with this approach to trigger Suspense fallback if needed
onMounted(async () => {
  window.scrollTo({ top: 0 });
  await fetchData();
});

watch(() => route.params.id, fetchData);
</script>

<template>
  <MainContainer>
    <section v-if="selected.html !== null" v-html="selected.html" />
    <ErrorComponent
      v-if="selected.error !== null"
      title="Hey, this guide doesn't exist!"
      :description="selected.error.message"
      button-title="Back to Guides"
      button-href="/guides"
    />
  </MainContainer>
</template>
