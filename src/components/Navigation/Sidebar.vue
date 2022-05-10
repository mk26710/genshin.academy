<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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
  "duration-200",
  "hover:text-neutral-200",
  "cursor-pointer",
];

const activeElement = ["bg-neutral-800"];

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
  <aside class="sidebar hidden h-full lg:flex flex-col items-center p-4 w-56 dark:bg-neutral-900">
    <h1 class="dark:text-white font-bold text-4xl pt-4 pb-6">GVP</h1>

    <hr class="w-full mb-6 dark:border-neutral-800" />

    <RouterLink
      v-for="record in hyperlinks"
      :key="record.name"
      :to="record.path"
      :class="[menuElement, $route.path === record.path ? activeElement : '']"
    >
      <div>
        <component :is="record.icon" class="h-7 w-7 p-0"></component>
      </div>
      <span>{{ record.name }}</span>
    </RouterLink>
  </aside>
</template>
