<script setup>
import ArrowBackIcon from '@/icons/ArrowBackIcon.vue'
import CartItem from './CartItem.vue'
import CartItemList from './CartItemList.vue'
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full z-10 bg-black opacity-50"></div>
  <div
    class="flex flex-col bg-white min-w-74 max-w-1/3 w-full h-full fixed right-0 top-0 z-20 px-6 py-4"
  >
    <div class="flex items-center gap-4 mb-4">
      <ArrowBackIcon
        class="transition hover:-translate-x-1 hover:fill-neutral-500/80 cursor-pointer"
      />
      <h2 class="text-2xl font-semibold">Card</h2>
    </div>
    <CartItemList class="flex-1" />

    <div class="space-y-2 md:space-y-4 my-4">
      <div class="flex gap-0.5">
        <span class="text-neutral-400">Total:</span>
        <div class="flex-1 border-b border-dotted border-neutral-200"></div>
        <span class="font-semibold">50$</span>
      </div>
      <div class="flex gap-0.5">
        <span class="text-neutral-400">Tax 4%:</span>
        <div class="flex-1 border-b border-dotted border-neutral-200"></div>
        <span class="font-semibold">2$</span>
      </div>
    </div>
    <button
      class="bg-neutral-500 w-full rounded-lg py-2 text-white hover:bg-neutral-500/80 active:bg-neutral-600 disabled:bg-neutral-200 disabled:cursor-default cursor-pointer transition"
    >
      Check out now
    </button>
  </div>
</template>
