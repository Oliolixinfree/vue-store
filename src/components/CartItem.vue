<script setup>
import { inject, ref } from 'vue'
import AddIcon from '@/icons/AddIcon.vue'
import DeleteIcon from '@/icons/DeleteIcon.vue'
import RemoveIcon from '@/icons/RemoveIcon.vue'

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  author: String,
  price: Number,
  released: String,
  gener: String,
  type: String,
  quantity: Number,
})

const emit = defineEmits(['onClickRemove', 'increaseQuantity', 'decreaseQuantity'])
</script>

<template>
  <div class="flex items-start gap-2 border border-neutral-200 p-4 rounded-lg">
    <img class="w-16 h-16 rounded-lg" :src="imageUrl" :alt="title" />
    <div class="flex flex-col flex-1">
      <p class="font-medium line-clamp-2">{{ title }}</p>
      <div class="flex items-center gap-2">
        <span class="text-neutral-400">by</span>
        <span class="cursor-pointer hover:underline hover:text-neutral-500/80 transition">
          {{ author }}
        </span>
      </div>

      <div class="flex gap-2">
        <span class="text-neutral-400">Price: </span>
        <span class="font-semibold">{{ (price * quantity).toFixed(2) }} $</span>
      </div>
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <div
            @click="() => emit('decreaseQuantity')"
            class="bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 hover:shadow-md p-0.5 rounded-lg transition cursor-pointer"
          >
            <RemoveIcon class="w-5 h-5" />
          </div>
          <span class="font-medium">{{ quantity }}</span>
          <div
            @click="() => emit('increaseQuantity')"
            class="bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 hover:shadow-md p-0.5 rounded-lg transition cursor-pointer"
          >
            <AddIcon class="w-5 h-5" />
          </div>
        </div>

        <div
          @click="emit('onClickRemove')"
          class="self-end bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 hover:shadow-md p-0.5 rounded-lg transition cursor-pointer"
        >
          <DeleteIcon />
        </div>
      </div>
    </div>
  </div>
</template>
