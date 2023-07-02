<template>
  <BaseModal :isOpen="isAuthModal" @close="storeModal.closeAuthModal">
    <div class="modal-content">
      <div class="modal-content__inner">
        <AuthForm />
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, type Ref } from 'vue';

import BaseModal from '@/components/ui/BaseModal.vue';
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';
import AuthForm from '../../auth/AuthForm/AuthForm.vue';

interface IUserCredentials {
  email: string;
  password: string;
}
export default defineComponent({
  components: {
    BaseModal,
    AuthForm,
  },
  setup() {
    const storeModal = useModalStore();
    const userCredentials = ref({}) as Ref<IUserCredentials>;
    const { isAuthModal } = storeToRefs(storeModal);
    const typeForm = ref<'FormLogin' | 'FormRegister'>('FormLogin');
    const currentTextButton = computed(() => {
      return typeForm.value === 'FormLogin'
        ? { text: 'Не зарегестрированы ?', buttonText: 'Создать аккаунт' }
        : { text: 'Уже есть аккаунт ?', buttonText: 'Войди в аккаунт' };
    });
    const changeForm = () => {
      switch (typeForm.value) {
        case 'FormLogin':
          typeForm.value = 'FormRegister';
          break;
        case 'FormRegister':
          typeForm.value = 'FormLogin';
      }
    };

    return {
      typeForm,
      currentTextButton,
      changeForm,
      storeModal,
      isAuthModal,
      userCredentials,
    };
  },
});
</script>
<style scoped lang="less">
.modal-content {
  &__inner {
    max-width: 320px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
