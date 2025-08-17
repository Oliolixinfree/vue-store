<script setup>
import { onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'

import Wrapper from './components/Wrapper.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Container from './components/Container.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
import SearchIcon from './icons/SearchIcon.vue'

const items = ref([])
const cart = ref([])
const isDrawerOpen = ref(false)

const baseUrl = 'https://dfa9f657ebcd5252.mokky.dev'

const handleCloseDrawer = () => (isDrawerOpen.value = false)

const handleOpenDrawer = () => (isDrawerOpen.value = true)

const filters = reactive({
  searchQuery: '',
  sortBy: 'title',
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const addToCart = (item) => {
  if (!item.isAdded) {
    cart.value.push(item)
    item.isAdded = true
  } else {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
  }

  console.log(cart)
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`${baseUrl}/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

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

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
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

onMounted(
  async () => {
    await fetchItems()
    await fetchFavorites()
  },

  // fetch('https://dfa9f657ebcd5252.mokky.dev/items')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data)
  //   })
)

watch(filters, fetchItems)

provide('cart', {
  cart,
  handleCloseDrawer,
  handleOpenDrawer,
})
</script>

<template>
  <Drawer v-if="isDrawerOpen" @handleCloseDrawer="handleCloseDrawer" />
  <Wrapper>
    <Header />
    <Container>
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
      <CardList :items="items" @addToFavorite="addToFavorite" @addToCart="addToCart" />
    </Container>
    <Footer />
  </Wrapper>
</template>
