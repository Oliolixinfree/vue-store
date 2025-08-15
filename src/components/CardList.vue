<script setup>
import { inject } from 'vue'
import Card from './Card.vue'

defineProps({
  items: Array,
})

const addToFavorite = inject('addToFavorite')
</script>

<template>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :author="item.author"
      :image-url="item.imageUrl"
      :price="item.price"
      :isAdded="true"
      :isFavorite="item.isFavorite"
      :onClickAdd="onClickAdd"
      :onClickFavorite="() => addToFavorite(item)"
    />
  </div>
</template>
