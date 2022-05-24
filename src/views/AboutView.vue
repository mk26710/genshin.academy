<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";
import ResinCalculated from "@/components/ResinCalculated.vue";

import { useCalcStoreRefs } from "@/stores/CalculatorStore";

const { resin } = useCalcStoreRefs();
</script>

<template>
  <MainContainer :verticalCenter="true">
    <div>
      <h1 class="font-bold text-4xl md:text-5xl">Resin calculator</h1>
      <p class="mb-6">Provide this calculator with your own values.</p>
      <div class="w-full flex flex-col sm:flex-row gap-2 mb-2">
        <input
          v-model="resin.current"
          class="grow accent-pink-300 text-sm leading-6 text-neutral-400 rounded-md ring-1 ring-neutral-900/10 shadow-sm py-1.5 pl-2 pr-3"
          type="number"
          placeholder="your current resin"
        />
        <input
          v-model="resin.needed"
          class="grow accent-pink-300 text-sm leading-6 text-neutral-400 rounded-md ring-1 ring-neutral-900/10 shadow-sm py-1.5 pl-2 pr-3"
          type="number"
          placeholder="you need resin"
        />
      </div>
      <div>
        You will have <span class="text-primary-500 font-bold">{{ resin.needed }}</span> at
        <ResinCalculated />
      </div>
    </div>
  </MainContainer>
</template>
