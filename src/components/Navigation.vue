<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

const router = useRouter();

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
  <!-- 
    Mobile Navbar
    Note: select-none on nav is actually needed here otherwise it does some weird stuff on mobile firefox lol idk why
  -->
  <nav
    data-description="Mobile Bottom Navigation"
    class="fixed lg:hidden bottom-0 h-14 w-full flex flex-row flex-wrap bg-neutral-100 border-t border-neutral-200 select-none z-10"
  >
    <div class="flex-grow self-center pl-6">
      <h1 class="font-extrabold text-lg">GENSHIN.ZENLESS</h1>
    </div>

    <Popover v-slot="{ open }">
      <PopoverButton as="div" class="h-full flex items-center px-6 cursor-pointer">
        <component :is="open ? XIcon : MenuIcon" class="w-6 h-6" />
      </PopoverButton>

      <PopoverPanel as="div" class="fixed bottom-14 mb-4 mr-4 right-0 z-50">
        <div class="bg-neutral-100 border border-neutral-200 rounded-lg p-2">
          <div class="flex flex-col gap-y-2 text-lg font-semibold">
            <RouterLink
              v-for="endpoint in [...endpoints].reverse()"
              :key="endpoint.name"
              :to="endpoint.path"
              class="px-3 py-2 rounded-lg"
              active-class="bg-primary-500 text-white shadow-sm shadow-primary-300/50"
            >
              <div class="flex flex-row items-center gap-x-2">
                <div class="flex-grow text-right">
                  {{ endpoint.name }}
                </div>
                <div>
                  <component :is="endpoint.icon" class="w-6 h-6" />
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  </nav>

  <!-- Desktop Sidebard -->
  <aside
    data-description="Desktop Sidebar Navigation"
    class="sidebar hidden lg:flex flex-col w-64 border-r border-neutral-200 bg-neutral-100 h-full"
  >
    <div class="flex flex-col gap-y-2 sticky top-0 p-4 w-full">
      <div class="self-center py-4 mb-2 border-b border-neutral-200">
        <h1 class="font-extrabold text-xl">GENSHIN.ZENLESS</h1>
      </div>

      <RouterLink
        v-for="endpoint in endpoints"
        :key="endpoint.name"
        :to="endpoint.path"
        class="w-full flex flex-row items-center gap-x-2 px-3 py-2 rounded-lg font-semibold text-lg transition-all duration-75 cursor-pointer hover:bg-primary-50/50"
        active-class="!bg-primary-500 text-white shadow-lg shadow-primary-300/50"
      >
        <component :is="endpoint.icon" class="h-7 w-7 p-0" />
        <h1>{{ endpoint.name }}</h1>
      </RouterLink>
    </div>
  </aside>
</template>
