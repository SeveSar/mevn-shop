<script lang="ts">
import type { IProductFull } from '@/types/IProduct';
import { api } from '@/api/api';
import BaseCheckBox from '@/components/ui/BaseCheckBox.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseTextArea from '@/components/ui/BaseTextArea.vue';
import UploadProductImage from '@/modules/admin/components/UploadProductImage/UploadProductImage.vue';
import { BaseButton, BaseInput } from 'pizza-mevn-ui-kit';

import { defineComponent, type Ref, ref } from 'vue';

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
    // state
    const sizesValues = [
      { label: '20 см', value: 20, id: 'size-1' },
      { label: '28 см', value: 28, id: 'size-2' },
      { label: '33 см', value: 33, id: 'size-3' },
    ];
    const doughValues = [
      { label: 'Традиционное', value: 1, id: 'dough-1' },
      { label: 'Тонкое', value: 2, id: 'dough-2' },
    ];

    const urlInput = ref('');
    const file = ref(null) as Ref<File | null>;
    const productFields = ref<IProductFull>({
      id: '',
      title: '',
      price: 0,
      description: '',
      imageUrl: '',
      amount: 0,
      sizes: [],
      category: '',
      dough: [],
      filters: [],
      ingredients: [],
    });
    const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);

    // methods
    const createPizza = async () => {
      try {
        if (file.value) {
          const fileRes = await api.files.uploadFile(file.value);
          productFields.value.imageUrl = fileRes.filename;
        }

        const data = await api.product.createProduct(productFields.value);
        console.log(data, 'data');
      }
      catch (e) {
        console.error(e);
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

<template>
  <BaseModal :is-open="modelValue" @close="$emit('update:modelValue', false)" @show="$emit('update:modelValue', true)">
    <template #header>
      <h2 class="modal-title">
        Добавить пиццу
      </h2>
    </template>

    <div class="modal-content">
      <form class="form" @submit.prevent="createPizza">
        <BaseInput v-model="productFields.title" class="form__control" placeholder="Имя" />
        <BaseInput v-model="productFields.price" class="form__control" placeholder="Цена" type="number" />
        <BaseInput v-model="productFields.amount" class="form__control" type="number" placeholder="Количество" />
        <div class="form__group">
          <BaseTextArea v-model="productFields.description" height="150px" placeholder="Описание" />
        </div>
        <div class="form__group form-upload">
          <UploadProductImage v-model="file" />
          <div v-if="!file">
            <span class="form-upload__or">Или</span>
            <BaseInput v-model="urlInput" type="text" placeholder="URL картинки" />
          </div>
        </div>
        <div class="form__group form__checkbox">
          <div class="form__checkbox-title">
            Добавить размеры:
          </div>
          <BaseCheckBox
            v-for="check in sizesValues" :key="check.id" v-model="productFields.sizes"
            class="form__checkbox-control" :value="check.value" :label="check.label"
          />
        </div>
        <div class="form-group form__checkbox">
          <div class="form__checkbox-title">
            Добавить типы теста:
          </div>
          <BaseCheckBox
            v-for="check in doughValues" :key="check.id" v-model="productFields.dough"
            class="form__checkbox-control" :value="check.value" :label="check.label"
          />
        </div>

        <div class="form__footer">
          <BaseButton type="submit">
            Создать
          </BaseButton>
        </div>
      </form>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.modal-title {
  text-align: center;
  font-size: 27px;
  line-height: 35px;
  color: $black-color;
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
