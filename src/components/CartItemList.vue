<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart } = inject('cart')
</script>

<template>
  <div class="space-y-2 md:space-y-4">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :author="item.author"
      :price="item.price"
      :imageUrl="item.imageUrl"
    />
  </div>
</template>
