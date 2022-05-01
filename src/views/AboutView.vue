<script setup lang="ts">
import ResinCalculated from "../components/ResinCalculated.vue";
import { useCalcStoreRefs } from "../stores/CalculatorStore";

const { resin } = useCalcStoreRefs();
</script>

<template>
  <div class="flex flex-col grow mx-auto container justify-center items-center">
    <div>
      <h1 class="text-white font-bold text-4xl">Useless resin calculator</h1>
      <p>summertime is very soon finally</p>
      <p>you can calculate resin here btw</p>
      <div class="flex flex-row gap-2 my-2">
        <input
          class="text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
          v-model="resin.current" placeholder="your current resin" />
        <input
          class="text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
          v-model="resin.needed" placeholder="you need resin" />
      </div>
      <div>
        <ResinCalculated />
      </div>
      <p>here's another commit and now that will trigger the deployment</p>
    </div>

  </div>
</template>
