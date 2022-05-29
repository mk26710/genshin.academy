<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { MenuIcon, XIcon } from "@heroicons/vue/outline";
import { MoonIcon, SunIcon } from "@heroicons/vue/solid";
import { onClickOutside } from "@vueuse/core";
import { useDark, useToggle } from "@vueuse/core";

const router = useRouter();

const isOpen = ref(false);
const popover = ref(null);

const isDark = useDark({ storageKey: "theme" });
const toggleDark = useToggle(isDark);

onClickOutside(popover, () => {
  isOpen.value = false;
});

// thanks firefox for being great
const firefoxMarginBottomClass = computed(() => {
  if (navigator.userAgent.toLowerCase().includes("firefox")) {
    return "mb-10";
  }
  return "mb-8";
});

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
  <!-- Mobile navigation popover -->
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="-translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-4 opacity-0"
  >
    <aside
      v-show="isOpen"
      :class="firefoxMarginBottomClass"
      class="fixed lg:hidden select-none mr-5 bottom-0 right-0 z-50"
    >
      <div class="bg-neutral-100 border border-neutral-200 rounded-lg p-2" ref="popover">
        <div class="flex flex-col gap-y-2 text-lg font-semibold">
          <div @click="toggleDark()" class="px-3 py-2 border-b border-neutral-200 cursor-pointer">
            <div class="flex flex-row items-center gap-x-2">
              <div class="flex-grow text-right">{{ isDark ? "Light" : "Dark" }}</div>
              <div>
                <component :is="isDark ? SunIcon : MoonIcon" class="w-6 h-6" />
              </div>
            </div>
          </div>

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

          <div @click="isOpen = false" class="px-3 py-2 border-t border-neutral-200 cursor-pointer">
            <div class="flex flex-row items-center gap-x-2">
              <div class="flex-grow text-right">Close</div>
              <div>
                <x-icon class="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </transition>

  <!-- Mobile navigation menu button -->
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="-translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-4 opacity-0"
  >
    <aside
      v-show="!isOpen"
      class="fixed lg:hidden select-none rounded-lg bg-neutral-100 border border-neutral-200 shadow-lg cursor-pointer mr-5 bottom-0 right-0 z-40"
      :class="firefoxMarginBottomClass"
      @click="isOpen = true"
    >
      <MenuIcon class="w-6 h-6 m-3" />
    </aside>
  </transition>

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

    <div class="fixed bottom-4 left-4">
      <div
        @click="toggleDark()"
        class="transition-all duration-75 bg-neutral-200 rounded-lg flex items-center justify-center aspect-square h-8 cursor-pointer"
      >
        <component :is="isDark ? SunIcon : MoonIcon" class="w-5 h-5" />
      </div>
    </div>
  </aside>
</template>
