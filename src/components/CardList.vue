<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
})

const onClickAdd = () => {
  alert('Added to cart!')
}
const onClickFavorite = () => {
  alert('Added to favorite!')
}
</script>

<template>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <Card
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :author="item.author"
      :image-url="item.imageUrl"
      :price="item.price"
      :is-added="true"
      :is-favorite="true"
      :onClickAdd="onClickAdd"
      :onClickFavorite="onClickFavorite"
    />
  </div>
</template>
