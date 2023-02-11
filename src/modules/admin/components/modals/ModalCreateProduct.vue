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
        <BaseInput placeholder="Имя" v-model="productFields.title" />
        <BaseInput
          placeholder="Цена"
          type="number"
          v-model="productFields.price"
        />
        <BaseInput
          type="number"
          placeholder="Количество"
          v-model="productFields.amount"
        />
        <div class="form-group">
          <BaseTextArea
            height="150px"
            placeholder="Описание"
            v-model="productFields.description"
          ></BaseTextArea>
        </div>
        <div class="form-group form-upload">
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
        <div class="form-group form-checkbox">
          <div class="form-checkbox__title">Добавить размеры:</div>
          <BaseCheckBox
            :id="check.id"
            :value="check.value"
            v-model="productFields.sizes"
            v-for="check in sizesValues"
            :key="check.id"
            :label="check.label"
          ></BaseCheckBox>
        </div>
        <div class="form-group form-checkbox">
          <div class="form-checkbox__title">Добавить типы теста:</div>
          <BaseCheckBox
            :id="check.id"
            :value="check.value"
            v-model="productFields.dough"
            v-for="check in doughValues"
            :key="check.id"
            :label="check.label"
          ></BaseCheckBox>
        </div>
        <div class="form__footer">
          <BaseButton role="submit" type="standart"> Создать </BaseButton>
        </div>
      </form>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type Ref } from "vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import UploadProductImage from "@/components/common/UploadProductImage.vue";
import BaseCheckBox from "@/components/ui/BaseCheckBox.vue";
import BaseTextArea from "@/components/ui/BaseTextArea.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import type { IProduct } from "@/modules/product/models/IProduct";
import { api } from "@/api/api";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseModal,
    BaseInput,
    BaseTextArea,
    BaseCheckBox,
    BaseButton,
    UploadProductImage,
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
    const productFields = ref<IProduct>({
      title: "",
      price: null,
      description: "",
      imageUrl: "",
      amount: null,
      sizes: [],
      dough: [],
      category: "df",
    });
    const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);

    //methods
    const createPizza = async () => {
      const isNotValid = Object.values(productFields).some((value) => !value);
      // if (isNotValid) {
      //   return alert("Заполните поля");
      // }
      try {
        const data = await api.product.createProduct(productFields.value);
      } catch (e) {
        console.log(e);
      }
    };
    const setFile = (image: File | null) => {
      productFields.value.imageUrl = image;
    };
    watch(urlInput, (value: string) => {
      productFields.value.imageUrl = value;
    });
    watch(file, () => {
      productFields.value.imageUrl = file.value;
    });
    return {
      modalRef,
      sizesValues,
      doughValues,
      createPizza,
      setFile,
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
}
.modal-content {
  .form-group {
    margin-bottom: 15px;
    &.form-checkbox {
      .form-group {
        margin-bottom: 0;
      }
    }
  }
  .form-checkbox {
    &__title {
      margin-bottom: 10px;
    }
  }
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
