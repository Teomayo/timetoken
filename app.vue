<script setup lang="ts">
import InputBar from './components/InputBar.vue';
import TitleBar from './components/TitleBar.vue';
</script>

<template>
  <div class="app">
    <TitleBar />
    <InputBar />
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: antiquewhite
}
</style>