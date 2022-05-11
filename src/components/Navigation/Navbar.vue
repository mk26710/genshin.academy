<script setup lang="ts">
import { MenuIcon } from "@heroicons/vue/solid";
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <div
    :class="isOpen ? 'fixed' : 'hidden'"
    class="w-full h-full bg-black opacity-70"
    @click="isOpen = false"
  >
    <!-- drop down menu or maybe something like that -->
  </div>

  <nav
    class="navbar lg:hidden p-4 bg-neutral-100 font-semibold h-16 grid grid-rows-1 grid-cols-[1fr_auto]"
  >
    <div class="self-center justify-self-center">
      <span>
        <router-link to="/">Home </router-link>
        |
        <router-link to="/guides">Guides</router-link>
        |
        <router-link to="/about">About </router-link>
      </span>
    </div>

    <div>
      <MenuIcon @click="isOpen = !isOpen" class="h-8 w-8 cursor-pointer" />
    </div>
  </nav>
</template>
