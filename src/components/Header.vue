<script setup>
import NavMenu from './NavMenu.vue'
</script>

<template>
  <header class="flex items-center justify-between border-b border-b-neutral-200 px-6 py-4">
    <div class="flex items-center gap-2">
      <div class="w-10 h-10 rounded-full bg-neutral-500"></div>
      <div>
        <h2 class="text-xl font-bold">Vue Store</h2>
        <p class="text-neutral-400">Description</p>
      </div>
    </div>
    <NavMenu />
  </header>
</template>
