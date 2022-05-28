<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

import MainContainer from "@/components/MainContainer.vue";

const route = useRoute();

/**
 * So I came up with some weird shit and basically
 * we are going to store all artcles as Vue SFCs
 * in order to reduce the headache with parser and etc.
 *
 * Here's a function that returns the component, but
 * in order for it to work properly with vue-router
 * `:key` directive was used, so it rerenders and
 * imports fresh content, which is needed in situations
 * like this, for example:
 *
 *   User is at `/guides/kamsiato_ayaka`, they change the url to
 *   `/guides/yae_miko`, if there was no `:key` - the content
 *   would stay the same and Vue wouldn't rerender the component
 *
 * This could probably be achieved with `reactive()` or `ref()`
 * but according to Vue communities it's not the best idea.
 */

const guideContent = () => {
  console.log(`loading guide for ${route.params.id}`)
  return defineAsyncComponent(() => import(`../data/guides/characters/${route.params.id}.vue`));
};
</script>

<template>
  <MainContainer>
    <component :is="guideContent()" :key="$route.params.id" />
  </MainContainer>
</template>
