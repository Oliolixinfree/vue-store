<script setup>
import CartIcon from '@/assets/icons/CartIcon.vue'
import FavoriteIcon from '@/assets/icons/FavoriteIcon.vue'
import ProfileIcon from '@/assets/icons/ProfileIcon.vue'
</script>

<template>
  <ul class="flex items-center gap-4">
    <li>
      <CartIcon />
      <b>1000</b>
    </li>
    <li>
      <FavoriteIcon />
      <b>Favorite</b>
    </li>
    <li>
      <ProfileIcon />
      <b>Profile</b>
    </li>
  </ul>
</template>
