<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { MenuIcon } from "@heroicons/vue/outline";
import { XCircleIcon } from "@heroicons/vue/solid";

const router = useRouter();

const store = reactive({
  isOpen: false,
});

const openModal = () => {
  store.isOpen = true;
};

const closeModal = () => {
  store.isOpen = false;
};

const endpoints = computed(() => {
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
  <!-- Mobile Modal Menu -->
  <div
    data-description="Mobile Navigation Modal"
    :class="store.isOpen ? 'fixed' : 'hidden'"
    class="flex flex-col gap-y-4 justify-center h-screen w-screen bg-neutral-50 z-50"
  >
    <div class="mt-64 w-full flex flex-wrap justify-evenly">
      <RouterLink
        @click="closeModal"
        v-for="endpoint in endpoints"
        :key="endpoint.name"
        :to="endpoint.path"
        class="flex flex-col items-center p-6 m-2 rounded-lg"
        :class="$route.path === endpoint.path && '!bg-primary-300 shadow-lg shadow-primary-300/500'"
      >
        <component :is="endpoint.icon" class="w-8 h-8" />
        <h1 class="font-semibold text-lg">{{ endpoint.name }}</h1>
      </RouterLink>
    </div>

    <div @click="closeModal" class="self-center mt-16">
      <XCircleIcon class="h-12 w-12 fill-neutral-300" />
    </div>
  </div>

  <!-- 
    Mobile Navbar
    Note: select-none on nav is actually needed here otherwise it does some weird stuff on mobile firefox lol idk why
  -->
  <nav
    data-description="Mobile Bottom Navigation"
    class="fixed lg:hidden bottom-0 h-14 w-full flex flex-row bg-neutral-50 border-t border-neutral-300 select-none z-10"
  >
    <div class="flex-grow self-center pl-6">
      <h1 class="font-extrabold text-lg">GVP</h1>
    </div>

    <div
      @click="openModal"
      class="flex items-center px-6 cursor-pointer border-l border-neutral-300/30"
    >
      <MenuIcon class="w-6 h-6" />
    </div>
  </nav>

  <!-- Desktop Sidebard -->
  <aside
    data-description="Desktop Sidebar Navigation"
    class="sidebar hidden lg:flex flex-col w-64 border-r border-neutral-200 h-full"
  >
    <div class="flex flex-col gap-y-2 sticky top-0 p-4 w-full">
      <div class="self-center py-4 mb-2 border-b border-neutral-200">
        <h1 class="font-bold text-4xl">GVP</h1>
      </div>

      <RouterLink
        v-for="endpoint in endpoints"
        :key="endpoint.name"
        :to="endpoint.path"
        class="w-full flex flex-row items-center gap-x-2 px-3 py-2 rounded-lg font-semibold text-lg transition-all duration-75 cursor-pointer hover:bg-neutral-100"
        :class="$route.path === endpoint.path && '!bg-primary-300 shadow-lg shadow-primary-300/500'"
      >
        <component :is="endpoint.icon" class="h-7 w-7 p-0" />
        <h1>{{ endpoint.name }}</h1>
      </RouterLink>
    </div>
  </aside>
</template>
