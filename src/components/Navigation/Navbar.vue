<script setup lang="ts">
import { MenuIcon } from "@heroicons/vue/solid";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

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
    class="w-full h-full bg-neutral-100 lg:!hidden grid grid-rows-1 grid-cols-1 place-items-center z-50 p-4"
    @click="isOpen = false"
  >
    <div class="grid grid-rows[auto] grid-cols-[auto] place-items-center w-full">
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
    </div>
  </div>

  <nav
    class="navbar lg:hidden p-4 border-b font-semibold h-16 grid grid-rows-1 grid-cols-[1fr_auto]"
  >
    <div>
      <MenuIcon @click="isOpen = !isOpen" class="h-8 w-8 cursor-pointer float-right" />
    </div>
  </nav>
</template>
