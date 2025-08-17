<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'

import Wrapper from './components/Wrapper.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Container from './components/Container.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
import SearchIcon from './icons/SearchIcon.vue'

const baseUrl = 'https://dfa9f657ebcd5252.mokky.dev'
const items = ref([])
const cart = ref([])
const isDrawerOpen = ref(false)
const isMobileMenuOpen = ref(false)
const quantity = ref(1)
const isCreatingOrder = ref(false)

const increaseQuantity = () => quantity.value++
const decreaseQuantity = () => {
  if (quantity.value === 1) return
  quantity.value--
}

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
)
const taxCart = computed(() => totalPrice.value * 0.04)

const handleCloseDrawer = () => {
  isDrawerOpen.value = false
}
const handleOpenDrawer = () => {
  isDrawerOpen.value = true
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

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

const addToCart = (item) => {
  cart.value.push({
    ...item,
    quantity: 1,
    isAdded: true,
  })
  item.isAdded = true
}

// const removeFromCart = (item) => {
//   cart.value.splice(cart.value.indexOf(item), 1)
//   item.isAdded = false
// }
const removeFromCart = (item) => {
  cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id)

  const found = items.value.find((i) => i.id === item.id)
  if (found) found.isAdded = false
}

const createNewOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`${baseUrl}/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value,
      tax: taxCart.value,
    })

    cart.value = []

    items.value = items.value.map((item) => ({
      ...item,
      isAdded: false,
    }))

    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}

const onClickAddPlus = (item) => {
  const exists = cart.value.some((cartItem) => cartItem.id === item.id)

  if (!exists) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
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

provide('cart', {
  cart,
  totalPrice,
  quantity,
  handleCloseDrawer,
  handleOpenDrawer,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
})
</script>

<template>
  <Drawer
    v-if="isDrawerOpen"
    :cart-items="cart.length"
    :total-price="totalPrice"
    :tax-cart="taxCart"
    :is-creating-order="isCreatingOrder"
    @handle-close-drawer="handleCloseDrawer"
    @create-new-order="createNewOrder"
  />
  <Wrapper>
    <Header :is-mobile-menu-open="isMobileMenuOpen" @toggle-mobile-menu="toggleMobileMenu" />
    <Container class="flex-1">
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
    </Container>
    <Footer />
  </Wrapper>
</template>
