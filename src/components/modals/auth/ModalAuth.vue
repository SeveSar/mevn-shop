<template>
  <BaseModal ref="baseModalRef" @onClose="closeModal">
    <div class="modal-content">
      <div class="modal-content__inner">
        <component :is="typeForm"></component>
      </div>
      <div class="modal-content__notify">
        {{ currentTextButton.text }}
        <button @click="changeForm">
          {{ currentTextButton.buttonText }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import AppAuthForm from "./forms/AppAuthForm.vue";
import AppRegisterForm from "./forms/AppRegisterForm.vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
export default defineComponent({
  components: {
    AppAuthForm,
    AppRegisterForm,
    BaseModal,
  },
  setup() {
    const storeModal = useModalStore();
    const baseModalRef = ref<InstanceType<typeof BaseModal> | null>(null);
    const { loginModal } = storeToRefs(storeModal);
    const typeForm = ref<string>("AppAuthForm");
    const currentTextButton = computed(() => {
      return typeForm.value === "AppAuthForm"
        ? { text: "Не зарегестрированы ?", buttonText: "Создать аккаунт" }
        : { text: "Уже есть аккаунт ?", buttonText: "Войди в аккаунт" };
    });
    const changeForm = () => {
      typeForm.value =
        typeForm.value === "AppAuthForm" ? "AppRegisterForm" : "AppAuthForm";
    };
    const closeModal = () => {
      storeModal.closeLoginModal();
    };

    watch(loginModal, (value) => {
      if (value) {
        baseModalRef.value?.show();
      } else {
        baseModalRef.value?.close();
      }
    });
    return {
      typeForm,
      currentTextButton,
      changeForm,
      baseModalRef,
      closeModal,
    };
  },
});
</script>
<style scoped lang="less">
.modal-content {
  text-align: center;
  &__inner {
    max-width: 320px;
    width: 100%;
    margin: 0 auto;
  }
  &__notify {
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
