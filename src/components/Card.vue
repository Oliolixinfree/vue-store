<script setup>
import FavouriteIcon from '@/icons/FavoriteIcon.vue'
import AddIcon from '@/icons/AddIcon.vue'
import CheckIcon from '@/icons/CheckIcon.vue'

defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
})
</script>

<template>
  <div
    class="relative bg-white border border-neutral-200 rounded-lg p-6 cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <FavouriteIcon class="absolute top-6 left-6" />
    <img class="w-50 h-50 rounded-lg" :src="imageUrl" alt="Album" />
    <!-- <div class="w-50 h-50 bg-neutral-400/80 rounded-lg"></div> -->
    <p class="font-medium mt-2">{{ title }}</p>
    <div class="flex items-center justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-neutral-400">Price:</span>
        <span>{{ price }}$</span>
      </div>
      <CheckIcon v-if="isAdded" />
      <AddIcon v-else />
    </div>
  </div>
</template>
