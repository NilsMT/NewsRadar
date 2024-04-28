<script setup>
import { defineProps } from 'vue'

defineProps({
  count: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 125
  }
})

const getColor = (count) => {
  const section = Math.ceil(count / 12.5)
  return `var(--search_${section})`
}
</script>

<template>
  <div class="remainingSearch flou" :style="{ backgroundColor: getColor(count) }">
    recherches de lieu restantes : {{ count }}
  </div>
</template>

<style scoped>
.remainingSearch {
  text-align: center;
  padding: 5px;
  width: fit-content;
}
</style>
