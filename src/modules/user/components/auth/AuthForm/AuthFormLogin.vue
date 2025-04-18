<script lang="ts">
import { toaster } from '@/main';
import { useAuthModalStore } from '@/modules/user';
import { useUserStore } from '@/modules/user/stores/user';
import { getErrorMessage } from '@/utils/errorHandler';
import { getValidationRule } from '@/utils/validations';

import useVuelidate from '@vuelidate/core';
import { BaseButton, BaseInput } from 'pizza-mevn-ui-kit';

import { defineComponent, type PropType, reactive, ref } from 'vue';

interface IUserCredentials {
  email: string
  password: string
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

  setup() {
    const userStore = useUserStore();
    const userCredentials = reactive({
      email: '',
      password: '',
    });
    const rules = {
      email: getValidationRule('email'),
      password: getValidationRule('password'),
    };

    const v$ = useVuelidate(rules, userCredentials, {
      $rewardEarly: true,
      $lazy: true,
    });

    const isLoading = ref(false);

    const modalStore = useAuthModalStore();

    const onSubmit = async () => {
      const isFormCorrect = await v$.value.$validate();

      if (!isFormCorrect) { return; }
      try {
        isLoading.value = true;
        await userStore.login(userCredentials.email, userCredentials.password);
        modalStore.closeAuthModal();
        toaster.showToast({ type: 'info', text: 'Вы авторизовались' });
      }
      catch (e) {
        const message = getErrorMessage(e);
        toaster.showToast({ type: 'error', text: message });
      }
      finally {
        isLoading.value = false;
      }
    };

    return {
      onSubmit,
      userCredentials,
      v$,
      isLoading,
    };
  },
});
</script>

<template>
  <form class="form-auth" @submit.prevent="onSubmit">
    <div class="form-auth__header">
      <h3 class="form-auth__title">
        Авторизация
      </h3>
      <div class="form-auth__text">
        Сможете быстро оформлять заказы, использовать бонусы
      </div>
    </div>
    <div class="form-auth__body">
      <div class="form-auth__group">
        <BaseInput
          id="auth-1" v-model="userCredentials.email" class="form-auth__control" label-text="Ваш E-mail"
          name="email" :errors="v$.email.$errors.length ? v$.email.$errors[0].$message as string : null
          " @on-focus="v$.email.$reset"
        />
      </div>
      <div class="form-auth__group">
        <BaseInput
          id="auth-2" v-model="userCredentials.password" label-text="Ваш пароль" type="password" name="password" :errors="v$.password.$errors.length ? v$.password.$errors[0].$message as string : null
          " @on-focus="v$.password.$reset"
        />
      </div>
    </div>

    <BaseButton class="form-auth__submit" type="submit" :is-loading="isLoading">
      Авторизоваться
    </BaseButton>
  </form>
</template>

<style scoped lang="scss">
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

  &__group {
    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }
}
</style>
