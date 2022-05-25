<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import DiscordLogo from "@/components/icons/DiscordLogo.vue";
import GitHubLogo from "@/components/icons/GitHubLogo.vue";
</script>

<template>
  <footer
    class="footer grid grid-cols-1 lg:grid-cols-[1fr_auto] grid-rows-[auto_auto] lg:grid-rows-1 py-4 mx-4 border-t border-neutral-200"
  >
    <p class="text-sm text-neutral-400">
      genshin.zenless.club is not affiliated with
      <a
        class="text-primary-400 hover:text-primary-600 transition-colors ease-in-out duration-200"
        target="_blank"
        href="https://www.mihoyo.com/"
        >miHoYo</a
      >. <br />
      All in-game content is the property of
      <a
        class="text-primary-400 hover:text-primary-600 transition-colors ease-in-out duration-200"
        target="_blank"
        href="https://www.mihoyo.com/"
        >miHoYo Co., Ltd</a
      >.
    </p>

    <div
      class="place-self-start lg:place-self-center flex flex-col lg:flex-row gap-x-6 gap-y-2 mt-6 lg:mt-0 font-bold text-sm text-neutral-400"
    >
      <a
        href="https://github.com/kitsune-guuji/gvp"
        target="_blank"
        class="hover:text-neutral-700 transition-colors ease-in-out duration-200"
      >
        <div class="flex flex-row gap-x-2 items-center">
          <GitHubLogo class="w-4 h-auto inline-block" />
          <p>GitHub</p>
        </div>
      </a>

      <a href="#" class="hover:text-neutral-700 transition-colors ease-in-out duration-200">
        <div class="flex flex-row gap-x-2 items-center">
          <DiscordLogo class="w-4 h-auto inline-block" />
          <p>Discord</p>
        </div>
      </a>
    </div>
  </footer>
</template>
