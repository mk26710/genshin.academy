<script setup lang="ts">
import { computed, ref } from "vue";
import { isNil } from "lodash-es";

import MainContainer from "@/components/MainContainer.vue";

import CalculatorRoot from "../components/Calculators/CalculatorRoot.vue";
import CalculatorTitle from "../components/Calculators/CalculatorTitle.vue";
import CalculatorDetails from "../components/Calculators/CalculatorDetails.vue";
import CalculatorInput from "../components/Calculators/CalculatorInput.vue";
import CalculatorResult from "../components/Calculators/CalculatorResult.vue";

const critRate = ref<number | undefined>(undefined);
const critDamage = ref<number | undefined>(undefined);

const critValue = computed(() => {
  if (isNil(critRate.value) || isNil(critDamage.value)) {
    return null;
  }

  return critDamage.value + critRate.value * 2;
});
</script>

<template>
  <MainContainer>
    <CalculatorRoot>
      <CalculatorTitle>Artifact Crit Value</CalculatorTitle>
      <CalculatorDetails class="mb-2">
        Enter your artifact's crit rate and crit damage
      </CalculatorDetails>
      <CalculatorInput
        class="mb-2"
        v-model="critRate"
        type="number"
        :step="0.1"
        placeholder="Artifact's crit rate"
      />
      <CalculatorInput
        v-model="critDamage"
        type="number"
        :step="0.1"
        placeholder="Artifact's crit damage"
      />
      <CalculatorResult v-if="!isNil(critValue)">
        Crit Value is <span class="text-primary-500">{{ critValue }}</span>
      </CalculatorResult>
    </CalculatorRoot>
  </MainContainer>
</template>
