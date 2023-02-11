<template>
  <form @submit.prevent="onSubmit" class="form-auth">
    <div class="form-auth__header">
      <h3 class="form-auth__title">Авторизация</h3>
      <div class="form-auth__text">
        Сможете быстро оформлять заказы, использовать бонусы
      </div>
    </div>
    <div class="form-auth__body">
      <BaseInput
        class="form-auth__control"
        v-model="v$.email.$model"
        labelText="Ваш E-mail"
        id="auth-1"
        name="email"
        @onFocus="v$.email.$reset"
        :errors="
          v$.email.$errors.length ? v$.email.$errors[0].$message as string : null
        "
      />
      <BaseInput
        class="f"
        labelText="Ваш пароль"
        id="auth-2"
        type="password"
        name="password"
        @onFocus="v$.password.$reset"
        :errors="
          v$.password.$errors.length ? v$.password.$errors[0].$message as string : null
        "
        v-model="v$.password.$model"
      />
    </div>

    <BaseButton class="form-auth__submit" role="submit" type="standart">
      Авторизоваться
    </BaseButton>
  </form>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, type PropType } from "vue";

import useVuelidate from "@vuelidate/core";
import { getValidationRule } from "@/utils/validations";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

interface IUserCredentials {
  email: string;
  password: string;
}
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<IUserCredentials>,
      default: null,
    },
  },
  components: {
    BaseInput,
    BaseButton,
  },
  setup(props, { emit }) {
    // const showToast = inject("showToast") as (message: IToast) => void;
    // const userStore = useUserStore();
    const state = reactive({
      email: "",
      password: "",
    });

    const onSubmit = async () => {
      // try {
      //   await userStore.login(data.email, data.password);
      // } catch (e) {
      //   const message = errorHandler(e) || "Unknown";
      //   showToast({ type: "error", text: message });
      // }
      const isFormCorrect = await v$.value.$validate();
      const { email, password } = toRefs(state);
      if (isFormCorrect) {
        emit("submit-form", {
          email: email.value,
          password: password.value,
        });
      }
    };

    const rules = {
      email: getValidationRule("email"),
      password: getValidationRule("password"),
    };

    const v$ = useVuelidate(rules, state, { $rewardEarly: true, $lazy: true });
    return {
      onSubmit,
      v$,
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
