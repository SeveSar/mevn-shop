<template>
  <form @submit.prevent="onSubmit" class="form-auth">
    <div class="form-auth__header">
      <h3 class="form-auth__title">{{ titleForm }}</h3>
      <div class="form-auth__text">
        Сможете быстро оформлять заказы, использовать бонусы
      </div>
    </div>
    <div class="form-auth__body">
      <BaseInput
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

    <BaseButton type="submit" color="standart">{{ buttonText }}</BaseButton>
  </form>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";

import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { toRefs, watch, reactive } from "vue";
import type DataFormControls from "@/types/DataFormControls";
import { getValidationRule } from "@/utils/validations";

defineProps({
  buttonText: {
    type: String,
    default: "Войти в аккаунт",
  },
  titleForm: {
    type: String,
    default: "Вход в аккаунт",
  },
});
const emit = defineEmits<{
  (e: "submit-form", data: DataFormControls): void;
}>();

const state = reactive({
  email: "",
  password: "",
});
const rules = {
  email: getValidationRule("email"),
  password: getValidationRule("password"),
};

const v$ = useVuelidate(rules, state, { $rewardEarly: true, $lazy: true });
watch(v$, (val) => console.log(val));

const onSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  const { email, password } = toRefs(state);
  if (isFormCorrect) {
    emit("submit-form", {
      email: email.value,
      password: password.value,
    });
  }
};
</script>
<style scoped lang="less">
.form-auth {
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

  .button {
    width: 100%;
    margin-top: 20px;
  }
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;
}
</style>
