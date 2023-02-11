<template>
  <div class="form-switcher">
    <keep-alive>
      <component
        :is="`form-${currentFormType.toLowerCase()}`"
        v-model="userCredentials"
        @submitSuccess="onSubmit"
      ></component>
    </keep-alive>
  </div>
  <div class="form-switcher__notify">
    {{ currentNotifyText }}
    <button @click="switchTab">
      {{ currentFormType === "login" ? "Создать" : "Войти" }}
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import FormLogin from "../components/forms/FormLogin.vue";
import FormRegister from "../components/forms/FormRegister.vue";
type FormType = "login" | "register";

export default defineComponent({
  components: {
    FormLogin,
    FormRegister,
  },
  setup(props) {
    let currentFormType = ref<FormType>("login");
    const userCredentials = ref({
      name: "",
      password: "",
      email: "",
    });
    const switchTab = () => {
      switch (currentFormType.value) {
        case "login":
          currentFormType.value = "register";
          break;
        case "register":
          currentFormType.value = "login";
          break;
      }
    };

    const currentNotifyText = computed(() => {
      return currentFormType.value === "login"
        ? "Нет аккаунта?"
        : "Уже есть аккаунт?";
    });
    watch(
      userCredentials,
      (value) => {
        console.log(value);
      },
      { deep: true }
    );
    const onSubmit = () => {
      switch (currentFormType.value) {
        case "login":
          console.log("submit-sucess-login");
          return;
        case "register":
          console.log("submit-sucess-register");
          return;
      }
    };
    return {
      currentFormType,
      switchTab,
      currentNotifyText,
      userCredentials,
      onSubmit,
    };
  },
});
</script>
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
// .form-auth {
//   &__title {
//     font-weight: 500;
//     font-size: 32px;
//     line-height: 40px;
//     margin-bottom: 15px;
//   }
//   &__text {
//     font-size: 16px;
//     line-height: 22px;
//   }
//   &__body {
//     margin-top: 20px;
//   }

//   .button {
//     width: 100%;
//     margin-top: 20px;
//   }
// }
// .form-group {
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   margin-bottom: 25px;
// }
</style>
