<script lang="ts">
import { defineComponent, type PropType, toRefs } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: null as unknown as PropType<File | null>,
      default: null,
    },
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    const getFile = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        emit('update:modelValue', files[0]);
      }
      target.value = '';
    };
    const getSrc = () => {
      if (!modelValue.value) {
        return '';
      }
      return URL.createObjectURL(modelValue.value);
    };
    const deleteFile = () => {
      emit('update:modelValue', null);
    };
    return {
      getFile,
      deleteFile,
      getSrc,
    };
  },
});
</script>

<template>
  <div class="uploader">
    <label class="uploader__button">
      <input
        class="uploader__button-input"
        type="file"
        accept="image/*"
        @change="getFile"
      >
      <span class="ploader__button-text"> Загрузить картинку </span>
    </label>
    <div v-if="modelValue" class="uploader__preview" @click="deleteFile">
      <img class="uploader__img" :src="getSrc()" alt="">
      <div class="uploader__details">
        <div class="uploader__name">
          {{ modelValue.name }}
        </div>
        <div class="uploader__size">
          {{ modelValue.size }} bytes
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.uploader {
  display: flex;
  align-items: center;
  &__preview {
    margin-left: 25px;
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-grow: 1;
    transition: all 0.2s linear;
    &:hover {
      opacity: 0.8;
    }
  }

  &__img {
    width: 100%;
    max-width: 200px;
    height: 100%;
    max-height: 70px;
    margin-right: 10px;
    object-fit: cover;
  }
  &__name {
    color: @main-color;
    margin-bottom: 10px;
  }

  &__size {
    color: rgb(42, 42, 207);
  }
  &__button {
    padding: 15px 20px;
    background-color: @main-color;
    color: #fff;
    border-radius: 12px;
    cursor: pointer;
    display: inline-block;
    &-input {
      display: none;
    }
  }
}
</style>
