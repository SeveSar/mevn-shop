<script lang="ts" setup>
import type { ProductFullDTO } from '@/modules/product';
import type { IDoughItem, ISizeItem } from '@/types/IProduct';
import { api } from '@/api/api';
import { toaster } from '@/main';
import { useCartStore } from '@/modules/cart';
import { useProductsStore } from '@/modules/product';
import { useAuthModalStore } from '@/modules/user';
import { BaseButton, BaseModal, BaseSkeleton } from 'pizza-mevn-ui-kit';

import { computed, ref, watch } from 'vue';
import ModalProductIngredients from './ModalProductIngredients.vue';
import ModalProductTabs from './ModalProductTabs.vue';

const modalStore = useAuthModalStore();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const selectedTabDough = ref<IDoughItem | null>(null);
const selectedTabSize = ref<null | ISizeItem>(null);
const productData = ref<null | ProductFullDTO>(null);
const isLoading = ref(false);
const isLoadingAddingToCart = ref(false);

const totalPrice = computed(() => {
  if (!productData.value || !selectedTabDough.value || !selectedTabSize.value) {
    return 0;
  }
  const ingredientsPrice = productData.value?.ingredients.reduce((sum, item) => {
    if (item.isActive) {
      return (sum += item.price);
    }
    return sum;
  }, 0);

  const price = productData.value.price + selectedTabDough.value.price + selectedTabSize.value.price + ingredientsPrice;

  return price;
});

function toggleActiveIngredient(itemId: string) {
  const ingredientItem = productData.value?.ingredients.find((item) => item.id === itemId);

  if (!ingredientItem) {
    return;
  }

  ingredientItem.isActive = !ingredientItem.isActive;
}

function close() {
  modalStore.closeProductModal();
  selectedTabDough.value = null;
  selectedTabSize.value = null;
  productsStore.activeProductId = '';
}

async function addToCart() {
  if (!selectedTabDough.value || !selectedTabSize.value) {
    return;
  }

  try {
    isLoadingAddingToCart.value = true;
    modalStore.isModalProduct = false;

    await cartStore.addToCart({
      dough: selectedTabDough.value,
      size: selectedTabSize.value,
      ingredients: productData.value?.ingredients.filter((ing) => ing.isActive) ?? [],
    });
  } catch (e) {
    console.error(e);
    toaster.showToast({ text: 'Ошибка', type: 'error' });
  } finally {
    isLoadingAddingToCart.value = false;
  }
}

async function fetchProductById() {
  try {
    isLoading.value = true;
    productData.value = await api.product.fetchProductById(productsStore.activeProductId);
    selectedTabDough.value = productData.value.dough[0];
    selectedTabSize.value = productData.value.sizes[0];
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}

watch(
  () => productsStore.activeProductId,
  (val) => {
    if (val) {
      fetchProductById();
    }
  }
);
</script>

<template>
  <BaseModal :is-open="modalStore.isModalProduct" class="modal-product" content-width="1080px" @close="close">
    <div class="modal-product__body">
      <div class="modal-product__photo">
        <img v-if="!isLoading" :src="productData?.imageUrl" class="modal-product__photo-img" alt="" />
        <BaseSkeleton v-else width="400" height="400" corner="50%" :style="{ margin: 'auto' }" />
      </div>
      <form class="modal-product__info modal-product-info" @submit.prevent="addToCart">
        <div class="modal-product-info__header">
          <h3 v-if="!isLoading" class="modal-product-info__title">
            {{ productData?.title }}
          </h3>
          <BaseSkeleton v-else width="70%" height="18" corner="6" />
        </div>

        <ModalProductIngredients
          :is-loading="isLoading"
          :ingredients="productData?.ingredients.slice(0, 4) ?? []"
          @toggle-active-ingredient="toggleActiveIngredient"
        />

        <ModalProductTabs
          class="modal-product__tabs"
          :is-loading="isLoading"
          :selected-tab-size="selectedTabSize"
          :selected-tab-dough="selectedTabDough"
          :doughs="productData?.dough ?? []"
          :sizes="productData?.sizes ?? []"
          @update:selected-tab-dough="(value) => (selectedTabDough = value)"
          @update:selected-tab-size="(value) => (selectedTabSize = value)"
        />

        <ModalProductIngredients
          :is-loading="isLoading"
          :ingredients="productData?.ingredients.slice(4, productData?.ingredients.length) ?? []"
          @toggle-active-ingredient="toggleActiveIngredient"
        />

        <div class="modal-product-info__footer">
          <template v-if="!isLoading">
            <div class="modal-product-info__price">
              <div class="modal-product-info__price-price">
                Итого:
                <span class="modal-product-info__price-value">
                  {{ totalPrice }}
                  ₽
                </span>
              </div>
            </div>
            <BaseButton type="submit" :is-loading="isLoadingAddingToCart"> Добавить </BaseButton>
          </template>
          <template v-else>
            <BaseSkeleton width="130" height="28" corner="6" />
            <BaseSkeleton width="125" height="48" corner="6" />
          </template>
        </div>
      </form>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.modal-product {
  &__body {
    display: flex;
    @media screen and (max-width: $breakpoint-lg) {
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
  }

  &__photo {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: $breakpoint-lg) {
      width: 100%;
    }
    &-img {
      width: 100%;
      flex-shrink: 0;
    }
  }

  &__info {
    width: 50%;
    @media screen and (max-width: $breakpoint-lg) {
      width: 100%;
    }
  }

  &__tabs {
    margin-bottom: 24px;
  }

  &-info {
    display: flex;
    flex-direction: column;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    &__body {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 24px;
    }

    &__price {
      &-price {
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
      }

      &-value {
        color: $main-color;
      }
    }
  }
}
</style>
