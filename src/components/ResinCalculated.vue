<script setup lang="ts">
  import { unixToDate, calculateResinTime } from "../lib/helpers";
  import { useCalcStoreRefs } from "../stores/CalculatorStore";

  const { resin } = useCalcStoreRefs();
</script>

<template>
  {{ unixToDate(calculateResinTime(resin.current, resin.needed)) }}
</template>
