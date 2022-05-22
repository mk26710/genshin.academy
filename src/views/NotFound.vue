<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";
</script>

<template>
  <MainContainer :vertical-center="true">
    <div class="container mx-auto max-w-xl text-center">
      <h1 class="font-bold text-5xl mb-2">404: Not Found</h1>
      <p>You are trying to visit a non existing page :(</p>

      <div class="mt-12">
        <router-link to="/">
          <button
            class="py-2 px-3 transition-colors duration-300 ease-in-out font-bold bg-rose-500 hover:bg-rose-400 text-rose-200 hover:text-sky-100 shadow-lg shadow-rose-500/50 hover:shadow-rose-400/50 rounded"
          >
            Click to go home
          </button>
        </router-link>
      </div>
    </div>
  </MainContainer>
</template>
