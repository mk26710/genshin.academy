<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import DiscordLogo from "@/components/icons/DiscordLogo.vue";
import GitHubLogo from "@/components/icons/GitHubLogo.vue";
</script>

<template>
  <footer
    class="footer grid grid-cols-1 lg:grid-cols-[1fr_1fr] grid-rows-[auto_auto] lg:grid-rows-1 py-4 mx-4 border-t border-neutral-200"
  >
    <p class="opacity-50">
      genshin.zenless.club is not affiliated with
      <a class="text-sky-600" target="_blank" href="https://www.mihoyo.com/">miHoYo</a>. <br />
      All in-game content is the property of
      <a class="text-sky-600" target="_blank" href="https://www.mihoyo.com/">miHoYo Co., Ltd</a>.
    </p>

    <div class="flex flex-col lg:flex-row mt-4 lg:mt-0 gap-x-6 gap-y-2 font-bold text-lg">
      <a
        href="https://github.com/kitsune-guuji/gvp"
        target="_blank"
        class="opacity-50 hover:opacity-100"
      >
        <div class="flex flex-row gap-x-2 items-center">
          <GitHubLogo class="w-6 h-auto inline-block" />
          <p>GitHub</p>
        </div>
      </a>

      <a href="#" class="opacity-50 hover:opacity-100">
        <div class="flex flex-row gap-x-2 items-center">
          <DiscordLogo class="w-6 h-auto inline-block" />
          <p>Discord</p>
        </div>
      </a>
    </div>
  </footer>
</template>
