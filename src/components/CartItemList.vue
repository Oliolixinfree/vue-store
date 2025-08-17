<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = inject('cart')
</script>

<template>
  <div v-auto-animate class="space-y-2 md:space-y-4">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :author="item.author"
      :price="item.price"
      :imageUrl="item.imageUrl"
      :quantity="item.quantity"
      @on-click-remove="() => removeFromCart(item)"
      @increase-quantity="item.quantity++"
      @decrease-quantity="item.quantity > 1 && item.quantity--"
    />
  </div>
</template>
