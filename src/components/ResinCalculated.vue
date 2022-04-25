<script setup lang="ts">
import { unixToDate, calculateResinTime } from "../lib"

defineProps<{
    current: number,
    target: number
}>()

</script>

<template>
    {{ unixToDate(calculateResinTime(current, target)) }}
</template>

<style>
</style>
