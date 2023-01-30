<template>
  <div class="uploader">
    <label class="upload-button">
      <input
        class="upload-button__input"
        type="file"
        accept="image/*"
        @change="getFile"
      />
      <span class="upload-button__text"> Загрузить картинку </span>
    </label>
    <div class="uploader__preview" v-if="modelValue" @click="deleteFile">
      <img class="uploader__img" :src="getSrc()" alt="" />
      <div class="uploader__details">
        <div class="uploader__name">{{ modelValue.name }}</div>
        <div class="uploader__size">{{ modelValue.size }} bytes</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, type PropType } from "vue";

export default defineComponent({
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: null as unknown as PropType<File | null>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    const getFile = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        emit("update:modelValue", files[0]);
      }
      target.value = "";
    };
    const getSrc = () => {
      if (!modelValue.value) {
        return "";
      }
      return URL.createObjectURL(modelValue.value);
    };
    const deleteFile = () => {
      emit("update:modelValue", null);
    };
    return {
      getFile,
      deleteFile,
      getSrc,
    };
  },
});
</script>

<style scoped lang="less">
.uploader {
  display: flex;
  align-items: center;
  &__preview {
    margin-left: 25px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__img {
    width: 100px;
    height: auto;
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
}
.upload-button {
  padding: 15px 20px;
  background-color: @main-color;
  color: #fff;
  border-radius: 12px;
  cursor: pointer;
  display: inline-block;
  &__input {
    display: none;
  }
}
</style>
