<script setup>
import { defineProps } from 'vue'

defineProps({
  count: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 10
  }
})

const getColor = (count) => {
  return `var(--search_${count})`
}
</script>

<template>
  <div class="remainingSearch flou" :style="{ backgroundColor: getColor(count) }">
    recherches d'articles restantes : {{ count }}
  </div>
</template>

<style scoped>
.remainingSearch {
  text-align: center;
  padding: 5px;
  width: fit-content;
}
</style>
