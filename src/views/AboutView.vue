<script setup lang="ts">
  import ResinCalculated from "@/components/ResinCalculated.vue";
  import { useCalcStoreRefs } from "@/stores/CalculatorStore";

  const { resin } = useCalcStoreRefs();
</script>

<template>
  <main class="flex flex-col grow mx-auto container justify-center items-center">
    <div>
      <h1 class="dark:text-white font-bold text-4xl">Useless resin calculator</h1>
      <p>you can calculate resin here btw</p>
      <div class="flex flex-row gap-2 my-2">
        <input
          v-model="resin.current"
          class="text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
          type="number"
          placeholder="your current resin"
        />
        <input
          v-model="resin.needed"
          class="text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
          type="number"
          placeholder="you need resin"
        />
      </div>
      <div class="font-bold text-pink-500 dark:text-pink-300">
        <ResinCalculated />
      </div>
    </div>
  </main>
</template>
