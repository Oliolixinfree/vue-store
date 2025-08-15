<script setup>
import FavouriteIcon from '@/icons/FavoriteIcon.vue'
import AddIcon from '@/icons/AddIcon.vue'
import CheckIcon from '@/icons/CheckIcon.vue'
import FavoriteCheckedIcon from '@/icons/FavoriteCheckedIcon.vue'

const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  author: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})
</script>

<template>
  <div
    class="relative bg-white border border-neutral-200 rounded-lg p-6 cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div
      @click="onClickFavorite"
      :class="isFavorite && 'bg-pink-200 hover:bg-pink-300'"
      class="absolute top-6 left-6 bg-neutral-100 p-0.5 rounded-lg hover:bg-neutral-200 hover:shadow-md"
    >
      <FavoriteCheckedIcon v-if="isFavorite" />
      <FavouriteIcon v-else />
    </div>
    <img class="w-50 h-50 rounded-lg" :src="imageUrl" alt="Album" />
    <!-- <div class="w-50 h-50 bg-neutral-400/80 rounded-lg"></div> -->
    <p class="font-medium mt-2">{{ title }}</p>
    <div class="flex items-center gap-2">
      <span class="text-neutral-400">by</span>
      <span class="hover:underline hover:text-neutral-500/80 transition">{{ author }}</span>
    </div>
    <div class="flex items-center justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-neutral-400">Price:</span>
        <span class="font-semibold">{{ price }}$</span>
      </div>
      <div
        @click="onClickAdd"
        :class="isAdded && 'bg-lime-200'"
        class="bg-neutral-100 p-0.5 rounded-lg hover:bg-neutral-200 hover:shadow-md"
      >
        <CheckIcon v-if="isAdded" />
        <AddIcon v-else />
      </div>
    </div>
  </div>
</template>
