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
  released: String,
  gener: String,
  type: String,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})
</script>

<template>
  <div
    class="flex flex-col relative bg-white border border-neutral-200 rounded-lg p-6 cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div
      @click="onClickFavorite"
      :class="isFavorite && 'bg-pink-200 hover:bg-pink-300'"
      class="absolute top-6 left-6 bg-neutral-100 p-0.5 rounded-lg hover:bg-neutral-200 hover:shadow-md"
    >
      <FavoriteCheckedIcon v-if="isFavorite" />
      <FavouriteIcon v-else />
    </div>
    <img class="object-cover rounded-lg" :src="imageUrl" alt="Album" />
    <div class="flex-1">
      <p class="font-medium mt-2">{{ title }}</p>
      <div class="flex items-center gap-2">
        <span class="text-neutral-400">by</span>
        <span class="hover:underline hover:text-neutral-500/80 transition">{{ author }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-neutral-400">Released: </span>
        <span class="hover:underline hover:text-neutral-500/80 transition">{{ released }}</span>
      </div>
      <span class="text-neutral-400 capitalize">{{ type }}</span>
    </div>

    <div class="flex flex-wrap gap-2">
      <div
        v-for="(genre, index) in gener.split(',').map((g) => g.trim())"
        :key="index"
        class="bg-neutral-300 text-white px-1 py-0.5 rounded-lg"
      >
        {{ genre }}
      </div>
    </div>
    <div class="flex items-center justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-neutral-400">Price:</span>
        <span class="font-semibold">{{ price }}$</span>
      </div>
      <div
        @click="onClickAdd"
        class="p-0.5 rounded-lg hover:shadow-md"
        :class="{
          'bg-lime-200 hover:bg-lime-300': isAdded,
          'bg-neutral-100 hover:bg-neutral-200': !isAdded,
        }"
      >
        <CheckIcon v-if="isAdded" />
        <AddIcon v-else />
      </div>
    </div>
  </div>
</template>
