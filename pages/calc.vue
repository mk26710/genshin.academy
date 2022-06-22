<template>
  <MainContainer>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
      <div>
        <CalculatorRoot id="crit-value">
          <CalculatorTitle>Crit Value</CalculatorTitle>
          <CalculatorDetails>Provide your stats details</CalculatorDetails>
          <CalculatorInput
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
            Crit Value is <span class="text-primary-500 font-semibold">{{ critValue }}</span>
          </CalculatorResult>
        </CalculatorRoot>
      </div>

      <div>
        <CalculatorRoot id="resin">
          <CalculatorTitle>Resin Refill</CalculatorTitle>
          <CalculatorInput
            v-model="resinCurrent"
            type="number"
            placeholder="How much resin you currently have"
          />
          <CalculatorInput
            v-model="resinNeeded"
            type="number"
            placeholder="How much resin you need"
          />
          <CalculatorResult v-if="!isNil(fullResinAt)">
            You will have <span class="text-primary-500 font-semibold">{{ resinNeeded }}</span> on
            <span class="text-primary-500 font-semibold">{{ fullResinAt }}</span>
          </CalculatorResult>
        </CalculatorRoot>
      </div>
    </div>
  </MainContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { isNil, isNumber } from "lodash-es";

import { CalculatorIcon } from "@heroicons/vue/outline";

definePageMeta({
  name: "Calculate",
  icon: CalculatorIcon,
  navbar: true,
});

const { $dayjs } = useNuxtApp();

const critRate = ref<number | undefined>(undefined);
const critDamage = ref<number | undefined>(undefined);

const critValue = computed(() => {
  if (!isNumber(critRate.value) || !isNumber(critDamage.value)) {
    return null;
  }

  return critDamage.value + critRate.value * 2;
});

const resinCurrent = ref<number | undefined>(undefined);
const resinNeeded = ref<number | undefined>(undefined);

const fullResinAt = computed(() => {
  if (!isNumber(resinCurrent.value) || !isNumber(resinNeeded.value)) {
    return null;
  }

  const delta = resinNeeded.value - resinCurrent.value;
  const minutesToWait = delta * 8;
  const refillsAt = $dayjs().add(minutesToWait, "minutes");

  return refillsAt.format("LLL");
});
</script>
