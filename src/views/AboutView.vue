<script setup lang="ts">
import ResinCalculated from "@/components/ResinCalculated.vue";

import { useCalcStoreRefs } from "@/stores/CalculatorStore";

const { resin } = useCalcStoreRefs();
</script>

<template>
  <main-container :verticalCenter="true">
    <div>
      <h1 class="dark:text-white font-bold text-4xl md:text-5xl">Useless resin calculator</h1>
      <p class="mb-6">you can calculate resin here btw</p>
      <div class="w-full flex flex-col sm:flex-row gap-2 mb-2">
        <input
          v-model="resin.current"
          class="grow text-sm leading-6 text-neutral-400 rounded-md ring-1 ring-neutral-900/10 shadow-sm py-1.5 pl-2 pr-3 dark:bg-neutral-900 dark:highlight-white/5 dark:hover:bg-neutral-700"
          type="number"
          placeholder="your current resin"
        />
        <input
          v-model="resin.needed"
          class="grow text-sm leading-6 text-neutral-400 rounded-md ring-1 ring-neutral-900/10 shadow-sm py-1.5 pl-2 pr-3 dark:bg-neutral-900 dark:highlight-white/5 dark:hover:bg-neutral-700"
          type="number"
          placeholder="you need resin"
        />
      </div>
      <div>Resin refills at
        <ResinCalculated />
      </div>
    </div>
  </main-container>
</template>
