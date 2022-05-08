<script setup lang="ts">
  import { useCalculatorStore } from "@/stores/CalculatorStore";

  const { resin } = useCalculatorStore();

  const calculateMinutes = () => {
    return (resin.needed - resin.current) * 8;
  };
</script>

<template>
  <span class="font-bold text-pink-500 dark:text-pink-300">
    {{ $dayjs().add(calculateMinutes(), "m").format("HH:mm:ss, DD.MM.YYYY") }}
  </span>
</template>
