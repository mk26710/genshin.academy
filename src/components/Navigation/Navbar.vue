<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { MenuIcon } from "@heroicons/vue/outline";
import { XCircleIcon } from "@heroicons/vue/solid";

const router = useRouter();

const isOpen = ref(false);

// todo: combie this with sidebar into antoher component

const menuElement = [
  "w-full",
  "flex",
  "flex-row",
  "items-center",
  "mb-2",
  "gap-2",
  "px-3",
  "py-2",
  "rounded-lg",
  "font-semibold",
  "text-lg",
  "transition-all",
  "duration-75",
  "cursor-pointer",
  "border-2",
  "border-neutral-100",
  "hover:border-pink-300",
];

const activeElement = ["bg-pink-300", "!border-neutral-100"];

const hyperlinks = computed(() => {
  return router.options.routes
    .filter((r) => r.meta && r.meta.navigation)
    .map((r) => {
      return {
        // never undefined, filter above
        name: r.meta?.navigation?.name,
        icon: r.meta?.navigation?.icon,
        path: r.path,
      };
    });
});
</script>

<template>
  <div
    :class="isOpen ? 'fixed' : 'hidden'"
    class="w-full h-full bg-neutral-100 grid grid-rows-1 grid-cols-1 place-items-center z-50 p-4"
  >
    <div class="grid grid-rows[auto] grid-cols-[auto] place-items-center w-full">
      <RouterLink
        v-for="record in hyperlinks"
        @click="isOpen = false"
        :key="record.name"
        :to="record.path"
        :class="[menuElement, $route.path === record.path ? activeElement : '']"
      >
        <div>
          <component :is="record.icon" class="h-7 w-7 p-0"></component>
        </div>
        <span>{{ record.name }}</span>
      </RouterLink>

      <div class="mt-16 cursor-pointer" @click="isOpen = false">
        <XCircleIcon class="fill-neutral-300 w-12 h-12" />
      </div>
    </div>
  </div>

  <nav
    class="fixed z-10 lg:hidden bottom-0 h-14 w-full flex flex-row justify-center items-center select-none bg-white border-t border-neutral-300 shadow-[0_10px_50px_-21px_#000000]"
  >
    <div class="px-4 font-bold flex-grow">GVP</div>

    <div @click="isOpen = true" class="cursor-pointer h-full flex items-center px-6">
      <MenuIcon class="h-6 w-6" />
    </div>
  </nav>
</template>
