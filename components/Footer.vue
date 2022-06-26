<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import DiscordLogo from "@/components/icons/DiscordLogo.vue";
import GitHubLogo from "@/components/icons/GitHubLogo.vue";
</script>

<template>
  <footer
    class="footer grid grid-cols-1 lg:grid-cols-[1fr_auto] grid-rows-[auto_auto] lg:grid-rows-1 py-4 mx-4 text-neutral-400 dark:text-neutral-600 border-t border-neutral-200 dark:border-neutral-200/10"
  >
    <p>
      genshin.zenless.club is not affiliated with
      <a
        class="hover:text-primary-500 transition-colors ease-in-out duration-200"
        target="_blank"
        href="https://www.mihoyo.com/"
        >miHoYo</a
      >. <br />
      All in-game content is the property of
      <a
        class="hover:text-primary-500 transition-colors ease-in-out duration-200"
        target="_blank"
        href="https://www.mihoyo.com/"
        >miHoYo Co., Ltd</a
      >.
    </p>

    <div
      class="place-self-start lg:place-self-center flex flex-col lg:flex-row gap-x-6 gap-y-2 mt-6 lg:mt-0 font-bold"
    >
      <a
        href="https://github.com/kitsune-guuji/gvp"
        target="_blank"
        class="hover:text-primary-500 ransition-colors ease-in-out duration-200"
      >
        <div class="flex flex-row gap-x-2 items-center">
          <GitHubLogo class="w-4 h-auto inline-block" />
          <p>GitHub</p>
        </div>
      </a>

      <a
        href="https://discord.gg/TgyFNhthCK"
        class="hover:text-primary-500 transition-colors ease-in-out duration-200"
      >
        <div class="flex flex-row gap-x-2 items-center">
          <DiscordLogo class="w-4 h-auto inline-block" />
          <p>Discord</p>
        </div>
      </a>
    </div>
  </footer>
</template>
