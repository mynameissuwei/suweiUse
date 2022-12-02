<script setup lang="ts">
import { useToggle } from '../index'
import { ref } from 'vue'


const [value, toggle] = useToggle()

</script>

<template>
  <div>
    <p>Value: {{ value ? 'ON' : 'OFF' }}</p>
    <button @click="toggle()" class="block-display">
      Toggle
    </button>
    <button @click="value = true" class="block-display">
      Set ON
    </button>
    <button @click="value = false" class="block-display">
      Set OFF
    </button>
  </div>
</template>

<style>
.block-display {
  display: block;
}
</style>
