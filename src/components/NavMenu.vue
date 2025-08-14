<script setup>
import CartIcon from '@/icons/CartIcon.vue'
import FavoriteIcon from '@/icons/FavoriteIcon.vue'
import ProfileIcon from '@/icons/ProfileIcon.vue'
</script>

<template>
  <nav>
    <ul class="flex items-center gap-4">
      <li class="flex items-center gap-2 text-neutral-500 hover:text-neutral-500/80 cursor-pointer">
        <CartIcon />
        <span class="font-semibold">1000</span>
      </li>
      <li class="flex items-center gap-2 text-neutral-500 hover:text-neutral-500/80 cursor-pointer">
        <FavoriteIcon />
        <span class="font-semibold">Favorite</span>
      </li>
      <li class="flex items-center gap-2 text-neutral-500 hover:text-neutral-500/80 cursor-pointer">
        <ProfileIcon />
        <span class="font-semibold">Profile</span>
      </li>
    </ul>
  </nav>
</template>
