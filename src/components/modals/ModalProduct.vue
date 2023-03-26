<template>
  <BaseModal
    :isOpen="modalStore.isModalProduct"
    @close="modalStore.closeProductModal()"
    class="modal-product"
  >
    <template #default>
      <div class="modal-product__body">
        <div class="modal-product__photo">
          <img
            class="modal-product__photo-img"
            :src="productsStore.activeProduct?.imageUrl"
            alt=""
          />
        </div>
        <div class="modal-product__info modal-product-info">
          <div class="modal-product-info__header">
            <h3 class="modal-product-info__title">
              {{ productsStore.activeProduct?.title }}
            </h3>
            <button>info</button>
          </div>
          <div class="modal-product-info__body">
            <div class="modal-product-info__tabs">
              <div class="modal-product-info__tabs-dough">
                <BaseTab
                  class="modal-product-info__tab-dough"
                  v-model="selectedTabDough"
                  :items="doughTabs || []"
                ></BaseTab>
              </div>
              <div class="modal-product-info__tabs-sizes">
                <BaseTab
                  class="modal-product-info__tab-size"
                  v-model="selectedTabSize"
                  size="small"
                  :items="sizesTabs || []"
                ></BaseTab>
              </div>
            </div>
          </div>
          <div class="modal-product-info__footer">
            <div class="modal-product-info__price">
              <div class="modal-product-info__price-price">
                Итого:
                <span class="modal-product-info__price-value">
                  {{ totalPrice }} ₽
                </span>
              </div>
            </div>
            <BaseButton> Добавить </BaseButton>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import BaseModal from "../ui/BaseModal.vue";
import { useModalStore } from "../../stores/modal";
import { useProductsStore } from "../../modules/product/stores/products";

import BaseTab from "../ui/BaseTab.vue";
import BaseButton from "../ui/BaseButton.vue";

export default defineComponent({
  components: {
    BaseModal,
    BaseTab,
    BaseButton,
  },

  setup() {
    const modalStore = useModalStore();
    const productsStore = useProductsStore();

    const selectedTabDough = ref<null | {
      title: string;
      id: string;
      price: number;
    }>(null);
    const selectedTabSize = ref<null | {
      title: string;
      id: string;
      price: number;
    }>(null);

    const doughTabs = computed(() => {
      return productsStore.activeProduct?.dough.map((dough) => {
        return {
          ...dough,
          id: dough._id,
          title: dough.title,
        };
      });
    });

    const sizesTabs = computed(() => {
      return productsStore.activeProduct?.sizes.map((size) => {
        return {
          ...size,
          id: size._id,
          title: size.title,
        };
      });
    });

    const totalPrice = computed(() => {
      if (
        !productsStore.activeProduct ||
        !selectedTabDough.value ||
        !selectedTabSize.value
      ) {
        return 0;
      }
      return (
        productsStore.activeProduct?.price +
        selectedTabDough.value?.price +
        selectedTabSize.value?.price
      );
    });

    watch(
      () => productsStore.activeProduct,
      () => {
        selectedTabDough.value = doughTabs.value ? doughTabs.value[0] : null;
        selectedTabSize.value = sizesTabs.value ? sizesTabs.value[0] : null;
      },
      { deep: true }
    );

    return {
      modalStore,
      selectedTabDough,
      selectedTabSize,
      productsStore,
      sizesTabs,
      doughTabs,
      totalPrice,
    };
  },
});
</script>

<style scoped lang="less">
.modal-product {
  &__body {
    display: flex;
  }

  &__photo {
    width: 50%;

    &-img {
      width: 100%;
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

    &__body {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
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
