<template>
  <form @submit.prevent="onSubmit" class="form-auth">
    <div class="form-auth__header">
      <h3 class="form-auth__title">Авторизация</h3>
      <div class="form-auth__text">Сможете быстро оформлять заказы, использовать бонусы</div>
    </div>
    <div class="form-auth__body">
      <BaseInput
        class="form-auth__control"
        v-model="userCredentials.email"
        labelText="Ваш E-mail"
        id="auth-1"
        name="email"
        @on-focus="v$.email.$reset"
        :errors="
          v$.email.$errors.length ? v$.email.$errors[0].$message as string : null
        "
      />
      <BaseInput
        labelText="Ваш пароль"
        id="auth-2"
        type="password"
        name="password"
        :errors="
          v$.password.$errors.length ? v$.password.$errors[0].$message as string : null
        "
        v-model="userCredentials.password"
        @on-focus="v$.password.$reset"
      />
    </div>

    <BaseButton class="form-auth__submit" type="submit" :is-loading="isLoading"> Авторизоваться </BaseButton>
  </form>
</template>

<script lang="ts">
import { reactive, defineComponent, type PropType, inject, ref } from 'vue';

import useVuelidate from '@vuelidate/core';
import { getValidationRule } from '@/utils/validations';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useUserStore } from '@/modules/user/stores/user';
import type { IToast } from '@/plugins/plugins.types';
import { getErrorMessage } from '@/utils/errorHandler';
import { useModalStore } from '@/stores/modal';
import { useToastStore } from '@/stores/toast';

interface IUserCredentials {
  email: string;
  password: string;
}
export default defineComponent({
  components: {
    BaseInput,
    BaseButton,
  },
  props: {
    modelValue: {
      type: Object as PropType<IUserCredentials>,
      default: null,
    },
  },

  setup(props, { emit }) {
    const userStore = useUserStore();
    const userCredentials = reactive({
      email: '',
      password: '',
    });

    const isLoading = ref(false);

    const modalStore = useModalStore();
    const toastStore = useToastStore();

    const onSubmit = async () => {
      const isFormCorrect = await v$.value.$validate();

      if (isFormCorrect) {
        try {
          isLoading.value = true;
          await userStore.login(userCredentials.email, userCredentials.password);
          modalStore.closeAuthModal();
          toastStore.showToast({ type: 'info', text: 'Вы авторизовались' });
        } catch (e) {
          const message = getErrorMessage(e);
          toastStore.showToast({ type: 'error', text: message });
        } finally {
          isLoading.value = false;
        }
      }
    };

    const rules = {
      email: getValidationRule('email'),
      password: getValidationRule('password'),
    };

    const v$ = useVuelidate(rules, userCredentials, {
      $rewardEarly: true,
      $lazy: true,
    });
    return {
      onSubmit,
      userCredentials,
      v$,
      isLoading,
    };
  },
});
</script>

<style scoped lang="less">
.form-auth {
  &__header {
    text-align: center;
  }
  &__title {
    font-weight: 500;
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 15px;
  }
  &__text {
    font-size: 16px;
    line-height: 22px;
  }
  &__body {
    margin-top: 20px;
  }
  &__submit {
    margin: 25px auto 0;
    width: 100%;
  }
  &__control {
    margin-bottom: 25px;
  }
}
</style>
