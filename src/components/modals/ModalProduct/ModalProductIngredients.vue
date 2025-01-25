<script setup lang="ts">
import type { IIngredientItem } from '@/types/IProduct';
import BaseIcon from '@/components/ui/BaseIcon/BaseIcon.vue';
import BaseSkeleton from '@/components/ui/BaseSkeleton.vue';

interface Props {
  ingredients: IIngredientItem[]
  isLoading: boolean
}

defineProps<Props>();
const emit = defineEmits(['toggleActiveIngredient']);
</script>

<template>
  <div class="modal-ingredients">
    <template v-if="!isLoading">
      <div
        v-for="item in ingredients"
        :key="item.id"
        class="modal-ingredients__ingredient"
        :class="{
          'modal-ingredients__ingredient--active': item.isActive,
        }"
        @click="emit('toggleActiveIngredient', item.id)"
      >
        <div class="modal-ingredients__ingredient-icon">
          <img :src="item.img" alt="">
          <BaseIcon name="IconTickCircle" class="modal-ingredients__ingredient-checkmark" />
        </div>
        <div class="modal-ingredients__ingredient-info">
          <div class="modal-ingredients__ingredient-title">
            {{ item.title }}
          </div>
          <div class="modal-ingredients__ingredient-price">
            {{ item.price }}
            ₽
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="i in 4" :key="i" class="modal-ingredients__skeleton-item">
        <BaseSkeleton width="105" height="105" corner="6" />
        <BaseSkeleton width="95" height="15" corner="6" :style="{ margin: '8px auto 0' }" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.modal-ingredients {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;

  &__ingredient {
    width: calc((100% / 4) - 20px);
    &:hover {
      .modal-ingredients__ingredient-icon {
        border-color: @main-color;
      }
    }

    &--active {
      .modal-ingredients__ingredient-icon {
        border-color: @main-color;
      }

      .modal-ingredients__ingredient-checkmark {
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
}
</style>
