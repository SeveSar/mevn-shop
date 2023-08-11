<template>
  <div class="orders-item">
    <div class="orders-item__header orders-item-header" @click="isOpen = !isOpen">
      <IconArrowDown class="orders-item-header__icon" />
      <div class="orders-item-header__top">
        <div class="orders-item-header__col">
          <span class="orders-item-header__caption">Заказ</span>
          <div class="orders-item-header__flex">
            <div class="orders-item-header__text">№130312</div>
          </div>
        </div>
        <div class="orders-item-header__col">
          <span class="orders-item-header__caption">Сумма заказа</span>
          <div class="orders-item-header__text">399 ₽</div>
        </div>
        <div class="orders-item-header__col">
          <span class="orders-item-header__caption">Статус</span>
          <div class="orders-item-header__text">Обрабатывается</div>
        </div>
        <div class="orders-item-header__col">
          <span class="orders-item-header__caption">Оплачено</span>
          <div class="orders-item-header__text">Картой</div>
        </div>
      </div>
      <div class="orders-item-header__bottom">
        <div class="orders-item-header__address orders-item-header__text">
          ул. Львовская 48/2, офис 301, 2 этаж, домофон 4801
        </div>
        <div class="orders-item-header__pizzas">
          <img
            class="orders-item-header__pizzas-icon"
            src="@/assets/images/small-pizza.png"
            v-for="i in 3"
            alt=""
            :key="i"
          />
        </div>
      </div>
    </div>
    <div class="orders-item-body" :class="{ 'orders-item-body--open': isOpen }">
      <div class="orders-item-body__wrap">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo at numquam voluptatem molestias commodi
        aliquam cumque vero fuga, rem tempora unde dicta aspernatur molestiae libero pariatur inventore ratione culpa
        veritatis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus sunt esse inventore vero
        molestiae eaque voluptas tempore quaerat possimus tenetur voluptatibus recusandae dolore quibusdam quia, numquam
        explicabo maxime ea voluptate! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti laboriosam
        rerum earum facere eum. Ducimus placeat nisi minus obcaecati quidem? Commodi deserunt nulla perferendis vel,
        minus unde voluptatem quia excepturi.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconArrowDown from '@/components/ui/icons/IconArrowDown.vue';
import { ref } from 'vue';
interface Props {
  item: {
    id: number;
    name: string;
  };
}
const props = defineProps<Props>();

const isOpen = ref(false);
</script>

<style scoped lang="less">
.orders-item {
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid @gray-color;
  background: @white-color;

  &-header {
    position: relative;
    cursor: pointer;
    &__icon {
      position: absolute;
      right: 0;
      top: 15px;
      color: @main-color;
    }
    &__top {
      display: grid;
      grid-template-columns: repeat(4, max-content);
      column-gap: 15px;
      row-gap: 12px;
      border-bottom: 1px solid @gray-color;
      justify-content: space-between;
      padding-bottom: 16px;
      padding-right: calc(16px + 85px);
    }

    &__bottom {
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__caption {
      color: @gray2-color;
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      display: inline-block;
      margin-bottom: 4px;
    }

    &__text {
      color: @black-color;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
    }

    &__pizzas {
      &-icon {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }

  &-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 500ms, -ms-grid-rows 500ms;

    &--open {
      grid-template-rows: 1fr;
    }

    &__wrap {
      overflow: hidden;
      padding-top: 12px;
    }
  }
}
</style>
