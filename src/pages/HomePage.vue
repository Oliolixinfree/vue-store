<script setup>
import { reactive, watch, onMounted, inject, ref } from 'vue'
import axios from 'axios'

import SearchIcon from '@/icons/SearchIcon.vue'
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const baseUrl = 'https://dfa9f657ebcd5252.mokky.dev'
const items = ref([])

const filters = reactive({
  searchQuery: '',
  sortBy: 'title',
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
let debounceTimer
const onChangeSearchInput = (event) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    filters.searchQuery = event.target.value
  }, 300)
}

const onClickAddPlus = (item) => {
  const exists = cart.value.some((cartItem) => cartItem.id === item.id)

  if (!exists) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id,
      }
      item.isFavorite = true
      const { data } = await axios.post(`${baseUrl}/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`${baseUrl}/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`${baseUrl}/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`${baseUrl}/items`, {
      params,
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(
  async () => {
    cart.value = JSON.parse(localStorage.getItem('cart')) || []

    await fetchItems()
    await fetchFavorites()

    items.value = items.value.map((item) => ({
      ...item,
      isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
    }))
  },

  // fetch('https://dfa9f657ebcd5252.mokky.dev/items')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data)
  //   })
)

watch(filters, fetchItems, { deep: true })
watch(cart, () => localStorage.setItem('cart', JSON.stringify(cart.value)), { deep: true })
</script>

<template>
  <div class="flex flex-col gap-2 sm:flex-row justify-between mb-4">
    <h2 class="text-2xl font-semibold my-auto">All music</h2>
    <div class="space-y-2">
      <div class="relative">
        <SearchIcon class="absolute top-1 left-1" />
        <input
          @input="onChangeSearchInput"
          class="w-full border border-neutral-200 outline-none focus:ring focus:ring-neutral-300 rounded-lg py-0.5 pl-8 pr-1.5"
          type="text"
          placeholder="Search albums..."
        />
      </div>
      <select
        @change="onChangeSelect"
        class="border border-neutral-200 rounded-lg px-1.5 py-1 outline-none focus:ring focus:ring-neutral-300"
      >
        <option value="title">Title (a-z)</option>
        <option value="-title">Title (z-a)</option>
        <option value="author">Author (a-z)</option>
        <option value="-author">Author (z-a)</option>
        <option value="price">Low price</option>
        <option value="-price">High price</option>
        <option value="id">Oldest</option>
        <option value="-id">Newest</option>
      </select>
    </div>
  </div>
  <CardList
    v-if="items.length > 0"
    :items="items"
    @add-to-favorite="addToFavorite"
    @on-click-add-plus="onClickAddPlus"
  />
  <p v-else class="flex items-center justify-center text-neutral-400 text-center h-64">
    Nothing found.
  </p>
</template>
