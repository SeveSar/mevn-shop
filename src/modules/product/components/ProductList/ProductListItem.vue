<script lang="ts">
import type { PropType } from 'vue';
import type { ProductDTO } from '../../models';

import { useProductsStore } from '@/modules/product';
import { useAuthModalStore } from '@/modules/user';
import { BaseButton } from 'pizza-mevn-ui-kit';

import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BaseButton,
  },
  props: {
    product: {
      type: Object as PropType<ProductDTO>,
      required: true,
    },
  },
  setup() {
    const productsStore = useProductsStore();
    const modalAuthStore = useAuthModalStore();
    const openProductModal = (product: ProductDTO) => {
      productsStore.activeProductId = product.id;
      modalAuthStore.openProductModal();
    };
    return {
      productsStore,
      openProductModal,
    };
  },
});
</script>

<template>
  <article class="product">
    <div class="product__img">
      <img :src="(product.imageUrl as string)">
    </div>
    <div class="product__body">
      <h4 class="product__name">
        {{ product.title }}
      </h4>

      <div class="product__descr">
        {{ product.description }}
      </div>

      <!-- <div class="product__text">Рейтинг: {{ product.rating }}</div> -->
    </div>
    <div class="product__actions">
      <BaseButton @click="openProductModal(product)">
        Выбрать
      </BaseButton>

      <div class="product__price">
        от {{ product.price }} ₽
      </div>
    </div>
  </article>
</template>

<style scoped lang="less">
.product {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;

  &__img {
    position: relative;
    padding-bottom: 91.7%;
    margin: 0 auto;
    width: 100%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__body {
    margin-top: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__price {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #ff7010;
  }

  &__name {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: @black-color;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__descr {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: @black-color;
    margin-top: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  &__actions {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .button {
      min-width: 131px;
    }
  }
}
</style>
