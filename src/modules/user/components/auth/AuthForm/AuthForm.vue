<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import FormLogin from '../forms/FormLogin.vue';
import FormRegister from '../forms/FormRegister.vue';

type FormType = 'login' | 'register';

export default defineComponent({
  components: {
    FormLogin,
    FormRegister,
  },
  setup() {
    const currentFormType = ref<FormType>('login');

    const switchTab = () => {
      switch (currentFormType.value) {
        case 'login':
          currentFormType.value = 'register';
          break;
        case 'register':
          currentFormType.value = 'login';
          break;
      }
    };

    const currentNotifyText = computed(() => {
      return currentFormType.value === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?';
    });

    return {
      currentFormType,
      switchTab,
      currentNotifyText,
    };
  },
});
</script>

<template>
  <div class="form-switcher">
    <keep-alive>
      <component :is="`form-${currentFormType.toLowerCase()}`" />
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
