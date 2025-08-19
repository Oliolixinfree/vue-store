<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import ArrowBackIcon from '@/icons/ArrowBackIcon.vue'
import CartItemList from './CartItemList.vue'
import axios from 'axios'
import { baseUrl } from '@/shared/api.config'
import CartInfoBlock from './CartInfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  taxCart: Number,
  cartItems: Number,
})

const { cart } = inject('cart')
const emit = defineEmits(['handleCloseDrawer'])

const isCreating = ref(false)
const orderCreated = ref(false) // <-- состояние создания заказа
const orderNumber = ref(null) // <-- номер заказа, если нужно

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
)
const taxCart = computed(() => totalPrice.value * 0.04)

const buttonDisabled = computed(
  () => isCreating.value || props.totalPrice === 0 || props.taxCart === 0,
)

const lockScroll = () => (document.body.style.overflow = 'hidden')
const unlockScroll = () => (document.body.style.overflow = '')

onMounted(() => lockScroll())
onUnmounted(() => unlockScroll())

const handleClose = () => {
  unlockScroll()
  emit('handleCloseDrawer')
}

const createNewOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post(`${baseUrl}/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value,
      tax: taxCart.value,
    })

    cart.value = []
    orderCreated.value = true
    orderNumber.value = data.id || null // если сервер возвращает id заказа
  } catch (error) {
    console.log(error)
  } finally {
    isCreating.value = false
  }
}
</script>

<template>
  <div @click="handleClose" class="fixed top-0 left-0 w-full h-full z-30 bg-black opacity-50"></div>

  <div class="flex flex-col bg-white min-w-xs max-w-1/3 w-full h-full fixed right-0 top-0 z-30">
    <div class="flex items-center gap-4 p-4 border-b border-neutral-200 shrink-0">
      <ArrowBackIcon
        @click="handleClose"
        class="transition hover:-translate-x-1 hover:fill-neutral-500/80 cursor-pointer"
      />
      <h2 class="text-2xl font-semibold">Cart</h2>
    </div>

    <!-- Показать блок "Заказ создан", только если orderCreated = true -->
    <CartInfoBlock
      v-if="orderCreated"
      title="Order placed"
      :description="`Your order #${orderNumber} will be sent to courier delivery`"
      :handleCloseDrawer="handleClose"
    />

    <!-- Показать блок "Корзина пустая", если totalPrice = 0 -->
    <CartInfoBlock
      v-else-if="totalPrice === 0 || taxCart === 0"
      title="Cart is empty"
      description="Add at least one product to place an order"
      :handleCloseDrawer="handleClose"
    />

    <!-- Иначе показать список товаров и кнопку -->
    <div v-else class="flex flex-col flex-1 min-h-0">
      <div class="flex-1 overflow-y-auto px-6 py-4">
        <CartItemList />
      </div>

      <div class="border-t border-neutral-200 px-6 py-4 bg-white">
        <div class="space-y-2 md:space-y-4">
          <div class="flex gap-0.5">
            <span class="text-neutral-400">Items in cart:</span>
            <div class="flex-1 border-b border-dotted border-neutral-200"></div>
            <span class="font-semibold">{{ props.cartItems }}</span>
          </div>
          <div class="flex gap-0.5">
            <span class="text-neutral-400">Total:</span>
            <div class="flex-1 border-b border-dotted border-neutral-200"></div>
            <span class="font-semibold">{{ totalPrice.toFixed(2) }} $</span>
          </div>
          <div class="flex gap-0.5">
            <span class="text-neutral-400">Tax 4%:</span>
            <div class="flex-1 border-b border-dotted border-neutral-200"></div>
            <span class="font-semibold">{{ taxCart.toFixed(2) }} $</span>
          </div>

          <div class="flex justify-center">
            <button
              :disabled="buttonDisabled"
              @click="createNewOrder"
              class="bg-neutral-500 w-1/2 rounded-lg py-2 text-white hover:bg-neutral-500/80 active:bg-neutral-600 disabled:bg-neutral-200 disabled:cursor-default cursor-pointer transition"
            >
              Check out now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
