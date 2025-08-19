<script setup>
import { inject } from 'vue'
import CartIcon from '@/icons/CartIcon.vue'
import FavoriteIcon from '@/icons/FavoriteIcon.vue'
import ProfileIcon from '@/icons/ProfileIcon.vue'

const { handleOpenDrawer, totalPrice } = inject('cart')
</script>

<template>
  <nav>
    <ul class="flex flex-col sm:flex-row items-center gap-4">
      <li
        @click="handleOpenDrawer"
        class="flex items-center gap-2 text-neutral-500 hover:text-neutral-500/80 cursor-pointer"
      >
        <CartIcon />
        <span class="font-semibold">{{ totalPrice.toFixed(2) }} $</span>
      </li>
      <router-link to="/favorites">
        <li
          class="flex items-center gap-2 text-neutral-500 hover:text-neutral-500/80 cursor-pointer"
        >
          <FavoriteIcon />
          <span class="font-semibold">Favorite</span>
        </li>
      </router-link>
      <router-link to="/profile">
        <li
          class="flex items-center gap-2 text-neutral-500 hover:text-neutral-500/80 cursor-pointer"
        >
          <ProfileIcon />
          <span class="font-semibold">Profile</span>
        </li>
      </router-link>
    </ul>
  </nav>
</template>
