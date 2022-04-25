<script setup lang="ts">
import {ref} from 'vue';
import ResinCalculated from '../components/ResinCalculated.vue';

const current = ref(0);
const target = ref(160);
</script>

<template>
  <h1>yoo we're very cool company did you know that?</h1>
  <p>summertime is very soon finally</p>
  <p>you can calculate resin here btw</p>
  <input v-model="current" placeholder="your current resin"/>
  <input v-model="target" placeholder="you need resin"/>
  <ResinCalculated :current="current" :target="target"/>
</template>
