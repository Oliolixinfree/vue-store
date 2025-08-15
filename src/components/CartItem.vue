<script setup lang="ts">
import DeleteIcon from '@/icons/DeleteIcon.vue'
</script>

<template>
  <div class="flex items-center gap-4 border border-neutral-200 p-4 rounded-lg">
    <img class="w-16 h-16 rounded-lg" src="/albums/1.jpg" alt="Album" />

    <div class="flex flex-col w-full">
      <p>Album name</p>

      <div class="flex justify-between">
        <span class="">4.99$</span>
        <div
          class="bg-neutral-100 p-0.5 rounded-lg opacity-80 hover:opacity-100 transition cursor-pointer"
        >
          <DeleteIcon />
        </div>
      </div>
    </div>
  </div>
</template>
