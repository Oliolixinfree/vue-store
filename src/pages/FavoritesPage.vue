<script setup>
import { onMounted, ref } from 'vue'
import { baseUrl } from '@/shared/api.config'
import axios from 'axios'
import CardList from '@/components/CardList.vue'

const favoritesItems = ref([])

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/favorites?_relations=items`)

    // items.value = items.value.map((item) => {
    //   const favorite = favorites.find((favorite) => favorite.parentId === item.id)

    //   if (!favorite) {
    //     return item
    //   }

    //   return {
    //     ...item,
    //     isFavorite: true,
    //     favoriteId: favorite.id,
    //   }
    // })
    favoritesItems.value = data.map((obj) => obj.item)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  fetchFavorites()
})
</script>
<template>
  <h2 class="text-2xl font-semibold my-auto mb-4">Favorites</h2>
  <CardList v-if="favoritesItems.length > 0" :items="favoritesItems" is-favorites />
  <p v-else class="flex items-center justify-center text-neutral-400 text-center h-64">
    Nothing found.
  </p>
</template>
