<template>
  <form class="settings-form" @submit.prevent="onSaveInfo">
    <div class="settings-form__preview" v-if="!isChanging">
      <label class="settings-form__label">
        Имя*
        <span>
          {{ userInfo.name }}
        </span>
      </label>
      <label class="settings-form__label">
        Номер телефона*
        <span>
          {{ userInfo.phone }}
        </span>
      </label>
      <label class="settings-form__label">
        Почта
        <span>
          {{ userInfo.email }}
        </span>
      </label>
      <label class="settings-form__label">
        Дата рождения
        <span>
          {{ userInfo.birthday }}
        </span>
      </label>
    </div>
    <div class="settings-form__body" v-else>
      <div class="settings-form__controls">
        <div class="settings-form__group">
          <BaseInput type="text" labelText="Имя" required v-model="nameControl" />
        </div>
        <div class="settings-form__group">
          <BaseInput type="text" labelText="Номер телефона" required v-model="phoneControl" />
        </div>
        <div class="settings-form__group">
          <BaseInput type="text" labelText="Почта" v-model="emailControl" />
        </div>
        <div class="settings-form__group">
          <BaseInput type="text" labelText="Дата рождения" v-model="birthdayControl" />
        </div>
      </div>
      <div class="settings-form__footer">
        <BaseButton type="submit"> Сохранить изменения </BaseButton>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { ref } from 'vue';

interface Props {
  userInfo: {
    name: string;
    phone: string;
    email: string;
    birthday: string;
  };
  isChanging: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['onSubmitForm']);

const nameControl = ref(props.userInfo.name);
const phoneControl = ref(props.userInfo.phone);
const emailControl = ref(props.userInfo.email);
const birthdayControl = ref(props.userInfo.birthday);

const onSaveInfo = () => {
  emit('onSubmitForm');
};
</script>

<style scoped lang="less">
.settings-form {
  &__preview {
    display: flex;
    align-items: center;
    gap: 32px;
  }
  &__label {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: @gray2-color;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    span {
      font-size: 16px;
      color: @black-color;
    }
  }
  &__controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px 24px;
  }
  &__footer {
    margin-top: 16px;
  }
}
</style>
