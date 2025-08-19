<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean,
})

const emit = defineEmits(['addToFavorite', 'onClickAddPlus'])

// const addToFavorite = inject('addToFavorite')
</script>

<template>
  <div v-auto-animate class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :author="item.author"
      :image-url="item.imageUrl"
      :price="item.price"
      :released="item.released"
      :type="item.type"
      :gener="item.gener"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :onClickAdd="isFavorites ? null : () => emit('onClickAddPlus', item)"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorite"
    />
  </div>
</template>
