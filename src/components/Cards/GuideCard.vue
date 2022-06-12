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
  <component :is="rootComponent" v-bind="rootProps" class="card card-vertical">
    <img
      v-if="!!thumbnail"
      :src="thumbnail"
      loading="lazy"
      class="card-thumbnail min-h-[10rem] lg:min-h-[20rem] aspect-[9/16]"
    />

    <div class="card-text-container">
      <div
        v-if="!!publishedAt"
        class="card-text-container-item font-medium text-sm leading-6 text-primary-500"
      >
        {{ $dayjs(publishedAt).format("lll") }}
      </div>

      <p class="card-text-container-item block font-semibold text-base leading-6">
        {{ title }}
      </p>

      <p v-if="!!description" class="card-text-container-item text-sm text-justify leading-6">
        {{ description }}
      </p>
    </div>
  </component>
</template>
