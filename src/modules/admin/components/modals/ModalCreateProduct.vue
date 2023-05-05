<template>
  <BaseModal
    :isOpen="modelValue"
    @close="$emit('update:modelValue', false)"
    @show="$emit('update:modelValue', true)"
  >
    <template #header>
      <h2 class="modal-title">Добавить пиццу</h2>
    </template>

    <div class="modal-content">
      <form class="form" @submit.prevent="createPizza">
        <BaseInput
          class="form__control"
          placeholder="Имя"
          v-model="productFields.title"
        />
        <BaseInput
          class="form__control"
          placeholder="Цена"
          type="number"
          v-model="productFields.price"
        />
        <BaseInput
          class="form__control"
          type="number"
          placeholder="Количество"
          v-model="productFields.amount"
          tpye="number"
        />
        <div class="form__group">
          <BaseTextArea
            height="150px"
            placeholder="Описание"
            v-model="productFields.description"
          ></BaseTextArea>
        </div>
        <div class="form__group form-upload">
          <UploadProductImage v-model="file" />
          <div v-if="!file">
            <span class="form-upload__or">Или</span>
            <BaseInput
              type="text"
              placeholder="URL картинки"
              v-model="urlInput"
            />
          </div>
        </div>
        <div class="form__group form__checkbox">
          <div class="form__checkbox-title">Добавить размеры:</div>
          <BaseCheckBox
            class="form__checkbox-control"
            :value="check.value"
            v-model="productFields.sizes"
            v-for="check in sizesValues"
            :key="check.id"
            :label="check.label"
          ></BaseCheckBox>
        </div>
        <div class="form-group form__checkbox">
          <div class="form__checkbox-title">Добавить типы теста:</div>
          <BaseCheckBox
            class="form__checkbox-control"
            :value="check.value"
            v-model="productFields.dough"
            v-for="check in doughValues"
            :key="check.id"
            :label="check.label"
          ></BaseCheckBox>
        </div>

        <div class="form__footer">
          <BaseButton type="submit"> Создать </BaseButton>
        </div>
      </form>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from "vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import UploadProductImage from "@/modules/admin/components/UploadProductImage/UploadProductImage.vue";
import BaseCheckBox from "@/components/ui/BaseCheckBox.vue";
import BaseTextArea from "@/components/ui/BaseTextArea.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import type { IProductDTO } from "@/models/IProduct";

import { api } from "@/api/api";

export default defineComponent({
  components: {
    BaseModal,
    BaseInput,
    BaseTextArea,
    BaseCheckBox,
    BaseButton,
    UploadProductImage,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    //state
    const sizesValues = [
      { label: "20 см", value: 20, id: "size-1" },
      { label: "28 см", value: 28, id: "size-2" },
      { label: "33 см", value: 33, id: "size-3" },
    ];
    const doughValues = [
      { label: "Традиционное", value: 1, id: "dough-1" },
      { label: "Тонкое", value: 2, id: "dough-2" },
    ];

    const urlInput = ref("");
    const file = ref(null) as Ref<File | null>;
    const productFields = ref<IProductDTO>({
      id: "",
      title: "",
      price: 0,
      description: "",
      imageUrl: "",
      amount: 0,
      sizes: [],
      category: "",
      dough: [],
      filters: [],
    });
    const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);

    //methods
    const createPizza = async () => {
      try {
        const bodyRequest = {};
        if (file.value) {
          const fileRes = await api.files.uploadFile(file.value);
          productFields.value.imageUrl = fileRes.filename;
        }

        const data = await api.product.createProduct(productFields.value);
        console.log(data, "data");
      } catch (e) {
        console.log(e);
      }
    };

    return {
      modalRef,
      sizesValues,
      doughValues,
      createPizza,
      productFields,
      file,
      urlInput,
    };
  },
});
</script>

<style scoped lang="less">
.modal-title {
  text-align: center;
  font-size: 27px;
  line-height: 35px;
  color: @black-color;
  margin-bottom: 25px;
}

.form {
  &__footer {
    display: flex;
    justify-content: center;
  }
  &__checkbox {
    &-control {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
    &-title {
      margin-bottom: 10px;
    }
  }
  &__group {
    margin-bottom: 25px;
  }
  &__control {
    margin-bottom: 25px;
  }
}
.modal-content {
  .form-upload {
    .form-group {
      margin-bottom: 0;
      flex-grow: 1;
    }
    &__or {
      display: inline-block;
      margin: 15px 0px;
    }
  }
}
</style>
