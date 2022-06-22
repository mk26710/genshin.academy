<script setup lang="ts"></script>

<template>
  <Transition name="fade" mode="out-in" appear>
    <div class="flex flex-col items-center justify-center w-full h-full">
      <div>
        <div
          style="border-top-color: transparent"
          class="w-16 h-16 border-[6px] border-primary-500 dark:border-primary-400 border-solid rounded-full animate-spin"
        ></div>
      </div>
    </div>
  </Transition>
</template>
