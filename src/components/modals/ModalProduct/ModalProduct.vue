<template>
  <BaseModal :isOpen="isOpen" @close="close" class="modal-product">
    <template #default>
      <div class="modal-product__body">
        <div class="modal-product__photo">
          <img class="modal-product__photo-img" :src="productsStore.getActiveProduct?.imageUrl" alt="" />
        </div>
        <form class="modal-product__info modal-product-info" @submit.prevent="addToCart">
          <div class="modal-product-info__header">
            <h3 class="modal-product-info__title">
              {{ productsStore.getActiveProduct?.title }}
            </h3>
          </div>
          <div class="modal-product-info__ingredients">
            <div
              class="modal-product-info__ingredient"
              :class="{
                'modal-product-info__ingredient--active': item.isActive,
              }"
              v-for="item in ingredients.slice(0, 4)"
              :key="item.id"
              @click="toggleActiveIngredient(item.id)"
            >
              <div class="modal-product-info__ingredient-icon">
                <img :src="item.img" alt="" />
                <AppIcon class="modal-product-info__ingredient-checkmark" name="IconTickCircle" />
              </div>
              <div class="modal-product-info__ingredient-info">
                <div class="modal-product-info__ingredient-title">
                  {{ item.title }}
                </div>
                <div class="modal-product-info__ingredient-price">
                  {{ item.price }}
                  ₽
                </div>
              </div>
            </div>
          </div>
          <div class="modal-product-info__body">
            <div class="modal-product-info__tabs">
              <div class="modal-product-info__tabs-dough">
                <BaseTab
                  class="modal-product-info__tab-dough"
                  v-model="selectedTabDough"
                  :items="productsStore.getActiveProduct?.dough || []"
                ></BaseTab>
              </div>
              <div class="modal-product-info__tabs-sizes">
                <BaseTab
                  class="modal-product-info__tab-size"
                  v-model="selectedTabSize"
                  size="small"
                  :items="productsStore.getActiveProduct?.sizes || []"
                ></BaseTab>
              </div>
            </div>
          </div>
          <div class="modal-product-info__ingredients">
            <div
              class="modal-product-info__ingredient"
              :class="{
                'modal-product-info__ingredient--active': item.isActive,
              }"
              v-for="item in ingredients.slice(4, ingredients.length)"
              :key="item.id"
              @click="toggleActiveIngredient(item.id)"
            >
              <div class="modal-product-info__ingredient-icon">
                <img :src="item.img" alt="" />
                <AppIcon class="modal-product-info__ingredient-checkmark" name="IconTickCircle" />
              </div>
              <div class="modal-product-info__ingredient-info">
                <div class="modal-product-info__ingredient-title">
                  {{ item.title }}
                </div>
                <div class="modal-product-info__ingredient-price">
                  {{ item.price }}
                  ₽
                </div>
              </div>
            </div>
          </div>
          <div class="modal-product-info__footer">
            <div class="modal-product-info__price">
              <div class="modal-product-info__price-price">
                Итого:
                <span class="modal-product-info__price-value">
                  {{ totalPrice }}
                  ₽
                </span>
              </div>
            </div>
            <BaseButton type="submit"> Добавить </BaseButton>
          </div>
        </form>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import BaseModal from "../../ui/BaseModal.vue";
import { useModalStore } from "../../../stores/modal";
import { useProductsStore } from "@/modules/product/stores/products";
import { useCartStore } from "@/modules/cart/stores/cart";
import AppIcon from "../../ui/AppIcon/AppIcon.vue";

import BaseTab from "../../ui/BaseTab.vue";
import BaseButton from "../../ui/BaseButton.vue";
import type { IIngredientItem } from "@/models/IProduct";

interface ISelectedTabSize {
  title: string;
  id: string;
  price: number;
}

interface ISelectedTabDough {
  title: string;
  id: string;
  price: number;
}

export default defineComponent({
  components: {
    BaseModal,
    BaseTab,
    BaseButton,
    AppIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  setup() {
    const modalStore = useModalStore();
    const productsStore = useProductsStore();
    const cartStore = useCartStore();

    const selectedTabDough = ref<ISelectedTabDough | null>(null);
    const selectedTabSize = ref<null | ISelectedTabSize>(null);
    const ingredients = ref<IIngredientItem[]>([]);

    const totalPrice = computed(() => {
      if (!productsStore.getActiveProduct || !selectedTabDough.value || !selectedTabSize.value) {
        return 0;
      }
      const ingredientsPrice = ingredients.value.reduce((sum, item) => {
        if (item.isActive) {
          return (sum += item.price);
        }
        return sum;
      }, 0);

      const price = productsStore.getActiveProduct.price + selectedTabDough.value.price + selectedTabSize.value.price + ingredientsPrice;

      return price;
    });

    const toggleActiveIngredient = (itemId: string) => {
      const ingredientItem = ingredients.value.find((item) => item.id === itemId);

      if (!ingredientItem) return;

      ingredientItem.isActive = !ingredientItem.isActive;
    };

    const close = () => {
      modalStore.closeProductModal();
      selectedTabDough.value = null;
      selectedTabSize.value = null;
    };

    const addToCart = () => {
      const ingredientsIds = ingredients.value.filter((item) => item.isActive).map((item) => item.id);
      cartStore.addToCart({
        productId: productsStore.activeProductId,
        dough: selectedTabDough.value?.id || "",
        size: selectedTabSize.value?.id || "",
        ingredientsIds,
        productPrice: totalPrice.value,
      });
    };

    watch(
      () => productsStore.getActiveProduct,
      () => {
        selectedTabDough.value = productsStore.getActiveProduct ? { ...productsStore.getActiveProduct.dough[0] } : null;
        selectedTabSize.value = productsStore.getActiveProduct ? { ...productsStore.getActiveProduct.sizes[0] } : null;
        ingredients.value = productsStore.getActiveProduct ? JSON.parse(JSON.stringify(productsStore.getActiveProduct.ingredients)) : [];
        console.log(selectedTabDough);
        console.log(selectedTabSize);
      }
    );
    watch(selectedTabDough, (val) => {
      console.log(val, "val");
    });

    return {
      modalStore,
      close,
      selectedTabDough,
      selectedTabSize,
      productsStore,
      totalPrice,
      toggleActiveIngredient,
      ingredients,
      addToCart,
    };
  },
});
</script>

<style scoped lang="less">
.modal-product {
  & :deep(.modal) {
    max-width: 1080px;
  }

  &__body {
    display: flex;
  }

  &__photo {
    width: 50%;
    display: flex;
    align-items: center;

    &-img {
      width: 100%;
      flex-shrink: 0;
    }
  }

  &__info {
    width: 50%;
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

    &__ingredients {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    &__ingredient {
      width: calc((100% / 4) - 20px);

      &:hover {
        .modal-product-info__ingredient-icon {
          border-color: @main-color;
        }
      }

      &--active {
        .modal-product-info__ingredient-icon {
          border-color: @main-color;
        }

        .modal-product-info__ingredient-checkmark {
          opacity: 1;
        }
      }

      &-icon {
        width: 100%;
        height: 105px;
        border-radius: 12px;
        border: 1px solid #f0f0f0;
        flex-shrink: 0;
        cursor: pointer;
        transition: all 0.2s linear;
        display: inline-flex;
        position: relative;

        img {
          margin: auto;
        }
      }

      &-checkmark {
        position: absolute;
        top: 8px;
        right: 8px;
        color: @main-color;
        opacity: 0;
        transition: all 0.2s linear;
      }

      &-info {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        margin-top: 8px;
      }

      &-price {
        color: @main-color;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 24px;
    }

    &__tab-dough,
    &__tab-size {
      border: 1px solid @gray-color;
      border-radius: 6px;
    }

    &__tab-size {
      &:deep(.base-tab__tab) {
        width: calc(100% / 3);
        flex-grow: 1;
      }
    }

    &__tab-dough {
      margin-bottom: 16px;

      &:deep(.base-tab__tab) {
        width: calc(100% / 2);
        flex-grow: 1;
      }
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
        color: @main-color;
      }
    }
  }
}
</style>
