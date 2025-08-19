<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: String,
  description: String,
  handleCloseDrawer: Function,
})

const router = useRouter()

const goToStore = () => {
  props.handleCloseDrawer?.()
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col gap-2 items-center flex-1 justify-center p-6">
    <h2 class="text-xl font-bold">{{ props.title }}</h2>
    <p class="text-neutral-400 text-center">{{ props.description }}</p>
    <button
      @click="goToStore"
      class="bg-neutral-500 w-1/2 rounded-lg py-2 text-white hover:bg-neutral-500/80 active:bg-neutral-600 disabled:bg-neutral-200 disabled:cursor-default cursor-pointer transition"
    >
      Go to store
    </button>
  </div>
</template>
