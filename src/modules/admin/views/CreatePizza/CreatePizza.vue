<template>
  <div class="create-pizza">
    <div class="admin-buttons">
      <button
        class="admin-buttons__btn"
        v-for="button in creatingButtons"
        :key="button.id"
        @click="openModal(button.modal)"
      >
        {{ button.title }}
      </button>
    </div>
    <ModalCreateProduct v-model="isModalCreateProduct" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ModalCreateProduct from "../../components/modals/ModalCreateProduct.vue";
export default defineComponent({
  components: {
    ModalCreateProduct,
  },
  setup() {
    //state
    const isModalCreateProduct = ref(false);
    const creatingButtons = [
      { title: "Создать товар", id: 1, modal: "product" },
      { title: "Создать категории", id: 2, modal: "category" },
    ];
    const openModal = (modalType: string) => {
      switch (modalType) {
        case "product":
          isModalCreateProduct.value = true;
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

<style scoped lang="less">
.create-pizza {
  .admin-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    margin-top: 35px;
    &__btn {
      padding: 10px 15px;
      background-color: @main-color;
      color: #fff;
      border-radius: 6px;
    }
  }
}
</style>
