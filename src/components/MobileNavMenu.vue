<script setup>
import { inject } from 'vue'
import FavoriteIcon from '@/icons/FavoriteIcon.vue'
import ProfileIcon from '@/icons/ProfileIcon.vue'
import CartIcon from '@/icons/CartIcon.vue'

defineProps({
  isMobileMenuOpen: Boolean,
})
const { handleOpenDrawer, totalPrice } = inject('cart')
</script>

<template>
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="-translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-transform duration-300 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-2 opacity-0"
  >
    <nav
      v-if="isMobileMenuOpen"
      class="lg:hidden absolute top-full left-0 bg-white p-4 w-full z-10 border-b border-b-neutral-200 rounded-b-lg shadow-xs"
    >
      <ul class="flex flex-col items-start gap-4">
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
  </Transition>
</template>
