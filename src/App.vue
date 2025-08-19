<script setup>
import { computed, inject, provide, ref } from 'vue'
import axios from 'axios'

import Wrapper from './components/Wrapper.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Container from './components/Container.vue'
import Drawer from './components/Drawer.vue'
import { baseUrl } from './shared/api.config'

const items = ref([])
const cart = ref([])
const isDrawerOpen = ref(false)
const isMobileMenuOpen = ref(false)
const quantity = ref(1)

// const { addToCart, removeFromCart } = inject('cart')

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

// const createNewOrder = async () => {
//   try {
//     isCreatingOrder.value = true
//     const { data } = await axios.post(`${baseUrl}/orders`, {
//       items: cart.value,
//       totalPrice: totalPrice.value,
//       tax: taxCart.value,
//     })

//     cart.value = []

//     items.value = items.value.map((item) => ({
//       ...item,
//       isAdded: false,
//     }))

//     return data
//   } catch (error) {
//     console.log(error)
//   } finally {
//     isCreatingOrder.value = false
//   }
// }

// watch(cart, () => localStorage.setItem('cart', JSON.stringify(cart.value)), { deep: true })

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
    @handle-close-drawer="handleCloseDrawer"
  />
  <Wrapper>
    <Header :is-mobile-menu-open="isMobileMenuOpen" @toggle-mobile-menu="toggleMobileMenu" />
    <Container class="flex-1">
      <router-view></router-view>
    </Container>
    <Footer />
  </Wrapper>
</template>
