<script setup lang="ts">
  import { BeakerIcon, HomeIcon, InformationCircleIcon as InfoIcon } from "@heroicons/vue/solid";

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
</script>

<template>
  <aside
    class="hidden lg:row-span-3 lg:col-span-1 h-full lg:flex flex-col items-center p-4 w-48 dark:bg-neutral-900"
  >
    <h1 class="dark:text-white font-bold text-4xl pt-4 pb-6">GVP</h1>

    <hr class="w-full mb-6 dark:border-neutral-800" />

    <RouterLink to="/" :class="[menuElement, $route.path === '/' ? activeElement : '']">
      <div>
        <HomeIcon class="h-7 w-7 p-0" />
      </div>
      <span>Home</span>
    </RouterLink>

    <RouterLink to="/guides" :class="[menuElement, $route.path === '/guides' ? activeElement : '']">
      <div>
        <BeakerIcon class="h-7 w-7 p-0" />
      </div>
      <span>Guides</span>
    </RouterLink>

    <RouterLink to="/about" :class="[menuElement, $route.path === '/about' ? activeElement : '']">
      <div>
        <InfoIcon class="h-7 w-7 p-0" />
      </div>
      <span>About</span>
    </RouterLink>
  </aside>
</template>
