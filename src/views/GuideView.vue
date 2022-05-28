<script setup lang="ts">
import { isError } from "lodash";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import Error from "@/components/Error.vue";
import MainContainer from "@/components/MainContainer.vue";

import { useGuidesStore } from "@/stores/guides";

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

  try {
    const data = await import(`../data/guides/characters/${route.params.id}.json`);
    setSelected({ id: data.id, html: data.html });
    console.info(`Selected guide was set to - ${route.params.id}`);
  } catch (err) {
    if (isError(err)) {
      setSelectedError(err);
    }
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
    <Error
      v-if="selected.error !== null"
      title="Hey, this guide doesn't exist!"
      :description="selected.error.message"
      button-title="Back to Guides"
      button-href="/guides"
    />
  </MainContainer>
</template>
