<template>
  <ul class="cart-list" v-if="cart.length">
    <li class="cart-list__item" v-for="item in cart" :key="item.id">
      <CartListItem :itemCart="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import CartListItem from "./CartListItem.vue";
import type { ICart } from "@/models/ICart";
defineProps<{
  cart: ICart[];
}>();
</script>

<style scoped lang="less"></style>
