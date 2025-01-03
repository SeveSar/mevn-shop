<script lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';

import BaseInput from '@/components/ui/BaseInput.vue';
import { toaster } from '@/main';
import { useAuthModal } from '@/modules/user';
import { useUserStore } from '@/modules/user/stores/user';
import { getErrorMessage } from '@/utils/errorHandler';
import { getValidationRule } from '@/utils/validations';
import useVuelidate from '@vuelidate/core';
import { defineComponent, type PropType, reactive, ref } from 'vue';

interface IUserCredentials {
  name: string
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
    const modalStore = useAuthModal();

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
        }
        catch (e) {
          const message = getErrorMessage(e);
          toaster.showToast({ type: 'error', text: message });
        }
        finally {
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

<template>
  <form class="form-auth" @submit.prevent="onSubmit">
    <div class="form-auth__header">
      <h3 class="form-auth__title">
        Регистрация
      </h3>
      <div class="form-auth__text">
        Сможете быстро оформлять заказы, использовать бонусы
      </div>
    </div>
    <div class="form-auth__body">
      <div class="form-auth__group">
        <BaseInput
          id="auth-1"
          v-model="userCredentials.email"
          class="form-auth__control"
          label-text="Ваш E-mail"
          name="email"
          :errors="
            v$.email.$errors.length ? v$.email.$errors[0].$message as string : null
          "
          @on-focus="v$.email.$reset"
        />
      </div>
      <div class="form-auth__group">
        <BaseInput
          id="auth-2"
          v-model="userCredentials.password"
          class="form-auth__control"
          label-text="Ваш пароль"
          type="password"
          name="password"
          :errors="
            v$.password.$errors.length ? v$.password.$errors[0].$message as string : null
          "
          @on-focus="v$.password.$reset"
        />
      </div>
      <div class="form-auth__group">
        <BaseInput
          id="auth-2"
          v-model="userCredentials.name"
          class="form-auth__control"
          label-text="Ваше имя"
          type="password"
          name="password"
          :errors="
            v$.name.$errors.length ? v$.name.$errors[0].$message as string : null
          "
          @on-focus="v$.name.$reset"
        />
      </div>
    </div>
    <BaseButton class="form-auth__submit" :is-loading="isLoading" type="submit">
      Зарегистрироваться
    </BaseButton>
  </form>
</template>

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
