<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { isString } from "lodash-es";
import { computed, h } from "vue";
import { RouterLink } from "vue-router";

interface Props {
  title: string;
  description?: string;
  publishedAt?: Date;
  thumbnail?: string;
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const rootComponent = computed(() => (isString(props.to) ? RouterLink : h("div")));
const rootProps = computed(() => (isString(props.to) ? { to: props.to } : {}));
</script>

<template>
  <component
    :is="rootComponent"
    v-bind="rootProps"
    class="flex flex-col text-neutral-900 dark:text-neutral-300 bg-neutral-100 dark:bg-dark-850 border border-neutral-200 dark:border-neutral-200/10 rounded-lg"
  >
    <div class="min-h-[10rem] lg:min-h-[20rem] w-full aspect-[9/16]">
      <img
        v-if="!!thumbnail"
        :src="thumbnail"
        loading="lazy"
        class="object-fill object-top rounded-t-lg"
      />
    </div>
    <div class="px-6 py-4 space-y-2">
      <div v-if="!!publishedAt" class="font-medium text-sm leading-6 text-primary-500">
        {{ $dayjs(publishedAt).format("HH:mm on DD.MM.YYYY") }}
      </div>
      <p class="block font-semibold text-base leading-6">
        {{ title }}
      </p>
      <p v-if="!!description" class="text-sm text-justify leading-6">
        {{ description }}
      </p>
    </div>
  </component>
</template>
