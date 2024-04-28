<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
#content {
  padding: var(--padding);
  min-height: 95vh;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: var(--gap);
}
</style>
