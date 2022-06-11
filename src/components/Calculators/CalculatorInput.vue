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
    class="leading-6 dark:text-neutral-300 placeholder:text-neutral-400 accent-primary-500 rounded-md ring-1 dark:bg-neutral-800 ring-neutral-900/10 dark:ring-neutral-50/10 shadow-sm py-1.5 pl-2 pr-3"
  />
</template>
