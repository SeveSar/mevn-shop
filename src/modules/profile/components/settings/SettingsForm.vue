<script setup lang="ts">
import type { IUser } from '@/types/IUser';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import { ref } from 'vue';

interface Props {
  userInfo: Omit<IUser, '_id' | 'avatar'>
  isChanging: boolean
}
const props = defineProps<Props>();
const emit = defineEmits(['onSubmitForm']);

const userFields = ref<Props['userInfo']>({
  name: props.userInfo.name,
  phone: props.userInfo.phone,
  email: props.userInfo.email,
  birthDay: props.userInfo.birthDay,
});

function onSaveInfo() {
  emit('onSubmitForm');
}
</script>

<template>
  <form class="settings-form" @submit.prevent="onSaveInfo">
    <div v-if="!isChanging" class="settings-form__preview">
      <label class="settings-form__label">
        Имя*
        <span>
          {{ userInfo.name || '-' }}
        </span>
      </label>
      <label class="settings-form__label">
        Номер телефона*
        <span>
          {{ userInfo.phone || '-' }}
        </span>
      </label>
      <label class="settings-form__label">
        Почта
        <span>
          {{ userInfo.email || '-' }}
        </span>
      </label>
      <label class="settings-form__label">
        Дата рождения
        <span>
          {{ userInfo.birthDay || '-' }}
        </span>
      </label>
    </div>
    <div v-else class="settings-form__body">
      <div class="settings-form__controls">
        <div class="settings-form__group">
          <BaseInput v-model="userFields.name" type="text" label-text="Имя" required />
        </div>
        <div class="settings-form__group">
          <BaseInput v-model="userFields.phone" type="text" label-text="Номер телефона" required />
        </div>
        <div class="settings-form__group">
          <BaseInput v-model="userFields.email" type="text" label-text="Почта" />
        </div>
        <div class="settings-form__group">
          <BaseInput v-model="userFields.birthDay" type="text" label-text="Дата рождения" />
        </div>
      </div>
      <div class="settings-form__footer">
        <BaseButton type="submit">
          Сохранить изменения
        </BaseButton>
      </div>
    </div>
  </form>
</template>

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
