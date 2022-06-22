<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue?: number;
  placeholder?: string;
  type?: string;
  step?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <input
    v-model="value"
    :type="type"
    :step="step"
    :placeholder="placeholder"
    class="calculator-input"
  />
</template>
