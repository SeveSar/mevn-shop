<script lang="ts">
import { defineComponent, ref } from 'vue';
import ModalCreateProduct from '../../components/modals/ModalCreateProduct.vue';

export default defineComponent({
  components: {
    ModalCreateProduct,
  },
  setup() {
    // state
    const isModalCreateProduct = ref(false);
    const isModalCreateCategories = ref(false);
    const creatingButtons = [
      { title: 'Создать товар', id: 1, modal: 'product' },
      { title: 'Создать категории', id: 2, modal: 'category' },
    ];

    // methods
    const openModal = (modalType: string) => {
      switch (modalType) {
        case 'product':
          isModalCreateProduct.value = true;
          return;
        case 'category':
          isModalCreateCategories.value = true;
      }
    };
    return {
      creatingButtons,
      isModalCreateProduct,
      openModal,
    };
  },
});
</script>

<template>
  <div class="create-pizza">
    <div class="admin-buttons">
      <button v-for="button in creatingButtons" :key="button.id" class="admin-buttons__btn" @click="openModal(button.modal)">
        {{ button.title }}
      </button>
    </div>
    <ModalCreateProduct v-model="isModalCreateProduct" />
  </div>
</template>

<style scoped lang="scss">
.create-pizza {
  .admin-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    margin-top: 35px;
    &__btn {
      padding: 10px 15px;
      background-color: $main-color;
      color: #fff;
      border-radius: 6px;
    }
  }
}
</style>
