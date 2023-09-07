<template>
  <form @submit.prevent="onSubmit" class="form-auth">
    <div class="form-auth__header">
      <h3 class="form-auth__title">Регистрация</h3>
      <div class="form-auth__text">Сможете быстро оформлять заказы, использовать бонусы</div>
    </div>
    <div class="form-auth__body">
      <div class="form-auth__group">
        <BaseInput
          class="form-auth__control"
          v-model="userCredentials.email"
          labelText="Ваш E-mail"
          id="auth-1"
          name="email"
          @onFocus="v$.email.$reset"
          :errors="
            v$.email.$errors.length ? v$.email.$errors[0].$message as string : null
          "
        />
      </div>
      <div class="form-auth__group">
        <BaseInput
          class="form-auth__control"
          labelText="Ваш пароль"
          id="auth-2"
          type="password"
          name="password"
          @onFocus="v$.password.$reset"
          :errors="
            v$.password.$errors.length ? v$.password.$errors[0].$message as string : null
          "
          v-model="userCredentials.password"
        />
      </div>
      <div class="form-auth__group">
        <BaseInput
          class="form-auth__control"
          labelText="Ваше имя"
          id="auth-2"
          type="password"
          name="password"
          @onFocus="v$.name.$reset"
          :errors="
            v$.name.$errors.length ? v$.name.$errors[0].$message as string : null
          "
          v-model="userCredentials.name"
        />
      </div>
    </div>
    <BaseButton class="form-auth__submit" :isLoading="isLoading" type="submit">Зарегистрироваться</BaseButton>
  </form>
</template>

<script lang="ts">
import { reactive, defineComponent, type PropType, inject, ref } from 'vue';

import useVuelidate from '@vuelidate/core';
import { getValidationRule } from '@/utils/validations';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { getErrorMessage } from '@/utils/errorHandler';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/modules/user/stores/user';
import { toaster } from '@/main';

interface IUserCredentials {
  name: string;
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
    const modalStore = useModalStore();

    const isLoading = ref(false);
    const userCredentials = reactive({
      email: '',
      password: '',
      name: '',
    });

    const rules = {
      email: getValidationRule('email'),
      password: getValidationRule('password'),
      name: getValidationRule('requiredMinlength'),
    };

    const v$ = useVuelidate(rules, userCredentials, {
      $rewardEarly: true,
      $lazy: true,
    });

    const onSubmit = async () => {
      const isFormCorrect = await v$.value.$validate();
      if (isFormCorrect) {
        try {
          isLoading.value = true;
          await userStore.signUp(userCredentials.email, userCredentials.password);
          toaster.showToast({ type: 'info', text: 'Вы зарегистрировались' });
          modalStore.closeAuthModal();
        } catch (e) {
          const message = getErrorMessage(e);
          toaster.showToast({ type: 'error', text: message });
        } finally {
          isLoading.value = false;
        }
      }
    };

    return {
      onSubmit,
      isLoading,
      v$,
      userCredentials,
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
    margin: 45px auto 0;
    width: 100%;
  }
  &__group {
    margin-bottom: 25px;
  }
}
</style>
