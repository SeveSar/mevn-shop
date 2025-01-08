<script lang="ts" setup>
import { computed, ref } from 'vue';
import AuthFormLogin from './AuthFormLogin.vue';
import AuthFormRegister from './AuthFormRegister.vue';

const COMPONETS = {
  login: AuthFormLogin,
  register: AuthFormRegister,
} as const;

type FormType = 'login' | 'register';

const currentFormType = ref<FormType>('login');

function switchTab() {
  switch (currentFormType.value) {
    case 'login':
      currentFormType.value = 'register';
      break;
    case 'register':
      currentFormType.value = 'login';
      break;
  }
}

const currentNotifyText = computed(() => {
  return currentFormType.value === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?';
});
</script>

<template>
  <div class="form-switcher">
    <keep-alive>
      <component :is="COMPONETS[currentFormType]" />
    </keep-alive>
  </div>
  <div class="form-switcher__notify">
    {{ currentNotifyText }}
    <button @click="switchTab">
      {{ currentFormType === 'login' ? 'Создать' : 'Войти' }}
    </button>
  </div>
</template>

<style scoped lang="less">
.form-switcher {
  &__notify {
    text-align: center;
    color: #000;
    margin-top: 15px;
    button {
      color: #000;
      margin-left: 5px;
      &:hover {
        color: #ff7010;
      }
    }
  }
}
</style>
