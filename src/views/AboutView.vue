<script setup lang="ts">
import ResinCalculated from "../components/ResinCalculated.vue";
import { useCalcStoreRefs } from "../stores/CalculatorStore";

const { resin } = useCalcStoreRefs();
</script>

<template>
  <h1>yoo we're very cool company did you know that?</h1>
  <p>summertime is very soon finally</p>
  <p>you can calculate resin here btw</p>
  <input v-model="resin.current" placeholder="your current resin" />
  <input v-model="resin.needed" placeholder="you need resin" />
  <div>
    <ResinCalculated />
  </div>
  <p>here's another commit and now that will trigger the deployment</p>
</template>
