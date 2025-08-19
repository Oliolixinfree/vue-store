<script setup>
import LogoIcon from '@/icons/LogoIcon.vue'
import NavMenu from './NavMenu.vue'
import MenuIcon from '@/icons/MenuIcon.vue'
import CloseIcon from '@/icons/CloseIcon.vue'
import MobileNavMenu from './MobileNavMenu.vue'

defineProps({
  isMobileMenuOpen: Boolean,
})

const emit = defineEmits(['toggleMobileMenu'])
</script>

<template>
  <header
    class="sticky top-0 left-0 flex items-center justify-between border-b border-b-neutral-200 px-6 py-4 lg:px-8 bg-white z-20"
  >
    <router-link to="/">
      <div
        class="flex items-center gap-2 cursor-pointer hover:drop-shadow-[0_0_16px_#42b883aa] transition"
      >
        <LogoIcon />
        <div>
          <h2 class="text-xl font-bold">Vue Store</h2>
          <p class="text-neutral-400">Mock music store</p>
        </div>
      </div>
    </router-link>
    <div @click="() => emit('toggleMobileMenu')" class="lg:hidden cursor-pointer">
      <CloseIcon
        v-if="isMobileMenuOpen"
        class="hover:fill-neutral-400 active:fill-neutral-300 transition"
      />
      <MenuIcon v-else class="hover:fill-neutral-400 active:fill-neutral-300 transition" />
    </div>
    <MobileNavMenu :is-mobile-menu-open="isMobileMenuOpen" />
    <NavMenu class="hidden lg:block" />
  </header>
</template>
